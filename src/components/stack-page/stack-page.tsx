import React, { SyntheticEvent, useState } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./stack-class";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { ITERATION_TIME_FOR_ANIMATION_SHORT } from "../utils/constants";
import { setDelayForAnimation } from "../utils/utils";
import { TSortingStringArray } from "../utils/types";

export const StackPage: React.FC = () => {
  const [inputState, setInputState] = useState("");
  const [stackArrState, setStackArrState] = useState<TSortingStringArray[]>([]);
  const [stack] = useState(new Stack<TSortingStringArray>());

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.currentTarget.value);
  };

  async function pushElement(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputState) {
      stack.push({ value: inputState, type: ElementStates.Changing });
      setInputState("");
      setStackArrState([...stack.getContent()]);
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
      stack.peak().type = ElementStates.Default;
      setStackArrState([...stack.getContent()]);
    }
  }

  async function popElement() {
    stack.peak().type = ElementStates.Changing;
    setStackArrState([...stack.getContent()]);
    await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
    stack.pop();
    setStackArrState([...stack.getContent()]);
  }

  const clearStack = () => {
    stack.clear();
    setStackArrState([...stack.getContent()]);
  };

  const isTop = (arr: TSortingStringArray[], index: number): string => {
    const { length } = arr;
    return length - 1 === index ? "top" : "";
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stack}>
        <form onSubmit={pushElement} className={styles.stackContainer}>
          <Input
            extraClass={styles.input}
            onChange={onChange}
            maxLength={4}
            value={inputState}
          />
          <Button
            extraClass={styles.button}
            text="Добавить"
            linkedList="small"
            type="submit"
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить"
            linkedList="small"
            onClick={popElement}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Очистить"
            linkedList="small"
            onClick={clearStack}
          ></Button>
        </form>
        <p className={styles.caption}>Максимум — 4 символа</p>
        <div className={styles.circleContainer}>
          {stackArrState &&
            stackArrState.map((el, index) => {
              console.log(index);
              return (
                <Circle
                  letter={el.value}
                  state={el.type}
                  key={index}
                  index={index}
                  head={isTop(stackArrState, index)}
                />
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};

