import {
  baseURL,
  testStringCard,
  testFibonacciCard,
  testSortingCard,
  testStackCard,
  testQueueCard,
  testListCard,
} from "../../src/constants/constants";

describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit(baseURL);
  });

  it("should open algorithms choice by default", function () {
    cy.contains("Вдохновлено школами");
  });

  it("should open string page after button click", function () {
    cy.get(testStringCard).click();
    cy.contains("Строка");
  });

  it("should open fibonacci page after button click", function () {
    cy.get(testFibonacciCard).click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("should open sorting page after button click", function () {
    cy.get(testSortingCard).click();
    cy.contains("Сортировка массива");
  });

  it("should open stack page after button click", function () {
    cy.get(testStackCard).click();
    cy.contains("Стек");
  });

  it("should open queue page after button click", function () {
    cy.get(testQueueCard).click();
    cy.contains("Очередь");
  });

  it("should open list page after button click", function () {
    cy.get(testListCard).click();
    cy.contains("Связный список");
  });
});
