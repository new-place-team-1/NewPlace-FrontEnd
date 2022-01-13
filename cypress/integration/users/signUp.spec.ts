/// <reference types="cypress" />

import { USERS } from "src/config/endpoint";
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

    describe("control checkboxes", () => {
      beforeEach(() => {
        cy.contains("회원가입").click();
      });

      it("Given all not checked, When click two sub checkboxes, Then agree checked", () => {
        cy.contains("회원 가입 및 운영 약관 동의 (필수)").click();
        cy.contains("개인정보 처리방침 동의 (필수)").click();

        cy.get("#sign-up-form input[name='agree']").should("be.checked");
      });
      it("Given all checked, When click any sub checkboxes, Then agree not checked", () => {
        cy.contains("회원 가입 및 운영 약관 동의 (필수)").click();
        cy.contains("개인정보 처리방침 동의 (필수)").click();

        cy.contains("개인정보 처리방침 동의 (필수)").click();

        cy.get("#sign-up-form input[name='agree']").should("not.be.checked");
      });

      it("Given agree checkbox not checked, When click agree checkbox field, Then all sub checkboxes checked", () => {
        cy.get("#sign-up-form input[name='agree']").click();

        cy.get("input[type='checkbox']").each($checkbox => {
          expect($checkbox).be.checked;
        });
      });

      it("Given agree checkbox checked, When click agree checkbox field, Then all sub checkboxes not checked", () => {
        cy.get("#sign-up-form input[name='agree']").click();

        cy.get("#sign-up-form input[name='agree']").click();

        cy.get("input[type='checkbox']").each($checkbox => {
          expect($checkbox).not.be.checked;
        });
      });
    });

    describe("validation", () => {
      beforeEach(() => {
        cy.intercept("post", USERS.INDEX, req => {
          req.reply({
            statusCode: 201,
            body: {
              data: "OK",
            },
          });
        }).as("api");

        cy.contains("회원가입").click();
      });

      it("Given empty fields, When click submit button, Then show validation error message and not call submit", () => {
        cy.contains("계속").click();

        cy.contains(errorMessage.email.required);
        cy.contains(errorMessage.password.required);
        cy.contains(errorMessage.passwordConfirm.required);
        cy.contains(errorMessage.name.required);
        cy.contains(errorMessage.phoneNumber.required);
        cy.contains(errorMessage.agree.required);
        cy.get("@api").should("eq", null);
      });

      it("When type invalid values and click submit button, Then show validation error message and not call submit", () => {
        const invalidTypedValue = {
          email: "abcdef",
          password: "123456",
          passwordConfirm: "1234567",
          name: "가나다라마바",
          phoneNumber: "010123456789",
        };

        cy.contains("이메일").closest(".field").find("input").type(invalidTypedValue.email);
        cy.contains("비밀번호").closest(".field").find("input").type(invalidTypedValue.password);
        cy.contains("비밀번호 확인").closest(".field").find("input").type(invalidTypedValue.passwordConfirm);
        cy.contains("이름").closest(".field").find("input").type(invalidTypedValue.name);
        cy.contains("휴대폰 번호").closest(".field").find("input").type(invalidTypedValue.phoneNumber);
        cy.contains("계속").click();

        cy.contains(errorMessage.email.match);
        cy.contains(errorMessage.password.match);
        cy.contains(errorMessage.passwordConfirm.match);
        cy.contains(errorMessage.name.match);
        cy.contains(errorMessage.phoneNumber.match);
        cy.get("@api").should("eq", null);
      });
    });

    describe("submit", () => {
      it("When type proper values and click submit button, Then not show validation error message and submit successfully and change modal with LogInForm Modal", () => {
        const validTypedValue = {
          email: "abcd@gmail.com",
          password: "1234abcd!",
          passwordConfirm: "1234abcd!",
          name: "가나다라마",
          phoneNumber: "01012345678",
        };

        cy.intercept("post", USERS.INDEX, req => {
          req.reply({
            statusCode: 201,
            body: {
              data: "OK",
            },
            delay: 1000,
          });
        }).as("api");

        cy.contains("회원가입").click();
        cy.contains("이메일").closest(".field").find("input").type(validTypedValue.email);
        cy.contains("비밀번호").closest(".field").find("input").type(validTypedValue.password);
        cy.contains("비밀번호 확인").closest(".field").find("input").type(validTypedValue.passwordConfirm);
        cy.contains("이름").closest(".field").find("input").type(validTypedValue.name);
        cy.contains("휴대폰 번호").closest(".field").find("input").type(validTypedValue.phoneNumber);
        cy.contains("전체 약관 동의").click();
        cy.contains("계속").click();

        cy.get(".error").should("have.length", 0);
        cy.wait("@api").then(interception => {
          const {
            request: { body },
          } = interception;

          expect(body).to.deep.equal(validTypedValue);
        });
        cy.get("#sign-in-form").should("exist");
        cy.get("#sign-up-form").should("not.exist");
      });
    });
  });
});
