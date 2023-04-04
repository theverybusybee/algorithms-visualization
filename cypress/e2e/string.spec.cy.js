import {
  baseURL,
  testButton,
  testCircle,
  testInput,
} from "../../src/constants/constants";
import {
  ITERATION_TIME_FOR_ANIMATION_LONG,
  ITERATION_TIME_FOR_ANIMATION_SHORT,
} from "../../src/components/utils/constants";

describe("string sorting works correctly", function () {
  beforeEach(function () {
    cy.visit(`${baseURL}/recursion`);
  });

  it("is button disabled while input is empty", function () {
    cy.get(testInput).should("be.empty");
    cy.get(testButton).should("be.disabled");
  });

  it("string expands properly", function () {
    const inputString = "busybee";
    const stringAfterFirstIteration = "eusybeb";
    const reversedString = "eebysub";

    const stringLength = inputString.length;

    const firstIterationColors = [
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
    ];

    const secondIterationColors = [
      "rgb(127, 224, 81)",
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
      "rgb(127, 224, 81)",
    ];

    const lastIterationColors = [
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
    ];

    cy.get(testInput).type(inputString);
    cy.get(testButton).should("not.be.disabled");
    cy.get(testButton).click();

    cy.get(testCircle).each((el, index, list) => {
      cy.get(list).should("have.length", stringLength);
      cy.get(el).contains(inputString[index]);
      cy.get(el).should(
        "have.css",
        "border-color",
        firstIterationColors[index]
      );
    });

    cy.wait(ITERATION_TIME_FOR_ANIMATION_SHORT);

    cy.get(testCircle).each((el, index, list) => {
      cy.get(el).contains(stringAfterFirstIteration[index]);
      cy.get(el).should(
        "have.css",
        "border-color",
        secondIterationColors[index]
      );
    });

    cy.wait(ITERATION_TIME_FOR_ANIMATION_LONG);

    cy.get(testCircle).each((el, index, list) => {
      cy.get(el).contains(reversedString[index]);
      cy.get(el).should("have.css", "border-color", lastIterationColors[index]);
    });
  });
});
