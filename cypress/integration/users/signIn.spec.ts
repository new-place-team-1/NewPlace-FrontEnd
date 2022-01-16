/// <reference types="cypress" />

import { USERS } from "src/config/endpoint";
import { viewportSizeForTest } from "src/config/device";
import { alertMessage, validationMessage } from "src/config/message";

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
        cy.intercept("post", USERS.LOGIN).as("api");

        cy.contains("로그인").click();
      });

      it("Given empty fields, When click submit button, Then show validation error message and not call submit", () => {
        cy.contains("계속").click();

        cy.contains(validationMessage.email.required);
        cy.contains(validationMessage.password.required);
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

        cy.contains(validationMessage.email.match);
        cy.contains(validationMessage.password.match);
        cy.get("@api").should("eq", null);
      });
    });

    describe("submit", () => {
      const typedValue = {
        email: "abcd@gmail.com",
        password: "1234abcd!",
      };

      it("When type proper values and click submit button, Then clear form and submit successfully", () => {
        cy.intercept("post", USERS.LOGIN, req => {
          req.reply({
            // TODO: stub token 인증 로직 정해지면
            // headers: {
            //   "Set-Cookie": "token=123ABC;",
            // },
            statusCode: 201,
            body: {
              data: "OK",
            },
            delay: 1000,
          });
        }).as("api");

        cy.contains("로그인").click();

        cy.contains("이메일").closest(".field").find("input").type(typedValue.email);
        cy.contains("비밀번호").closest(".field").find("input").type(typedValue.password);
        cy.contains("계속").click();

        cy.get(".error").should("have.length", 0);
        cy.wait("@api").then(interception => {
          const {
            request: { body },
          } = interception;

          expect(body).to.deep.equal(typedValue);
        });
        cy.get("#sign-in-form").should("not.exist");
        // TODO: stub token, and rerendering after submit success
        // cy.getCookie('token').should('have.property', 'value', '123ABC')
        // cy.contains("위시리스트").should("exist");
      });

      it("When type wrong email or password and click submit button, Then show error message and sign in failed", () => {
        cy.intercept("post", USERS.LOGIN, req => {
          req.reply({
            // TODO: 응답 명세 상의
            statusCode: 400,
            delay: 1000,
          });
        }).as("api");

        cy.contains("로그인").click();
        cy.contains("이메일").closest(".field").find("input").type(typedValue.email);
        cy.contains("비밀번호").closest(".field").find("input").type(typedValue.password);
        cy.contains("계속").click();

        cy.contains(alertMessage.signIn.error.title);
        cy.get(".spinner").should("not.exist");
        // TODO: token 정하기
        // cy.getCookie("token").should("not.exist");
      });
    });
  });
});
