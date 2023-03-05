import styles from "./list-page.module.css";
import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TSortingArray } from "../utils/types";
import { List, Node } from "./list-class";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const [inputState, setInputState] = useState<string>("");
  const [indexInputState, setIndexInputState] = useState<string>();
  const [arrayFromLinkedListState, setArrayFromLinkedListState] = useState<
    TSortingArray[]
  >([]);

  const list = useMemo(() => {
    return new List<string>(new Node("1245"));
  }, []);

  const setEmptyInput = () => {
    inputState && setInputState("");
    indexInputState && setIndexInputState("");
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setInputState(inputValue);
  };

  const onIndexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setIndexInputState(inputValue);
  };

  function addNodeToTheBeginning(value: string) {
    if (value) {
      list.insertIntoTheHead(value);
      setArrayFromLinkedListState(list.getArrayFromLinkedList());
      setEmptyInput();
    }
  }

  function addNodeToTheEnd(value: string) {
    if (value) {
      list.insertIntoTheTail(value);
      setArrayFromLinkedListState(list.getArrayFromLinkedList());
      setEmptyInput();
    }
  }

  function deleteNodeFromTheHead() {
    list.removeFromTheHead();
    setArrayFromLinkedListState(list.getArrayFromLinkedList());
  }

  function deleteNodeFromTheEnd() {
    list.removeFromTheTail();
    list.iterate();
    setArrayFromLinkedListState(list.getArrayFromLinkedList());
  }

  function insertByIndex(index: number, content: string) {
    if (inputState && indexInputState) {
      list.insertInPosition(index, content);
      setArrayFromLinkedListState(list.getArrayFromLinkedList());
      setEmptyInput();
    }
  }

  function removeByIndex(index: number) {
    if (!inputState && indexInputState) {
      list.removeFromPosition(index);
      setArrayFromLinkedListState(list.getArrayFromLinkedList());
      setEmptyInput();
    }
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.stack}>
        <div className={styles.stackContainer}>
          <Input
            extraClass={styles.input}
            maxLength={4}
            placeholder="Введите значение"
            value={inputState}
            onChange={onInputChange}
          />
          <Button
            extraClass={styles.button}
            text="Добавить в head"
            linkedList="small"
            type="button"
            onClick={() => addNodeToTheBeginning(inputState)}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Добавить в tail"
            linkedList="small"
            onClick={() => addNodeToTheEnd(inputState)}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить из head"
            linkedList="small"
            onClick={deleteNodeFromTheHead}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить из tail"
            linkedList="small"
            onClick={deleteNodeFromTheEnd}
          ></Button>
        </div>
        <p className={styles.caption}>Максимум — 4 символа</p>
        <form
          // onSubmit={}
          className={styles.stackContainer}
        >
          <Input
            extraClass={styles.input}
            maxLength={4}
            value={indexInputState}
            placeholder="Введите индекс"
            onChange={onIndexInputChange}
          />
          <Button
            extraClass={styles.button}
            text="Добавить по индексу"
            type="button"
            onClick={() => insertByIndex(Number(indexInputState), inputState)}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить по индексу"
            onClick={() => removeByIndex(Number(indexInputState))}
          ></Button>
        </form>
        <div className={styles.circleContainer}>
          {arrayFromLinkedListState &&
            arrayFromLinkedListState.map((el, index) => {
              return (
                <div className={styles.circle} key={index}>
                  <Circle letter={el.value} state={el.type} index={index} />
                  <ArrowIcon />
                </div>
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
