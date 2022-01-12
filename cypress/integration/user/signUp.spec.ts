/// <reference types="cypress" />

import { USER } from "src/config/endpoint";
import { viewportSizeForTest } from "src/config/device";
import { errorMessage } from "src/config/message";

describe("sign up", () => {
  describe("mobile view", () => {
    beforeEach(() => {
      const HOST_URL = Cypress.env("REACT_APP_HOST_URL");

      cy.viewport(viewportSizeForTest.mobile.width, viewportSizeForTest.mobile.height);
      cy.visit(HOST_URL);
    });

    it("When click sign-up-button, Then open sign-up-form modal", () => {
      cy.contains("회원가입").click();
      cy.get("#sign-up-form").contains("회원가입");
    });
  });

  describe("desktop view", () => {
    beforeEach(() => {
      const HOST_URL = Cypress.env("REACT_APP_HOST_URL");

      cy.viewport(viewportSizeForTest.desktop.width, viewportSizeForTest.desktop.height);
      cy.visit(HOST_URL);
    });

    it("When click sign-up-button, Then open sign-up-form modal", () => {
      cy.contains("회원가입").click();
      cy.get("#sign-up-form").contains("회원가입");
    });

    it("Given open modal and empty fields, When click submit button, Then show validation error message and not call submit", () => {
      cy.contains("회원가입").click();
      cy.contains("계속").click();
      cy.contains(errorMessage.email.required);
      cy.contains(errorMessage.password.required);
      cy.contains(errorMessage.passwordConfirm.required);
      cy.contains(errorMessage.userName.required);
      cy.contains(errorMessage.phoneNumber.required);
      cy.contains(errorMessage.agree.required);
    });
  });
});
