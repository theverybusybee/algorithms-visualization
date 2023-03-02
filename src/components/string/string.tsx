import styles from "./string.module.css";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { setDelayForAnimation } from "../utils/utils";
import { ITERATION_TIME_FOR_ANIMATION_LONG } from "../utils/constants";
import { TCharactersArray, TStringArray } from "../utils/types";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const [inputValueState, setInputValueState] = useState<TStringArray>([]);
  const [sortingCharactersState, setSortingCharactersState] = useState<
    TCharactersArray[]
  >([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const array = e.currentTarget.value.split("");
    setInputValueState(array);
  };

  const submit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arrForDisplay = inputValueState.map((character) => {
      return { character: character, type: ElementStates.Default };
    });
    setSortingCharactersState(arrForDisplay);
    sortStringArray(arrForDisplay, setSortingCharactersState);
  };


  const swap = (
    firstElement: number,
    secondElement: number,
    arr: TCharactersArray[]
  ) => {
    const saveFirstElement = arr[firstElement];
    arr[firstElement] = arr[secondElement];
    arr[secondElement] = saveFirstElement;
    return arr;
  };

  async function sortStringArray(
    arr: TCharactersArray[],
    setSortingCharactersState: Dispatch<SetStateAction<TCharactersArray[]>>
  ) {
    const mid = Math.floor((arr.length - 1) / 2);
    for (
      let firstPointerIndex = 0;
      firstPointerIndex <= mid;
      firstPointerIndex++
    ) {
      const secondPointerIndex = arr.length - 1 - firstPointerIndex;
      if (firstPointerIndex !== secondPointerIndex) {
        arr[firstPointerIndex].type = ElementStates.Changing;
        arr[secondPointerIndex].type = ElementStates.Changing;
        setSortingCharactersState([...arr]);
        await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      }
      swap(firstPointerIndex, secondPointerIndex, arr);
      arr[firstPointerIndex].type = ElementStates.Modified;
      arr[secondPointerIndex].type = ElementStates.Modified;
      setSortingCharactersState([...arr]);
    }
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.stringContainer}>
        <form onSubmit={submit} className={styles.inputContainer}>
          <Input
            placeholder="Введите текст"
            maxLength={11}
            onChange={onChange}
          ></Input>
          <Button type="submit" text="Развернуть" linkedList="small"></Button>
        </form>
        <p className={styles.caption}>Максимум — 11 символов</p>
      </div>
      <div className={styles.circlesContainer}>
        {sortingCharactersState &&
          sortingCharactersState.map((obj, index) => {
            return (
              <Circle letter={obj.character} key={index} state={obj.type} />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
