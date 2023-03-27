import React, { useEffect, useMemo, useState } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./queue-class";
import { ElementStates } from "../../types/element-states";
import { setDelayForAnimation } from "../utils/utils";
import { ITERATION_TIME_FOR_ANIMATION_LONG } from "../utils/constants";
import { StackAndQueueButtons } from "../../types/buttons";
export type TQueueArr = {
  value: null | number | string;
  type: ElementStates;
};

export const QueuePage: React.FC = () => {
  const [inputState, setInputState] = useState("");
  const [queueArray, setQueueArray] = useState<(TQueueArr | null)[]>([]);
  const [queue, setQueue] = useState(new Queue<TQueueArr>(7));
  const [activeButton, setActiveButton] = useState<StackAndQueueButtons | null>(
    null
  );
  const emptyArr: TQueueArr[] = new Array(7).fill({
    value: "",
    type: ElementStates.Default,
  });

  const isQueueEmpty = useMemo(() => {
    return queueArray.every((el) => el!.value === "");
  }, [queueArray]);

  useEffect(() => {
    setQueueArray(emptyArr);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.currentTarget.value;
    setInputState(targetValue);
  };

  async function addToQueue() {
    if (inputState) {
      setActiveButton(StackAndQueueButtons.Add);
      setInputState("");

      queue.enqueue({ value: inputState, type: ElementStates.Default });
      setQueue(queue);
      setQueueArray([...queueArray]);
      queueArray[queue.getTail() - 1] = {
        value: "",
        type: ElementStates.Changing,
      };
      setQueueArray([...queueArray]);
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      queueArray[queue.getTail() - 1] = {
        value: inputState,
        type: ElementStates.Default,
      };
      setQueueArray([...queueArray]);
      setActiveButton(null);
    }
  }

  async function removeFromQueue() {
    if (!isQueueEmpty) {
      setActiveButton(StackAndQueueButtons.Remove);
      queueArray[queue.getHead()] = {
        value: "",
        type: ElementStates.Changing,
      };
      setQueueArray([...queueArray]);
      queue.dequeue();
      setQueue(queue);
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      queueArray[queue.getHead() - 1] = {
        value: '',
        type: ElementStates.Default,
      };

      setQueueArray([...queueArray]);
      setActiveButton(null);
    }
  }

  async function clearQueue() {
    if (queueArray.length) {
      setActiveButton(StackAndQueueButtons.Clear);
      queue.clear();
      setQueue(queue);
      setQueueArray(emptyArr);
      setActiveButton(null);
    }
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.stack}>
        <form className={styles.stackContainer}>
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
            onClick={addToQueue}
            disabled={
              !inputState ||
              !queueArray.length ||
              (activeButton && activeButton !== StackAndQueueButtons.Add)
                ? true
                : false
            }
            isLoader={activeButton === StackAndQueueButtons.Add && true}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить"
            linkedList="small"
            onClick={removeFromQueue}
            disabled={
              isQueueEmpty ||
              !queueArray.length ||
              (activeButton && activeButton !== StackAndQueueButtons.Remove)
                ? true
                : false
            }
            isLoader={activeButton === StackAndQueueButtons.Remove && true}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Очистить"
            linkedList="small"
            disabled={
              isQueueEmpty ||
              (activeButton &&
                activeButton !== StackAndQueueButtons.Clear &&
                !queueArray.length)
                ? true
                : false
            }
            onClick={clearQueue}
          ></Button>
        </form>
        <p className={styles.caption}>Максимум — 4 символа</p>
        <div className={styles.circleContainer}>
          {queueArray &&
            queueArray.map((el, index) => {
              return (
                <Circle
                  letter={el!.value}
                  state={el!.type}
                  key={index}
                  index={index}
                  head={el?.value && queue.getHead() === index ? "head" : ""}
                  tail={
                    el?.value && queue.getTail() - 1 === index ? "tail" : ""
                  }
                />
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
