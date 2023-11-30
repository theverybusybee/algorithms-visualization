import {
  baseURL,
  testInput,
  addButton,
  removeButton,
  clearButton,
  testCircle,
  testHead,
  testTail,
} from "../../src/constants/constants";
import {
  ITERATION_TIME_FOR_ANIMATION_LONG,
  ITERATION_TIME_FOR_ANIMATION_SHORT,
} from "../../src/components/utils/constants";
import { colors } from "../constants";

describe("queue functionality works correctly", function () {
  beforeEach(function () {
    cy.visit(`${baseURL}/queue`);
  });

  it("is button disabled while input is empty", function () {
    cy.get(testInput).should("be.empty");
    cy.get(addButton).should("be.disabled");
    cy.get(removeButton).should("be.disabled");
    cy.get(clearButton).should("be.disabled");
  });

  it("adding elements to queue works properly", function () {
    const inputNumbers = [13, 34, 55];

    for (let i = 0; i < inputNumbers.length; i++) {
      cy.get(testInput).type(inputNumbers[i]);
      cy.get(addButton).should("not.be.disabled");
      cy.get(addButton).click();
      cy.get(testCircle)
        .eq(i)
        .should("have.css", "border-color", colors.changing);
      cy.wait(ITERATION_TIME_FOR_ANIMATION_SHORT);
      cy.get(testCircle).eq(i).should("have.text", inputNumbers[i]);
      cy.get(testCircle)
        .eq(i)
        .should("have.css", "border-color", colors.default);
      cy.wait(ITERATION_TIME_FOR_ANIMATION_LONG);
    }

    cy.get(testHead)
      .eq(0)
      .within((el) => expect(el).to.have.text("head"));

    cy.get(testTail)
      .eq(2)
      .within((el) => expect(el).to.have.text("tail"));
  });

  it("removing elements from queue works properly", function () {
    const inputNumbers = [13, 34, 55];

    for (let i = 0; i < inputNumbers.length; i++) {
      cy.get(testInput).type(inputNumbers[i]);
      cy.get(addButton).should("not.be.disabled");
      cy.get(addButton).click();
    }

    for (let i = 0; i < inputNumbers.length - 1; i++) {
      cy.get(removeButton).should("not.be.disabled");
      cy.get(removeButton).click();
      cy.get(testCircle)
        .eq(i)
        .should("have.css", "border-color", colors.changing);
      cy.wait(ITERATION_TIME_FOR_ANIMATION_LONG);
      cy.get(testCircle)
        .eq(i)
        .should("have.css", "border-color", colors.default);
      cy.get(testHead)
        .eq(i + 1)
        .within((el) => expect(el).to.have.text("head"));
      cy.get(testTail)
        .eq(inputNumbers.length - 1)
        .within((el) => expect(el).to.have.text("tail"));
      cy.get(testCircle).eq(i).should("have.text", "");
    }
    cy.get(testHead)
      .eq(inputNumbers.length - 1)
      .within((el) => expect(el).to.have.text("head"));
    cy.get(testTail)
      .eq(inputNumbers.length - 1)
      .within((el) => expect(el).to.have.text("tail"));
    cy.get(removeButton).click();
    cy.get(testCircle)
      .eq(inputNumbers.length - 1)
      .should("have.css", "border-color", colors.changing);
    cy.wait(ITERATION_TIME_FOR_ANIMATION_LONG);
    cy.get(testCircle)
      .eq(inputNumbers.length - 1)
      .should("have.css", "border-color", colors.default);
    cy.get(testCircle).each((el) => {
      cy.get(el).should("have.text", "");
    });
    cy.get(testHead).each((el) => {
      cy.get(el).should("have.text", "");
    });
    cy.get(testTail).each((el) => {
      cy.get(el).should("have.text", "");
    });

    cy.get(addButton).should("be.disabled");
    cy.get(removeButton).should("be.disabled");
    cy.get(clearButton).should("be.disabled");
  });

  it("clearing elements from queue works properly", function () {
    const inputNumbers = [13, 34, 55];

    for (let i = 0; i < inputNumbers.length; i++) {
      cy.get(testInput).type(inputNumbers[i]);
      cy.get(addButton).should("not.be.disabled");
      cy.get(addButton).click();
      cy.wait(ITERATION_TIME_FOR_ANIMATION_LONG);
    }

    cy.get(clearButton).should("not.be.disabled");
    cy.get(clearButton).click();

    cy.get(testCircle).each((el) => {
      cy.get(el).should("have.text", "");
    });
    cy.get(testHead).each((el) => {
      cy.get(el).should("have.text", "");
    });
    cy.get(testTail).each((el) => {
      cy.get(el).should("have.text", "");
    });

    cy.get(addButton).should("be.disabled");
    cy.get(removeButton).should("be.disabled");
    cy.get(clearButton).should("be.disabled");
  });
});
