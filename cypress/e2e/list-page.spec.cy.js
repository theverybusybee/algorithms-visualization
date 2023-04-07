import { ITERATION_TIME_FOR_ANIMATION_SHORT } from "../../src/components/utils/constants";
import {
  baseURL,
  testInput,
  addElementByIndexButton,
  addToHeadButton,
  addToTailButton,
  removeElementByIndexButton,
  testCircle,
  circleContent,
  testTail,
  testHead,
  circleIndex,
  inputForValue,
  inputForIndex,
  headCirclePointer,
  circlePointer,
  removeFromHeadButton,
  circlePointerContent,
  removeFromTailButton,
} from "../../src/constants/constants";
import { colors } from "../constants";

describe("liked-list functionality works correctly", () => {
  beforeEach(function () {
    cy.visit(`${baseURL}/list`);
  });

  it("button is disabled while input is empty", () => {
    cy.get(inputForValue).should("be.empty");
    cy.get(addToHeadButton).should("be.disabled");
    cy.get(addToTailButton).should("be.disabled");
    cy.get(inputForIndex).should("be.empty");
    cy.get(addElementByIndexButton).should("be.disabled");
    cy.get(removeElementByIndexButton).should("be.disabled");
  });

  it("default array expands properly", () => {
    cy.get(testCircle).should("have.length", 4);
    cy.get(testCircle).each((el) => {
      cy.get(el).should("have.css", "border-color", colors.default);
    });

    cy.get(circleContent).each((el) => {
      [][0] = el.text();
      [][1] = el.text();
      [][2] = el.text();
      [][3] = el.text();
    });

    cy.get(testHead).then((el) => {
      const { length } = Cypress.$(el);

      cy.get(el).eq(0).should("have.text", "head");

      for (let i = 1; i < length; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }
    });

    cy.get(testTail).then((el) => {
      const { length } = Cypress.$(el);

      for (let i = 0; i < length - 1; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }

      cy.get(el)
        .eq(length - 1)
        .should("have.text", "tail");
    });
  });

  it("adding element in head works properly", () => {
    const inputSymbol = "🐝";

    cy.get(inputForValue).type(inputSymbol);
    cy.get(addToHeadButton).should("not.be.disabled");
    cy.get(addToHeadButton).click();

    cy.get(inputForValue).should("be.empty");
    cy.get(circlePointer).should("have.text", inputSymbol);
    cy.get(circlePointer).should("have.css", "border-color", colors.changing);
    cy.wait(ITERATION_TIME_FOR_ANIMATION_SHORT);
    cy.get(circlePointer).should("not.exist");
    cy.get(testCircle)
      .eq(0)
      .should("have.css", "border-color", colors.modified);
    cy.get(testCircle).eq(0).should("have.css", "border-color", colors.default);
    cy.get(testCircle).eq(0).should("have.text", inputSymbol);

    cy.get(testHead).then((el) => {
      const { length } = Cypress.$(el);

      cy.get(el).eq(0).should("have.text", "head");

      for (let i = 1; i < length; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }
    });

    cy.get(testTail).then((el) => {
      const { length } = Cypress.$(el);

      for (let i = 0; i < length - 1; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }

      cy.get(el)
        .eq(length - 1)
        .should("have.text", "tail");

      cy.get(circleIndex).each((el, index) => {
        cy.get(el).should("contain", index);
      });
    });
  });

  it("removing element from head works properly", () => {
    const inputSymbols = ["🐝", "🍯"];

    for (let i = 0; i < inputSymbols.length; i++) {
      cy.get(inputForValue).type(inputSymbols[i]);
      cy.get(addToHeadButton).should("not.be.disabled");
      cy.get(addToHeadButton).click();
      cy.wait(ITERATION_TIME_FOR_ANIMATION_SHORT);
    }

    cy.get(testCircle).should("exist");
    cy.get(removeFromHeadButton).should("not.be.disabled");
    cy.get(removeFromHeadButton).click();

    cy.get(testCircle).eq(0).should("have.text", "");
    cy.get(circlePointer).should("have.text", inputSymbols[1]);
    cy.get(circlePointer).should("have.css", "border-color", colors.changing);
    cy.get(testCircle).eq(0).should("have.text", inputSymbols[0]);

    cy.get(testHead).then((el) => {
      const { length } = Cypress.$(el);

      cy.get(el).eq(0).should("have.text", "head");

      for (let i = 1; i < length; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }
    });

    cy.get(testTail).then((el) => {
      const { length } = Cypress.$(el);

      for (let i = 0; i < length - 1; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }

      cy.get(el)
        .eq(length - 1)
        .should("have.text", "tail");

      cy.get(circleIndex).each((el, index) => {
        cy.get(el).should("contain", index);
      });
    });
  });

  it("adding element in tail works properly", () => {
    const inputSymbol = "🐝";

    cy.get(inputForValue).type(inputSymbol);
    cy.get(addToTailButton).should("not.be.disabled");
    cy.get(addToTailButton).click();

    cy.get(inputForValue).should("be.empty");
    cy.get(circlePointer).should("have.text", inputSymbol);
    cy.get(circlePointer).should("have.css", "border-color", colors.changing);
    cy.wait(ITERATION_TIME_FOR_ANIMATION_SHORT);
    cy.get(circlePointer).should("not.exist");
    cy.get(testCircle)
      .last()
      .should("have.css", "border-color", colors.modified);
    cy.get(testCircle)
      .last()
      .should("have.css", "border-color", colors.default);
    cy.get(testCircle).last().should("have.text", inputSymbol);

    cy.get(testHead).then((el) => {
      const { length } = Cypress.$(el);

      cy.get(el).eq(0).should("have.text", "head");

      for (let i = 1; i < length; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }
    });

    cy.get(testTail).then((el) => {
      const { length } = Cypress.$(el);

      for (let i = 0; i < length - 1; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }

      cy.get(el)
        .eq(length - 1)
        .should("have.text", "tail");

      cy.get(circleIndex).each((el, index) => {
        cy.get(el).should("contain", index);
      });
    });
  });

  it("removing element from tail works properly", () => {
    const inputSymbols = ["🐝", "🍯"];

    for (let i = 0; i < inputSymbols.length; i++) {
      cy.get(inputForValue).type(inputSymbols[i]);
      cy.get(addToTailButton).should("not.be.disabled");
      cy.get(addToTailButton).click();
      cy.wait(ITERATION_TIME_FOR_ANIMATION_SHORT);
    }

    cy.get(testCircle).should("exist");
    cy.get(removeFromTailButton).should("not.be.disabled");
    cy.get(removeFromTailButton).click();

    cy.get(testCircle).last().should("have.text", "");
    cy.get(circlePointer).should("have.text", inputSymbols[1]);
    cy.get(circlePointer).should("have.css", "border-color", colors.changing);
    cy.get(testCircle).last().should("have.text", inputSymbols[0]);

    cy.get(testHead).then((el) => {
      const { length } = Cypress.$(el);

      cy.get(el).eq(0).should("have.text", "head");

      for (let i = 1; i < length; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }
    });

    cy.get(testTail).then((el) => {
      const { length } = Cypress.$(el);

      for (let i = 0; i < length - 1; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }

      cy.get(el)
        .eq(length - 1)
        .should("have.text", "tail");

      cy.get(circleIndex).each((el, index) => {
        cy.get(el).should("contain", index);
      });
    });
  });

  it("adding element by index works properly", () => {
    const inputData = {
      symbol: "🐝",
      index: 2,
    };

    cy.get(inputForValue).type(inputData.symbol);
    cy.get(inputForIndex).type(inputData.index);
    cy.get(addElementByIndexButton).should("not.be.disabled");
    cy.get(addElementByIndexButton).click();

    for (let i = 0; i < inputData.index; i++) {
      cy.get(circlePointer).should("have.text", inputData.symbol);
      cy.get(testCircle).should("have.css", "border-color", colors.changing);
    }
    cy.get(testCircle)
      .eq(inputData.index)
      .should("have.css", "border-color", colors.modified);
    cy.get(testCircle)
      .eq(inputData.index)
      .should("have.css", "border-color", colors.default);
    cy.get(testCircle)
      .eq(inputData.index)
      .should("have.text", inputData.symbol);

    cy.get(testHead).then((el) => {
      const { length } = Cypress.$(el);

      cy.get(el).eq(0).should("have.text", "head");

      for (let i = 1; i < length; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }
    });

    cy.get(testTail).then((el) => {
      const { length } = Cypress.$(el);

      for (let i = 0; i < length - 1; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }

      cy.get(el)
        .eq(length - 1)
        .should("have.text", "tail");

      cy.get(circleIndex).each((el, index) => {
        cy.get(el).should("contain", index);
      });
    });
  });

  it("removing element by index works properly", () => {
    const inputSymbols = ["🐝", "🍯"];
    const index = 4;

    for (let i = 0; i < inputSymbols.length; i++) {
      cy.get(inputForValue).type(inputSymbols[i]);
      cy.get(addToTailButton).should("not.be.disabled");
      cy.get(addToTailButton).click();
      cy.wait(ITERATION_TIME_FOR_ANIMATION_SHORT);
    }

    cy.get(inputForIndex).type(index);
    cy.get(removeElementByIndexButton).should("not.be.disabled");
    cy.get(removeElementByIndexButton).click();

    for (let i = 0; i < index - 1; i++) {
      cy.get(testCircle).should("have.css", "border-color", colors.changing);
      cy.get(circlePointer).should("have.text", inputSymbols[0]);
      cy.get(circlePointer).should("have.css", "border-color", colors.changing);
    }
    cy.get(testCircle).should("have.css", "border-color", colors.default);
    cy.get(circlePointer).should("have.length", 0);

    cy.get(testHead).then((el) => {
      const { length } = Cypress.$(el);

      cy.get(el).eq(0).should("have.text", "head");

      for (let i = 1; i < length; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }
    });

    cy.get(testTail).then((el) => {
      const { length } = Cypress.$(el);

      for (let i = 0; i < length - 1; i++) {
        cy.get(el).eq(i).should("have.text", "");
      }

      cy.get(el)
        .eq(length - 1)
        .should("have.text", "tail");

      cy.get(circleIndex).each((el, index) => {
        cy.get(el).should("contain", index);
      });
    });
  });
});
