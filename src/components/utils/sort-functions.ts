import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { ITERATION_TIME_FOR_ANIMATION_SHORT } from "./constants";
import { TSortingNumberArray } from "./types";
import { setDelayForAnimation } from "./utils";

export const generateNumber = (minLen: number, maxLen: number) => {
  const randomNumber = Math.floor(
    Math.random() * (maxLen - minLen + 1) + minLen
  );
  return randomNumber;
};

export const toSortingNumberArray = (arr: number[]) => {
  return arr.map((value) => ({
    value: Number(value),
    type: ElementStates.Default,
  }));
};

// генерируем массив
export const getRandomArr = (
  minArrLen: number,
  maxArrLen: number,
  i = 0,
  arr: number[] = [],
  arrLength = generateNumber(minArrLen, maxArrLen)
): number[] => {
  if (i < arrLength) {
    const number = generateNumber(0, 100);
    number && arr.push(number);
    i++;
    return getRandomArr(minArrLen, maxArrLen, i, arr, arrLength);
  }
  return arr;
};

const swap = (
  arr: TSortingNumberArray[],
  firstIndex: number,
  secondIndex: number
) => {
  const temp = arr[firstIndex].value;
  arr[firstIndex].value = arr[secondIndex].value;
  arr[secondIndex].value = temp;
};

// сортировка пузырьком
export async function bubbleSort(
  numberArr: number[],
  isInAscendingOrder: string,
  setSortingNumbersState: Dispatch<SetStateAction<TSortingNumberArray[]>>
) {
  const arr = toSortingNumberArray(numberArr);
  const { length } = arr;
  if (!length) return;
  switch (isInAscendingOrder) {
    case "ascending": {
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
          arr[j].type = ElementStates.Changing;
          arr[j + 1].type = ElementStates.Changing;
          setSortingNumbersState([...arr]);
          await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
          if (arr[j].value > arr[j + 1].value) {
            [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
          }
          arr[j].type = ElementStates.Default;
        }
        arr[length - i - 1].type = ElementStates.Modified;
        setSortingNumbersState([...arr]);
      }

      break;
    }

    case "descending": {
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
          arr[j].type = ElementStates.Changing;
          arr[j + 1].type = ElementStates.Changing;
          setSortingNumbersState([...arr]);
          await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
          if (arr[j].value < arr[j + 1].value) {
            [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
          }
          arr[j].type = ElementStates.Default;
        }
        arr[length - i - 1].type = ElementStates.Modified;
        setSortingNumbersState([...arr]);
      }
    }
  }
  setSortingNumbersState([...arr]);
}

// сортировка выбором
export async function selectionSort(
  numberArr: number[],
  isInAscendingOrder: string,
  setSortingNumbersState: Dispatch<SetStateAction<TSortingNumberArray[]>>
) {
  const arr = toSortingNumberArray(numberArr);
  const { length } = arr;
  switch (isInAscendingOrder) {
    case "ascending": {
      for (let i = 0; i < length; i++) {
        let min = i;
        for (let j = i + 1; j < length; j++) {
          arr[i].type = ElementStates.Changing;
          arr[j].type = ElementStates.Changing;
          setSortingNumbersState([...arr]);
          await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
          if (arr[j].value < arr[min].value) {
            min = j;
          }
          arr[j].type = ElementStates.Default;
        }
        if (min !== i) {
          swap(arr, i, min);
        }
        arr[i].type = ElementStates.Modified;
      }
      setSortingNumbersState([...arr]);
      break;
    }
    case "descending": {
      for (let i = 0; i < length; i++) {
        let min = i;

        for (let j = i + 1; j < length; j++) {
          arr[i].type = ElementStates.Changing;
          arr[j].type = ElementStates.Changing;
          setSortingNumbersState([...arr]);
          await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
          if (arr[j].value > arr[min].value) {
            min = j;
          }
          arr[j].type = ElementStates.Default;
        }
        if (min !== i) {
          swap(arr, i, min);
        }
        arr[i].type = ElementStates.Modified;
      }
      setSortingNumbersState([...arr]);
      break;
    }
  }
  setSortingNumbersState([...arr]);
}
