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
import { StackAndQueueButtons } from "../../types/buttons";

export const StackPage: React.FC = () => {
  const [inputState, setInputState] = useState("");
  const [stackArrState, setStackArrState] = useState<TSortingStringArray[]>([]);
  const [stack] = useState(new Stack<TSortingStringArray>());
  const [activeButton, setActiveButton] = useState<StackAndQueueButtons | null>(
    null
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.currentTarget.value);
  };

  async function pushElement(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputState) {
      setInputState("");
      setActiveButton(StackAndQueueButtons.Add);
      stack.push({ value: inputState, type: ElementStates.Changing });
      setInputState("");
      setStackArrState([...stack.getContent()]);
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
      stack.peak().type = ElementStates.Default;
      setStackArrState([...stack.getContent()]);
      setActiveButton(null);
    }
  }

  async function popElement() {
    if (stackArrState.length) {
      setActiveButton(StackAndQueueButtons.Remove);
      stack.peak().type = ElementStates.Changing;
      setStackArrState([...stack.getContent()]);
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
      stack.pop();
      setStackArrState([...stack.getContent()]);
      setActiveButton(null);
    }
  }

  const clearStack = () => {
    if (stackArrState.length) {
      setActiveButton(StackAndQueueButtons.Clear);
      stack.clear();
      setStackArrState([...stack.getContent()]);
      setActiveButton(null);
    }
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
             disabled={
              !inputState &&
              (!stackArrState.length ||
              (activeButton && activeButton !== StackAndQueueButtons.Add))
                ? true
                : false
            }
            isLoader={activeButton === StackAndQueueButtons.Add && true}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить"
            linkedList="small"
            onClick={popElement}
            disabled={
              (activeButton && activeButton !== StackAndQueueButtons.Remove) ||
              !stackArrState.length
                ? true
                : false
            }
            isLoader={activeButton === StackAndQueueButtons.Remove && true}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Очистить"
            linkedList="small"
            onClick={clearStack}
            disabled={
              (activeButton && activeButton !== StackAndQueueButtons.Clear) ||
              !stackArrState.length
                ? true
                : false
            }
            isLoader={activeButton === StackAndQueueButtons.Clear && true}
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
