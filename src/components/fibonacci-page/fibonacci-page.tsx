import React, { ChangeEvent, SyntheticEvent, useMemo, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { setDelayForAnimation } from "../utils/utils";
import { ITERATION_TIME_FOR_ANIMATION_SHORT } from "../utils/constants";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number | null>();
  const [fibonacciSequenceState, setFibonacciSequenceState] = useState<
    number[]
  >([]);
  const [buttonState, setButtonState] = useState<boolean>();
  const isMetTheConditions = useMemo(() => {
    if (inputValue) {
      return inputValue >= 1 && inputValue <= 19 ? true : false;
    }
  }, [inputValue]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = Number(e.currentTarget.value);
    setInputValue(targetValue);
  };

  const submit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      isMetTheConditions && inputValue && fibonacci(inputValue);
    }
    setInputValue(null);
  };

  async function fibonacci(
    startNumber: number,
    arr = [1],
    number = 1,
    F1 = 0,
    F2 = 1
  ): Promise<number[]> {
    setButtonState(true);
    if (number <= startNumber + 1) {
      if (number === 1) {
        setFibonacciSequenceState([arr[0]]);
        ++number;
        await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
        return fibonacci(startNumber, arr, number);
      }
      const a = F1 + F2;
      arr.push(a);
      setFibonacciSequenceState((arr) => [...arr, a]);
      ++number;
      F1 = F2;
      F2 = a;
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
      return fibonacci(startNumber, arr, number, F1, F2);
    }
    setButtonState(false);
    return arr;
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.stringContainer}>
        <form onSubmit={submit} className={styles.inputContainer}>
          <Input
            min={1}
            max={19}
            placeholder="Введите текст"
            onChange={onChange}
            type="number"
            value={String(inputValue)}
          ></Input>
          <Button
            type="submit"
            text="Развернуть"
            linkedList="small"
            isLoader={buttonState}
            disabled={inputValue && isMetTheConditions ? false : true}
          ></Button>
        </form>
        <p className={styles.caption}>Максимум — 19 символов</p>
      </div>
      <div className={styles.circlesContainer}>
        {fibonacciSequenceState &&
          fibonacciSequenceState.map((character, index) => {
            return (
              <div key={index}>
                <Circle letter={character} />
                <span className={styles.sequenceIndex}>{index}</span>
              </div>
            );
          })}
      </div>
    </SolutionLayout>
  );
};
