import styles from "./list-page.module.css";
import React, { useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TSortingArray } from "../utils/types";
import { List } from "./list-class";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { generateNumber } from "../utils/sort-functions";
import { ElementStates } from "../../types/element-states";
import { setDelayForAnimation } from "../utils/utils";
import { ITERATION_TIME_FOR_ANIMATION_LONG } from "../utils/constants";

type TElementPointer = {
  value: string;
  index: number;
};

export const ListPage: React.FC = () => {
  const [inputState, setInputState] = useState<string>("");
  const [indexInputState, setIndexInputState] = useState<string>();
  const [arrayFromLinkedList, setArrayFromLinkedList] = useState<
    TSortingArray[]
  >([]);
  const [elementPointer, setElementPointer] = useState<TElementPointer | null>(
    null
  );

  const createArr = () => {
    const arr: string[] = [];
    for (let i = 0; i < 4; i++) {
      arr.push(String(generateNumber(0, 100)));
    }
    return arr;
  };

  const list = useMemo(() => {
    return new List<string>(createArr());
  }, []);

  useEffect(() => {
    setArrayFromLinkedList(list.getArrayFromLinkedList());
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

  const setElementTypeChanging = (
    arr: TSortingArray[],
    type: ElementStates,
    index: number
  ) => {
    setArrayFromLinkedList(
      arr.map((element, elementIndex) =>
        elementIndex === index ? { ...element, type: type } : { ...element }
      )
    );
  };

  const makeEmptyCircle = (index: number) => {
    setArrayFromLinkedList(
      arrayFromLinkedList.map((element, elementIndex) =>
        elementIndex === index ? { ...element, value: "" } : { ...element }
      )
    );
  };

  const setPointerPosition = (index: number) => {
    setElementPointer({
      value: arrayFromLinkedList[index].value,
      index: index,
    });
  };

  async function addNodeToTheBeginning(value: string) {
    if (value) {
      setEmptyInput();
      setElementPointer({
        value: value,
        index: 0,
      });
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      list.insertIntoTheHead(value);
      setElementTypeChanging(
        list.getArrayFromLinkedList(),
        ElementStates.Modified,
        0
      );
      setElementPointer(null);

      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      setElementTypeChanging(
        list.getArrayFromLinkedList(),
        ElementStates.Default,
        0
      );
    }
  }

  async function addNodeToTheEnd(value: string) {
    if (value) {
      setEmptyInput();
      setElementPointer({
        value: value,
        index: arrayFromLinkedList.length - 1,
      });
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      list.insertIntoTheTail(value);
      setElementTypeChanging(
        list.getArrayFromLinkedList(),
        ElementStates.Modified,
        arrayFromLinkedList.length
      );
      setElementPointer(null);

      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      setElementTypeChanging(
        list.getArrayFromLinkedList(),
        ElementStates.Default,
        arrayFromLinkedList.length
      );
    }
  }

  async function deleteNodeFromTheHead() {
    setPointerPosition(0);
    makeEmptyCircle(0);
    await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);

    setElementPointer(null);
    list.removeFromTheHead();
    setArrayFromLinkedList(list.getArrayFromLinkedList());
  }

  async function deleteNodeFromTheEnd() {
    setPointerPosition(arrayFromLinkedList.length - 1);
    makeEmptyCircle(arrayFromLinkedList.length - 1);
    await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
    setElementPointer(null);
    list.removeFromTheTail();
    setArrayFromLinkedList(list.getArrayFromLinkedList());
  }

  async function step(
    arr: TSortingArray[],
    index: number,
    i = 0
  ): Promise<TSortingArray[]> {
    const initialArr = arr;
    if (i < index) {
      initialArr.map((element, elementIndex) =>
        elementIndex === i
          ? { ...element, type: ElementStates.Changing }
          : { ...element }
      );
      i++;
      setArrayFromLinkedList(initialArr);
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      return step(initialArr, index, i);
    }
    return arr
  }

  async function insertByIndex(index: number, content: string) {
    if (inputState && indexInputState) {
      step(arrayFromLinkedList, index);
      setElementTypeChanging(arrayFromLinkedList, ElementStates.Changing, 2)
      console.log(arrayFromLinkedList)
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      
      // await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      // list.insertByPosition(index, content);
      // setArrayFromLinkedList(list.getArrayFromLinkedList());
      console.log(arrayFromLinkedList);
      setEmptyInput();
    }
  }
console.log(arrayFromLinkedList);
  async function removeByIndex(index: number) {
    if (!inputState && indexInputState) {
      setElementTypeChanging(arrayFromLinkedList, ElementStates.Changing, 1)
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      setElementTypeChanging(arrayFromLinkedList, ElementStates.Changing, 2)
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      list.removeFromPosition(index);
      setArrayFromLinkedList(list.getArrayFromLinkedList());
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
        <form className={styles.stackContainer}>
          <Input
            extraClass={styles.input}
            maxLength={4}
            value={indexInputState}
            placeholder="Введите индекс"
            onChange={onIndexInputChange}
            type="number"
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
          {arrayFromLinkedList &&
            arrayFromLinkedList.map((el, index) => {
              if (index === 0 && elementPointer?.index === index) {
                return (
                  <div className={styles.circle} key={index}>
                    {elementPointer?.index === index && (
                      <Circle
                        extraClass={styles.circlePointer}
                        letter={elementPointer.value}
                        state={ElementStates.Changing}
                        isSmall
                      />
                    )}
                    <Circle letter={el.value} state={el.type} index={index} />
                    <ArrowIcon />
                  </div>
                );
              } else if (index === 0)
                return (
                  <div className={styles.circle} key={index}>
                    <Circle
                      letter={el.value}
                      state={el.type}
                      index={index}
                      head="head"
                    />
                    <ArrowIcon />
                  </div>
                );

              if (
                index > 0 &&
                index < arrayFromLinkedList.length - 1 &&
                elementPointer?.index === index
              ) {
                return (
                  <div className={styles.circle} key={index}>
                    <Circle
                      extraClass={styles.circlePointer}
                      letter={elementPointer.value}
                      state={ElementStates.Changing}
                      isSmall
                    />
                    <Circle letter={el.value} state={el.type} index={index} />
                    <ArrowIcon />
                  </div>
                );
              } else if (index > 0 && index < arrayFromLinkedList.length - 1) {
                return (
                  <div className={styles.circle} key={index}>
                    <Circle letter={el.value} state={el.type} index={index} />
                    <ArrowIcon />
                  </div>
                );
              }
              if (
                index === arrayFromLinkedList.length - 1 &&
                elementPointer?.index === index
              ) {
                return (
                  <div className={styles.circle} key={index}>
                    <Circle
                      extraClass={`${styles.circlePointer} ${styles.tailCirclePointer}`}
                      letter={elementPointer.value}
                      state={ElementStates.Changing}
                      isSmall
                    />
                    <Circle letter={el.value} state={el.type} index={index} />
                  </div>
                );
              } else if (index === arrayFromLinkedList.length - 1) {
                return (
                  <div className={styles.circle} key={index}>
                    <Circle
                      letter={el.value}
                      state={el.type}
                      index={index}
                      tail="tail"
                    />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
