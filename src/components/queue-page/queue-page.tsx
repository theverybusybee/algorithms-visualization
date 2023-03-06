import React, { useEffect, useState } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TSortingStringArray } from "../utils/types";
import { Queue } from "./queue-class";
import { ElementStates } from "../../types/element-states";
import { setDelayForAnimation } from "../utils/utils";
import { ITERATION_TIME_FOR_ANIMATION_LONG } from "../utils/constants";
export type TQueueArr = {
  value: null | number | string;
  type: ElementStates;
};

export const QueuePage: React.FC = () => {
  const [inputState, setInputState] = useState("");
  const [queueArray, setQueueArray] = useState<(TQueueArr | null)[]>([]);
  const [queue, setQueue] = useState(new Queue<TQueueArr>(7));

  useEffect(() => {
    const emptyArr: TQueueArr[] = new Array(7).fill({
      value: "",
      type: ElementStates.Default,
    });
    setQueueArray(emptyArr);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.currentTarget.value;
    setInputState(targetValue);
  };

  async function addToQueue() {
    if (inputState) {
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
    }
  }

  async function removeFromQueue() {

     
      queueArray[queue.getHead()] = {
        value: "",
        type: ElementStates.Changing,
      };
      setQueueArray([...queueArray]);
       queue.dequeue();
      setQueue(queue);
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      queueArray[queue.getHead() - 1] = {
        value: inputState,
        type: ElementStates.Default,
      };

      setQueueArray([...queueArray]);
    }
  


  return (
    <SolutionLayout title="Очередь">
      <div className={styles.stack}>
        <form
          // onSubmit={}
          className={styles.stackContainer}
        >
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
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить"
            linkedList="small"
            onClick={removeFromQueue}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Очистить"
            linkedList="small"
            // onClick={clearStack}
          ></Button>
        </form>
        <p className={styles.caption}>Максимум — 4 символа</p>
        <div className={styles.circleContainer}>
          {queueArray &&
            queueArray.map((el, index) => {
              console.log(queue.getTail());
              console.log(queueArray.length);
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
                  // head={isTop(stackArrState, index)}
                />
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
