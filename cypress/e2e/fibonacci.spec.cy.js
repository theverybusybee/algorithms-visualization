import {
  baseURL,
  submitButton,
  testCircle,
  testInput,
} from "../../src/constants/constants";
import { ITERATION_TIME_FOR_ANIMATION_SHORT } from "../../src/components/utils/constants";
import { colors } from "../constants";

describe("fibonacci sequence works correctly", function () {
  beforeEach(function () {
    cy.visit(`${baseURL}/fibonacci`);
  });

  it("is button disabled while input is empty", function () {
    cy.get(testInput).should("be.empty");
    cy.get(submitButton).should("be.disabled");
  });

  it("string expands properly", function () {
    const inputString = 7;
    const fibonacciArray = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

    cy.get(testInput).type(inputString);
    cy.get(submitButton).should("not.be.disabled");
    cy.get(submitButton).click();

    for (let i = 0; i < inputString; i++) {
      cy.get(testCircle).each((el, index, list) => {
        cy.get(el).contains(fibonacciArray[index]);
        cy.get(el).should("have.css", "border-color", colors.default);
      });

      cy.wait(ITERATION_TIME_FOR_ANIMATION_SHORT);
    }
  });
});
