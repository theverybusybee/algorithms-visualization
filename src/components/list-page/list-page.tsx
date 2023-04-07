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
import { ITERATION_TIME_FOR_ANIMATION_SHORT } from "../utils/constants";
import { LinkedListButtons } from "../../types/buttons";

type TElementPointer = {
  value: string;
  index: number;
};

export const ListPage: React.FC = () => {
  const [inputState, setInputState] = useState<string>("");
  const [indexInputState, setIndexInputState] = useState<string>("");
  const [arrayFromLinkedList, setArrayFromLinkedList] = useState<
    TSortingArray[]
  >([]);
  const [elementPointer, setElementPointer] = useState<TElementPointer | null>(
    null
  );
  const [activeButton, setActiveButton] = useState<LinkedListButtons | null>(
    null
  );

  console.log(elementPointer);
  console.log(inputState);

  const isIndexMetTheConditions = useMemo(() => {
    if (indexInputState) {
      return arrayFromLinkedList.length &&
        (Number(indexInputState) === 0 ||
          Number(indexInputState) < arrayFromLinkedList.length)
        ? true
        : false;
    }
  }, [indexInputState, arrayFromLinkedList.length]);

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

  const setPointerPosition = (index: number, value: string) => {
    setElementPointer({
      value: value,
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
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
      list.insertIntoTheHead(value);
      setElementTypeChanging(
        list.getArrayFromLinkedList(),
        ElementStates.Modified,
        0
      );
      setElementPointer(null);

      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
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
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
      list.insertIntoTheTail(value);
      setElementTypeChanging(
        list.getArrayFromLinkedList(),
        ElementStates.Modified,
        arrayFromLinkedList.length
      );
      setElementPointer(null);

      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
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
    setPointerPosition(0, arrayFromLinkedList[0].value);
    makeEmptyCircle(0);
    await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);

    setElementPointer(null);
    list.removeFromTheHead();
    setArrayFromLinkedList(list.getArrayFromLinkedList());
    setActiveButton(null);
  }

  async function deleteNodeFromTheEnd() {
    setActiveButton(LinkedListButtons.RemoveFromEnd);
    setPointerPosition(
      arrayFromLinkedList.length - 1,
      arrayFromLinkedList[arrayFromLinkedList.length - 1].value
    );
    makeEmptyCircle(arrayFromLinkedList.length - 1);
    await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
    setElementPointer(null);
    list.removeFromTheTail();
    setArrayFromLinkedList(list.getArrayFromLinkedList());
    setActiveButton(null);
  }

  async function changeColorStepByStep(
    index: number,
    isPointer: boolean,
    circlePointerValue: string
  ) {
    for (let i = 0; i <= index; i++) {
      isPointer && setPointerPosition(i, circlePointerValue);
      if (i < index) {
        await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
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
      const inputValue = inputState;
      setActiveButton(LinkedListButtons.InsertByIndex);

      setEmptyInput();
      await changeColorStepByStep(index, true, inputValue);

      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
      setElementPointer(null);
      list.insertByPosition(index, content);
      setArrayFromLinkedList(list.getArrayFromLinkedList());
      changeColor(list.getArrayFromLinkedList(), index, ElementStates.Modified);
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
      changeColor(list.getArrayFromLinkedList(), index, ElementStates.Default);
      setActiveButton(null);
    }
  }
  async function removeByIndex(index: number) {
    if (indexInputState) {
      setActiveButton(LinkedListButtons.ExtractByIndex);

      setEmptyInput();
      await changeColorStepByStep(
        index,
        false,
        arrayFromLinkedList[index].value
      );

      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
      makeEmptyCircle(index);
       setPointerPosition(
        index,
        arrayFromLinkedList[index].value
      );
      await setDelayForAnimation(ITERATION_TIME_FOR_ANIMATION_SHORT);
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
            data-testid="input-for-value"
            extraClass={styles.input}
            maxLength={4}
            placeholder="Введите значение"
            value={inputState}
            onChange={onInputChange}
          />
          <Button
            data-testid="add-to-head-button"
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
            data-testid="add-to-tail-button"
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
            data-testid="remove-from-head-button"
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
            data-testid="remove-from-tail-button"
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
            data-testid="input-for-index"
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
            data-testid="add-element-by-index"
            extraClass={styles.button}
            text="Добавить по индексу"
            type="button"
            onClick={() => insertByIndex(Number(indexInputState), inputState)}
            disabled={
              !inputState ||
              Number(indexInputState) > arrayFromLinkedList.length - 1 ||
              !indexInputState ||
              !arrayFromLinkedList.length ||
              (activeButton && activeButton !== LinkedListButtons.InsertByIndex)
                ? true
                : false
            }
            isLoader={activeButton === LinkedListButtons.InsertByIndex && true}
          ></Button>
          <Button
            data-testid="remove-element-by-index"
            extraClass={styles.button}
            text="Удалить по индексу"
            onClick={() => removeByIndex(Number(indexInputState))}
            disabled={
              !isIndexMetTheConditions ||
              Number(indexInputState) > arrayFromLinkedList.length - 1 ||
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
                        data-testid="head-circle-pointer"
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
                      data-testid="head-circle-pointer"
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
                      data-testid="tail-circle-pointer"
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
