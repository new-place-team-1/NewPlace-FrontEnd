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
        cy.intercept("post", USERS.SESSION).as("api");

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

    describe("submit success", () => {
      beforeEach(() => {
        cy.intercept("post", USERS.SESSION, req => {
          req.reply({
            // TODO: stub token 인증 로직 정해지면
            // headers: {
            //   "Set-Cookie": "token=123ABC;",
            // },
            statusCode: 201,
            body: {
              data: "OK",
            },
          });
        }).as("api");

        cy.contains("로그인").click();
      });

      it("When type proper values and click submit button, Then clear form and submit successfully", () => {
        const validTypedValue = {
          email: "abcd@gmail.com",
          password: "1234abcd!",
        };

        cy.contains("이메일").closest(".field").find("input").type(validTypedValue.email);
        cy.contains("비밀번호").closest(".field").find("input").type(validTypedValue.password);
        cy.contains("계속").click();

        cy.get(".error").should("have.length", 0);
        cy.wait("@api").then(interception => {
          const {
            request: { body },
          } = interception;

          expect(body).to.deep.equal(validTypedValue);
        });
        cy.get("#sign-in-form").should("not.exist");
        // TODO: stub token, and rerendering after submit success
        // cy.getCookie('token').should('have.property', 'value', '123ABC')
        // cy.contains("위시리스트").should("exist");
      });
    });
  });
});
