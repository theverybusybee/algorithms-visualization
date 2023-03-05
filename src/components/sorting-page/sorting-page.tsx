import React, { ChangeEvent, MutableRefObject, RefObject, useRef, useState } from "react";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { randomArr, bubbleSort, selectionSort } from "../utils/sort-functions";
import { TSortingNumberArray } from "../utils/types";

export const SortingPage: React.FC = () => {
  const [radioInputState, setRadioInputState] = useState<string>("selectionSort");
  const [directionState, setDirectionState] = useState<string>("");
  const [arrState, setArrState] = useState<TSortingNumberArray[]>([]);
console.log(arrState)

  const setSortingKind = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioInputState(e.currentTarget.value);
  };

  const setSortingDirection = (e: React.SyntheticEvent) => {
    const buttonChosen = e.currentTarget.getAttribute("name");
    buttonChosen && setDirectionState(buttonChosen);
    radioInputState === "bubbleSort"
      ? bubbleSort(arrState, buttonChosen!, setArrState)
      : selectionSort(arrState, buttonChosen!, setArrState);
  };

  const test = () => {
    setArrState(randomArr(3, 17));
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.container}>
        <div className={styles.controlsContainer}>
          <div className={styles.radioInputsContainer}>
            <RadioInput
              onInput={setSortingKind}
              name="sortKind"
              value="bubbleSort"
              label="Пузырёк"
            />
            <RadioInput
              onInput={setSortingKind}
              name="sortKind"
              value="selectionSort"
              label="Выбор"
              defaultChecked
            />
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              extraClass={styles.button}
              sorting={Direction.Ascending}
              text="По возрастанию"
              onClick={setSortingDirection}
              name={Direction.Ascending}
            />
            <Button
              extraClass={styles.button}
              sorting={Direction.Descending}
              text="По убыванию"
              onClick={setSortingDirection}
              name={Direction.Descending}
            />
            <Button
              extraClass={styles.button}
              text="Новый массив"
              onClick={test}
            />
          </div>
        </div>
        <div className={styles.chartContainer}>
          {arrState &&
            arrState.map((el, index) => {
              return <Column index={el.value} key={index} state={el.type}/>;
            })}
        </div>
      </form>
    </SolutionLayout>
  );
};
