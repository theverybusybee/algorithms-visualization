import {
  baseURL,
  testInput,
  addButton,
  removeButton,
  clearButton,
  testCircle,
} from "../../src/constants/constants";
import {
  ITERATION_TIME_FOR_ANIMATION_LONG,
  ITERATION_TIME_FOR_ANIMATION_SHORT,
} from "../../src/components/utils/constants";
import { colors } from "../constants";

describe("string sorting works correctly", function () {
  beforeEach(function () {
    cy.visit(`${baseURL}/stack`);
  });

  it("is button disabled while input is empty", function () {
    cy.get(testInput).should("be.empty");
    cy.get(addButton).should("be.disabled");
    cy.get(removeButton).should("be.disabled");
    cy.get(clearButton).should("be.disabled");
  });

  it("adding elements to stack works properly", function () {
    const inputNumbers = [13, 34, 55];

    for (let i = 0; i < inputNumbers.length; i++) {
      cy.get(testInput).type(inputNumbers[i]);
      cy.get(addButton).should("not.be.disabled");
      cy.get(addButton).click();

      cy.get(testCircle).each((el, index, list) => {
        const { length } = list;
        if (index < length - 1 && length !== 1) {
          cy.get(el).contains(inputNumbers[index]);
          cy.get(el).should("have.css", "border-color", colors.default);
        }
        if (index === length - 1 || length === 1) {
          cy.get(el).contains(inputNumbers[index]);
          cy.get(el).should("have.css", "border-color", colors.changing);
          cy.get(el).contains(inputNumbers[index]);
          cy.get(el).should("have.css", "border-color", colors.default);
        }
      });
    }
  });

  it("removing elements to stack works properly", function () {
    const inputNumbers = [13, 34, 55];

    inputNumbers.forEach((el) => {
      cy.get(testInput).type(el);
      cy.get(addButton).should("not.be.disabled");
      cy.get(addButton).click();
    });

    cy.get(removeButton).should("not.be.disabled");
    cy.get(removeButton).click();
    cy.get(testCircle).should("have.length", inputNumbers.length);
    cy.get(testCircle).each((el, index) => {
      console.log(inputNumbers[index]);
      cy.get(el).contains(inputNumbers[index]);
    });
    cy.get(testCircle)
      .last()
      .should("have.css", "border-color", colors.changing);
    cy.wait(ITERATION_TIME_FOR_ANIMATION_LONG);
    cy.get(testCircle).should("have.length", inputNumbers.length - 1);
    cy.get(testCircle).each((el, index) => {
      cy.get(el).contains(inputNumbers[index]);
    });
  });

  it("clearing elements from stack works properly", function () {
    const inputNumbers = [13, 34, 55];

    inputNumbers.forEach((el) => {
      cy.get(testInput).type(el);
      cy.get(addButton).should("not.be.disabled");
      cy.get(addButton).click();
    });

    cy.get(clearButton).should("not.be.disabled");
    cy.get(clearButton).click();
    cy.get(testCircle).should("have.length", 0);
    cy.get(clearButton).should("be.disabled");
  });
});
