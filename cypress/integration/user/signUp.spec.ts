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
      cy.contains(errorMessage.name.required);
      cy.contains(errorMessage.phoneNumber.required);
      cy.contains(errorMessage.agree.required);
    });

    it("Given all not checked, When click two sub checkboxes, Then agree checked", () => {
      cy.contains("회원가입").click();
      cy.contains("회원 가입 및 운영 약관 동의 (필수)").click();
      cy.contains("개인정보 처리방침 동의 (필수)").click();
      cy.get("#sign-up-form input[name='agree']").should("be.checked");
    });
    it("Given all checked, When click any sub checkboxes, Then agree not checked", () => {
      cy.contains("회원가입").click();
      cy.contains("회원 가입 및 운영 약관 동의 (필수)").click();
      cy.contains("개인정보 처리방침 동의 (필수)").click();

      cy.contains("개인정보 처리방침 동의 (필수)").click();
      cy.get("#sign-up-form input[name='agree']").should("not.be.checked");
    });

    it("Given agree checkbox not checked, When click agree checkbox field, Then all sub checkboxes checked", () => {
      cy.contains("회원가입").click();
      cy.get("#sign-up-form input[name='agree']").click();

      cy.get("input[type='checkbox']").each($checkbox => {
        expect($checkbox).be.checked;
      });
    });

    it("Given agree checkbox checked, When click agree checkbox field, Then all sub checkboxes not checked", () => {
      cy.contains("회원가입").click();
      cy.get("#sign-up-form input[name='agree']").click();

      cy.get("#sign-up-form input[name='agree']").click();
      cy.get("input[type='checkbox']").each($checkbox => {
        expect($checkbox).not.be.checked;
      });
    });
  });
});
