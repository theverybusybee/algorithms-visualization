import { sortStringArray } from "./string";
import { ElementStates } from "../../types/element-states";

describe("String component test", () => {
  it("string expands with even number of symbols properly", async () => {
    const string = "desserts";
    const reversedString = "stressed";

    const setSortingCharactersState = jest.fn();
    const setButtonState = jest.fn();

    await sortStringArray(
      string.split("").map((value) => ({
        value: value,
        type: ElementStates.Default,
      })),
      setSortingCharactersState,
      setButtonState
    );

    expect(setSortingCharactersState).toHaveBeenCalledWith(
      reversedString.split("").map((value) => ({
        value: value,
        type: ElementStates.Modified,
      }))
    );
  });

  it("string expands with odd number of symbols properly", async () => {
    const string = "mug";
    const reversedString = "gum";

    const setSortingCharactersState = jest.fn();
    const setButtonState = jest.fn();

    await sortStringArray(
      string.split("").map((value) => ({
        value: value,
        type: ElementStates.Default,
      })),
      setSortingCharactersState,
      setButtonState
    );

    expect(setSortingCharactersState).toHaveBeenCalledWith(
      reversedString.split("").map((value) => ({
        value: value,
        type: ElementStates.Modified,
      }))
    );
  });

  it("string expands with single symbol properly", async () => {
    const string = "✨";
    const reversedString = "✨";

    const setSortingCharactersState = jest.fn();
    const setButtonState = jest.fn();

    await sortStringArray(
      string.split("").map((value) => ({
        value: value,
        type: ElementStates.Default,
      })),
      setSortingCharactersState,
      setButtonState
    );

    expect(setSortingCharactersState).toHaveBeenCalledWith(
      reversedString.split("").map((value) => ({
        value: value,
        type: ElementStates.Modified,
      }))
    );
  });

  it("string expands without symbols properly", async () => {
    const string = "";

    const setSortingCharactersState = jest.fn();
    const setButtonState = jest.fn();

    await sortStringArray(
      string.split("").map((value) => ({
        value: value,
        type: ElementStates.Default,
      })),
      setSortingCharactersState,
      setButtonState
    );

    expect(setSortingCharactersState).toHaveBeenCalledTimes(0);
  });

});
