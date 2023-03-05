import React, { useState } from "react";
import styles from './queue-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TSortingStringArray } from "../utils/types";

export const QueuePage: React.FC = () => {

  const [inputState, setInputState] = useState("");
  const [stackArrState, setStackArrState] = useState<TSortingStringArray[]>([]);
  // const [stack] = useState(new Stack<TSortingStringArray>());

  return (
    <SolutionLayout title="Очередь">
        <div className={styles.stack}>
          <form 
          // onSubmit={}
           className={styles.stackContainer}>
            <Input
              extraClass={styles.input}
              // onChange={}
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
              // onClick={}
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
            {stackArrState &&
              stackArrState.map((el, index) => {
                console.log(index);
                return (
                  <Circle
                    letter={el.value}
                    state={el.type}
                    key={index}
                    index={index}
                    // head={isTop(stackArrState, index)}
                  />
                );
              })}
          </div>
        </div>
    </SolutionLayout>
  );
};
