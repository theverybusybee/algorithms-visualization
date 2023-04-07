import React, { ChangeEvent, useState } from "react";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import {
  getRandomArr,
  bubbleSort,
  selectionSort,
  toSortingNumberArray,
} from "../utils/sort-functions";
import { TSortingNumberArray } from "../utils/types";
import { SortArrayButtons } from "../../types/buttons";
import { setDelayForAnimation } from "../utils/utils";
import { ITERATION_TIME_FOR_ANIMATION_SHORT } from "../utils/constants";

export const SortingPage: React.FC = () => {
  const [radioInputState, setRadioInputState] =
    useState<string>("selectionSort");
  const [randomArrState, setRandomArrState] = useState<number[]>([]);
  const [arrState, setArrState] = useState<TSortingNumberArray[]>([]);
  const [activeButton, setActiveButton] = useState<SortArrayButtons | null>(
    null
  );

  const setSortingKind = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioInputState(e.currentTarget.value);
  };

  async function setSortingDirection(e: React.SyntheticEvent) {
    const buttonChosen = e.currentTarget.getAttribute("name");
    setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
    buttonChosen === SortArrayButtons.Ascending
      ? setActiveButton(SortArrayButtons.Ascending)
      : setActiveButton(SortArrayButtons.Descending);

    radioInputState === SortArrayButtons.BubbleSort
      ? await bubbleSort(randomArrState, buttonChosen!, setArrState)
      : await selectionSort(randomArrState, buttonChosen!, setArrState);
    setActiveButton(null);
  }

  const setRandomArray = () => {
    const randomArr = getRandomArr(3, 17);
    setRandomArrState(randomArr);
    setArrState(toSortingNumberArray(randomArr));
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
              disabled={activeButton ? true : false}
            />
            <RadioInput
              onInput={setSortingKind}
              name="sortKind"
              value="selectionSort"
              label="Выбор"
              defaultChecked
              disabled={activeButton ? true : false}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              extraClass={styles.button}
              sorting={Direction.Ascending}
              text="По возрастанию"
              onClick={setSortingDirection}
              name={SortArrayButtons.Ascending}
              isLoader={activeButton === SortArrayButtons.Ascending && true}
              disabled={
                (activeButton && activeButton !== SortArrayButtons.Ascending) ||
                !arrState.length
                  ? true
                  : false
              }
            />
            <Button
              extraClass={styles.button}
              sorting={Direction.Descending}
              text="По убыванию"
              onClick={setSortingDirection}
              name={SortArrayButtons.Descending}
              isLoader={activeButton === SortArrayButtons.Descending && true}
              disabled={
                (activeButton &&
                  activeButton !== SortArrayButtons.Descending) ||
                !arrState.length
                  ? true
                  : false
              }
            />
            <Button
              extraClass={styles.button}
              text="Новый массив"
              onClick={setRandomArray}
              disabled={activeButton ? true : false}
            />
          </div>
        </div>
        <div className={styles.chartContainer}>
          {arrState &&
            arrState.map((el, index) => {
              return <Column index={el.value} key={index} state={el.type} />;
            })}
        </div>
      </form>
    </SolutionLayout>
  );
};
