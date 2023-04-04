import {
  baseURL,
  testButton,
  testCircle,
  testInput,
} from "../../src/constants/constants";
import {
  ITERATION_TIME_FOR_ANIMATION_SHORT,
} from "../../src/components/utils/constants";

describe("string sorting works correctly", function () {
  beforeEach(function () {
    cy.visit(`${baseURL}/fibonacci`);
  });

  it("is button disabled while input is empty", function () {
    cy.get(testInput).should("be.empty");
    cy.get(testButton).should("be.disabled");
  });

  it("string expands properly", function () {
    const inputString = 7;
    const fibonacciArray = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
    const defaultColor = "rgb(0, 50, 255)";

    cy.get(testInput).type(inputString);
    cy.get(testButton).should("not.be.disabled");
    cy.get(testButton).click();

    for (let i = 0; i < inputString; i++) {
      cy.get(testCircle).each((el, index, list) => {
        cy.get(el).contains(fibonacciArray[index]);
        cy.get(el).should("have.css", "border-color", defaultColor);
      });

      cy.wait(ITERATION_TIME_FOR_ANIMATION_SHORT);
    }
  });
});
