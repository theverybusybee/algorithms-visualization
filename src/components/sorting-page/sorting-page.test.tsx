import { ElementStates } from "../../types/element-states";
import { bubbleSort } from "../utils/sort-functions";
import { SortArrayButtons } from "../../types/buttons";

describe("Sorting algorithms test", () => {
  it("Empty array sorting using bubble sort in ascending order", async () => {
    const setArrayState = jest.fn();
    const buttonState = SortArrayButtons.Ascending;

    await bubbleSort([], buttonState, setArrayState);

    expect(setArrayState).toHaveBeenCalledTimes(0);
  });

  it("Empty array sorting using bubble sort in descending order", async () => {
    const setArrayState = jest.fn();
    const buttonState = SortArrayButtons.Descending;

    await bubbleSort([], buttonState, setArrayState);

    expect(setArrayState).toHaveBeenCalledTimes(0);
  });

  it("bubble sort works with single symbol properly in ascending order", async () => {
    const numberArr = [1];

    const setArrayState = jest.fn();
    const buttonState = SortArrayButtons.Ascending;

    await bubbleSort(numberArr, buttonState, setArrayState);

    expect(setArrayState).toHaveBeenCalledWith(
      numberArr.map((number) => ({
        value: number,
        type: ElementStates.Modified,
      }))
    );
  });

  it("bubble sort works with single symbol properly in descending order", async () => {
    const numberArr = [1];

    const setArrayState = jest.fn();
    const buttonState = SortArrayButtons.Descending;

    await bubbleSort(numberArr, buttonState, setArrayState);

    expect(setArrayState).toHaveBeenCalledWith(
      numberArr.map((number) => ({
        value: number,
        type: ElementStates.Modified,
      }))
    );
  });

  it("bubble sort works with array of symbols properly in ascending order", async () => {
    const numberArr = [1, 54, 23, 12, 88, 6];
    const expectedArrInAscendingOrder = [1, 6, 12, 23, 54, 88];

    const setArrayState = jest.fn();
    const buttonState = SortArrayButtons.Ascending;

    await bubbleSort(numberArr, buttonState, setArrayState);
    jest.setTimeout(20000)
    

    expect(setArrayState).toHaveBeenCalledWith(
      expectedArrInAscendingOrder.map((number) => ({
        value: number,
        type: ElementStates.Modified,
      }))
    );
  }, 30000);


  it("bubble sort works with array of symbols properly in descending order", async () => {
    const numberArr = [1, 54, 23, 12, 88, 6];
    const expectedArrInDescendingOrder = [88, 54, 23, 12, 6, 1];

    const setArrayState = jest.fn();
    const buttonState = SortArrayButtons.Descending;

    jest.setTimeout(10000)
    await bubbleSort(numberArr, buttonState, setArrayState);

    expect(setArrayState).toHaveBeenCalledWith(
      expectedArrInDescendingOrder.map((number) => ({
        value: number,
        type: ElementStates.Modified,
      }))
    );
  }, 30000);
});
