/// <reference types="cypress" />

import { viewportSizeForTest } from "src/config/device";

describe("sign in", () => {
  describe("mobile view", () => {
    beforeEach(() => {
      const HOST_URL = Cypress.env("REACT_APP_HOST_URL");

      cy.viewport(viewportSizeForTest.mobile.width, viewportSizeForTest.mobile.height);
      cy.visit(HOST_URL);
    });

    it("When click sign-in-button, Then open sign-in-form modal", () => {
      cy.contains("로그인").click();

      cy.get("#sign-in-form").contains("로그인");
    });
  });

  describe("desktop view", () => {
    beforeEach(() => {
      const HOST_URL = Cypress.env("REACT_APP_HOST_URL");

      cy.viewport(viewportSizeForTest.desktop.width, viewportSizeForTest.desktop.height);
      cy.visit(HOST_URL);
    });

    it("When click sign-in-button, Then open sign-in-form modal", () => {
      cy.contains("로그인").click();

      cy.get("#sign-in-form").contains("로그인");
    });
  });
});
