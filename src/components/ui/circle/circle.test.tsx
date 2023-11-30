import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Circle component testing events", () => {
  it("Circle is empty", () => {
    const emptyCircle = renderer.create(<Circle />).toJSON();
    expect(emptyCircle).toMatchSnapshot();
  });

  it("Circle contains letter", () => {
    const circleWithLetter = renderer.create(<Circle letter="B" />).toJSON();
    expect(circleWithLetter).toMatchSnapshot();
  });

  it("Circle has head", () => {
    const circleWitHead = renderer.create(<Circle head="top" />).toJSON();
    expect(circleWitHead).toMatchSnapshot();
  });

  it("Circle has another component in its head attribute", () => {
    const circleWithComponentInHead = renderer
      .create(<Circle head={<Circle />} />)
      .toJSON();
    expect(circleWithComponentInHead).toMatchSnapshot();
  });

  it("Circle has tail", () => {
    const circleWitTail = renderer.create(<Circle tail="bottom" />).toJSON();
    expect(circleWitTail).toMatchSnapshot();
  });

  it("Circle has another component in its tail attribute", () => {
    const circleWithComponentInTail = renderer
      .create(<Circle tail={<Circle />} />)
      .toJSON();
    expect(circleWithComponentInTail).toMatchSnapshot();
  });

  it("Circle has visible index", () => {
    const circleWithIndex = renderer.create(<Circle index={0} />).toJSON();
    expect(circleWithIndex).toMatchSnapshot();
  });

  it("Circle is small", () => {
    const smallCircle = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(smallCircle).toMatchSnapshot();
  });

  it("Circle is in default state", () => {
    const defaultCircle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(defaultCircle).toMatchSnapshot();
  });

  it("Circle is in changing state", () => {
    const changingCircle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(changingCircle).toMatchSnapshot();
  });

  it("Circle is in modified state", () => {
    const modifiedCircle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(modifiedCircle).toMatchSnapshot();
  });
});
