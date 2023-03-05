import styles from "./list-page.module.css";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TSortingStringArray } from "../utils/types";
import { List, Node } from "./list-class";

export const ListPage: React.FC = () => {
  const [listArrState, setListArrState] = useState<TSortingStringArray[]>([]);
  const [inputState, setInputState] = useState<string>("");
  const [indexInputState, setIndexInputState] = useState<string>("");

  const list = useMemo(() => {
    return new List<string>(new Node("1245"));
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value
    setInputState(inputValue);
        
  };


  function pushNode(value: string) {
    list.addToTheHead(value);
    list.iterate();
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.stack}>
        <div className={styles.stackContainer}>
          <Input
            onChange={onInputChange}
            extraClass={styles.input}
            // onChange={}
            maxLength={4}
            // value={inputState}
            placeholder="Введите значение"
          />
          <Button
            onClick={() => pushNode(inputState)}
            extraClass={styles.button}
            text="Добавить в head"
            linkedList="small"
            type="button"
          ></Button>
          <Button
            extraClass={styles.button}
            text="Добавить в tail"
            linkedList="small"
            // onClick={}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить из head"
            linkedList="small"
            // onClick={clearStack}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить из tail"
            linkedList="small"
            // onClick={clearStack}
          ></Button>
        </div>
        <p className={styles.caption}>Максимум — 4 символа</p>
        <form
          // onSubmit={}
          className={styles.stackContainer}
        >
          <Input
            extraClass={styles.input}
            // onChange={}
            maxLength={4}
            // value={inputState}
            placeholder="Введите индекс"
          />
          <Button
            extraClass={styles.button}
            text="Добавить по индексу"
            type="button"
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить по индексу"
            // onClick={}
          ></Button>
        </form>
        <div className={styles.circleContainer}></div>
      </div>
    </SolutionLayout>
  );
};
