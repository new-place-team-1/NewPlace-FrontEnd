/// <reference types="cypress" />

import { USERS } from "src/config/endpoint";
import { viewportSizeForTest } from "src/config/device";
import { errorMessage } from "src/config/message";

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

    describe("validation", () => {
      beforeEach(() => {
        cy.intercept("post", USERS.SESSION, req => {
          req.reply({
            statusCode: 201,
            body: {
              data: "OK",
            },
          });
        }).as("api");

        cy.contains("로그인").click();
      });

      it("Given empty fields, When click submit button, Then show validation error message and not call submit", () => {
        cy.contains("계속").click();

        cy.contains(errorMessage.email.required);
        cy.contains(errorMessage.password.required);
        cy.get("@api").should("eq", null);
      });

      it("When type invalid values and click submit button, Then show validation error message and not call submit", () => {
        const invalidTypedValue = {
          email: "abcdef",
          password: "123456",
        };

        cy.contains("이메일").closest(".field").find("input").type(invalidTypedValue.email);
        cy.contains("비밀번호").closest(".field").find("input").type(invalidTypedValue.password);
        cy.contains("계속").click();

        cy.contains(errorMessage.email.match);
        cy.contains(errorMessage.password.match);
        cy.get("@api").should("eq", null);
      });
    });
  });
});
