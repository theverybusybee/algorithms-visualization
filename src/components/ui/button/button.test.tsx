import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("button ui-component", () => {
  it("button component has inner text", () => {
    const buttonWithText = renderer
      .create(<Button text="Подтвердить" />)
      .toJSON();
    expect(buttonWithText).toMatchSnapshot();
  });

  it("button component doesn't have inner text", () => {
    const buttonWithoutText = renderer.create(<Button />).toJSON();
    expect(buttonWithoutText).toMatchSnapshot();
  });

  it("button is disabled", () => {
    const disabledButton = renderer.create(<Button disabled />).toJSON();
    expect(disabledButton).toMatchSnapshot();
  });

  it("button is loading", () => {
    const loadingButton = renderer.create(<Button isLoader={true} />).toJSON();
    expect(loadingButton).toMatchSnapshot();
  });

  // it("button works correctly after click event", () => {
  //   const testFunction = jest.fn();
  //   render(<Button onClick={testFunction} />);
  //   fireEvent.click(screen.getByRole("button"));
  //   expect(testFunction).toHaveBeenCalled();
  // });
});
