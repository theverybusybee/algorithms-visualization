import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import {
  ITERATION_TIME_FOR_ANIMATION_LONG,
  ITERATION_TIME_FOR_ANIMATION_SHORT,
} from "./constants";
import { TSortingArray } from "./types";
import { setDelayForAnimation } from "./utils";

export const generateNumber = (minLen: number, maxLen: number) => {
  const randomNumber = Math.floor(
    Math.random() * (maxLen - minLen + 1) + minLen
  );
  return randomNumber;
};

// генерируем массив
export const randomArr = (
  minArrLen: number,
  maxArrLen: number,
  i = 0,
  arr: TSortingArray[] = [],
  arrLength = generateNumber(minArrLen, maxArrLen)
): TSortingArray[] => {
  if (i < arrLength) {
    const number = generateNumber(0, 100);
    number && arr.push({ value: number, type: ElementStates.Default });
    i++;
    return randomArr(minArrLen, maxArrLen, i, arr, arrLength);
  }
  return arr;
};

const swap = (
  arr: TSortingArray[],
  firstIndex: number,
  secondIndex: number
) => {
  const temp = arr[firstIndex].value;
  arr[firstIndex].value = arr[secondIndex].value;
  arr[secondIndex].value = temp;
};

// сортировка пузырьком
export async function bubbleSort(
  arr: TSortingArray[],
  isInAscendingOrder: string,
  setSortingNumbersState: Dispatch<SetStateAction<TSortingArray[]>>
) {
  const { length } = arr;
  switch (isInAscendingOrder) {
    case "ascending": {
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
          arr[j].type = ElementStates.Changing;
          arr[j + 1].type = ElementStates.Changing;
          setSortingNumbersState([...arr]);
          await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
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
          await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
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
  arr: TSortingArray[],
  isInAscendingOrder: string,
  setSortingNumbersState: Dispatch<SetStateAction<TSortingArray[]>>
) {
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
          if (arr[j] > arr[min]) {
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
