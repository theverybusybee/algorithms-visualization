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
import { LinkedListButtons } from "../../types/buttons";

type TElementPointer = {
  value: string;
  index: number;
};

export const ListPage: React.FC = () => {
  const [inputState, setInputState] = useState<string>("");
  const [indexInputState, setIndexInputState] = useState<number>(0);
  const [arrayFromLinkedList, setArrayFromLinkedList] = useState<
    TSortingArray[]
  >([]);
  const [elementPointer, setElementPointer] = useState<TElementPointer | null>(
    null
  );
  const [activeButton, setActiveButton] = useState<LinkedListButtons | null>(
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

  console.log(arrayFromLinkedList)

  const setEmptyInput = () => {
    inputState && setInputState("");
    indexInputState && setIndexInputState(0);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setInputState(inputValue);
  };

  const onIndexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setIndexInputState(Number(inputValue));
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
      setActiveButton(LinkedListButtons.AddToHead);
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
      setActiveButton(null);
    }
  }

  async function addNodeToTheEnd(value: string) {
    if (value) {
      setActiveButton(LinkedListButtons.AddToEnd);
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
      setActiveButton(null);
    }
  }

  async function deleteNodeFromTheHead() {
    setActiveButton(LinkedListButtons.RemoveFromHead);
    setPointerPosition(0);
    makeEmptyCircle(0);
    await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);

    setElementPointer(null);
    list.removeFromTheHead();
    setArrayFromLinkedList(list.getArrayFromLinkedList());
    setActiveButton(null);
  }

  async function deleteNodeFromTheEnd() {
    setActiveButton(LinkedListButtons.RemoveFromEnd);
    setPointerPosition(arrayFromLinkedList.length - 1);
    makeEmptyCircle(arrayFromLinkedList.length - 1);
    await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
    setElementPointer(null);
    list.removeFromTheTail();
    setArrayFromLinkedList(list.getArrayFromLinkedList());
    setActiveButton(null);
  }

  async function changeColorStepByStep(index: number, isPointer: boolean) {
    for (let i = 0; i <= index; i++) {
      isPointer && setPointerPosition(i);
      if (i < index) {
        await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
        changeColor(arrayFromLinkedList, i, ElementStates.Changing);
      }
    }
  }

  async function changeColor(
    arr: TSortingArray[],
    index: number,
    type: ElementStates
  ) {
    const newArr = arr;
    newArr[index].type = type;
    setArrayFromLinkedList([...newArr]);
  }

  async function insertByIndex(index: number, content: string) {
    if (inputState && indexInputState) {
      setActiveButton(LinkedListButtons.InsertByIndex);
      setEmptyInput();
      await changeColorStepByStep(index, true);
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      setElementPointer(null);
      list.insertByPosition(index, content);
      setArrayFromLinkedList(list.getArrayFromLinkedList());
      changeColor(list.getArrayFromLinkedList(), index, ElementStates.Modified);
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      changeColor(list.getArrayFromLinkedList(), index, ElementStates.Default);
      setActiveButton(null);
    }
  }
  async function removeByIndex(index: number) {
    if (indexInputState) {
      setActiveButton(LinkedListButtons.ExtractByIndex);
      setEmptyInput();
      await changeColorStepByStep(index, false);

      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      makeEmptyCircle(index);
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);

      setPointerPosition(index);
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_LONG);
      setElementPointer(null);
      list.removeFromPosition(index);
      setArrayFromLinkedList(list.getArrayFromLinkedList());
      setActiveButton(null);
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
            disabled={
              !inputState ||
              !arrayFromLinkedList.length ||
              (activeButton && activeButton !== LinkedListButtons.AddToHead)
                ? true
                : false
            }
            isLoader={activeButton === LinkedListButtons.AddToHead && true}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Добавить в tail"
            linkedList="small"
            onClick={() => addNodeToTheEnd(inputState)}
            disabled={
              !inputState ||
              !arrayFromLinkedList.length ||
              (activeButton && activeButton !== LinkedListButtons.AddToEnd)
                ? true
                : false
            }
            isLoader={activeButton === LinkedListButtons.AddToEnd && true}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить из head"
            linkedList="small"
            onClick={deleteNodeFromTheHead}
            disabled={
              !arrayFromLinkedList.length ||
              (activeButton &&
                activeButton !== LinkedListButtons.RemoveFromHead)
                ? true
                : false
            }
            isLoader={activeButton === LinkedListButtons.RemoveFromHead && true}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить из tail"
            linkedList="small"
            onClick={deleteNodeFromTheEnd}
            disabled={
              !arrayFromLinkedList.length ||
              (activeButton && activeButton !== LinkedListButtons.RemoveFromEnd)
                ? true
                : false
            }
            isLoader={activeButton === LinkedListButtons.RemoveFromEnd && true}
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
            min={1}
            max={3}
          />
          <Button
            extraClass={styles.button}
            text="Добавить по индексу"
            type="button"
            onClick={() => insertByIndex(Number(indexInputState), inputState)}
            disabled={
              
              (!inputState || !indexInputState) ||
              !arrayFromLinkedList.length ||
              (activeButton && activeButton !== LinkedListButtons.InsertByIndex)
                ? true
                : false
            }
            isLoader={activeButton === LinkedListButtons.InsertByIndex && true}
          ></Button>
          <Button
            extraClass={styles.button}
            text="Удалить по индексу"
            onClick={() => removeByIndex(Number(indexInputState))}
            disabled={ !indexInputState ||
              !arrayFromLinkedList.length ||
              (activeButton &&
                activeButton !== LinkedListButtons.ExtractByIndex)
                ? true
                : false
            }
            isLoader={activeButton === LinkedListButtons.ExtractByIndex && true}
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
