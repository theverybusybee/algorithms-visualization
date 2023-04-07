import {
  baseURL,
  submitButton,
  testCircle,
  testInput,
} from "../../src/constants/constants";
import {
  ITERATION_TIME_FOR_ANIMATION_LONG,
  ITERATION_TIME_FOR_ANIMATION_SHORT,
} from "../../src/components/utils/constants";
import { colors } from "../constants";

describe("string sorting works correctly", function () {
  beforeEach(function () {
    cy.visit(`${baseURL}/recursion`);
  });

  it("is button disabled while input is empty", function () {
    cy.get(testInput).should("be.empty");
    cy.get(submitButton).should("be.disabled");
  });

  it("string expands properly", function () {
    const inputString = "busybee";
    const stringAfterFirstIteration = "eusybeb";
    const reversedString = "eebysub";

    const stringLength = inputString.length;

    const firstIterationColors = [
      colors.changing,
      colors.default,
      colors.default,
      colors.default,
      colors.default,
      colors.default,
      colors.changing,
    ];

    const secondIterationColors = [
      colors.modified,
      colors.changing,
      colors.default,
      colors.default,
      colors.default,
      colors.changing,
      colors.modified,
    ];

    const lastIterationColors = [
      colors.modified,
      colors.modified,
      colors.modified,
      colors.modified,
      colors.modified,
      colors.modified,
      colors.modified,
    ];

    cy.get(testInput).type(inputString);
    cy.get(submitButton).should("not.be.disabled");
    cy.get(submitButton).click();

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

    cy.get(testCircle).each((el, index) => {
      cy.get(el).contains(stringAfterFirstIteration[index]);
      cy.get(el).should(
        "have.css",
        "border-color",
        secondIterationColors[index]
      );
    });

    cy.wait(ITERATION_TIME_FOR_ANIMATION_LONG);

    cy.get(testCircle).each((el, index) => {
      cy.get(el).contains(reversedString[index]);
      cy.get(el).should("have.css", "border-color", lastIterationColors[index]);
    });
  });
});
