/// <reference types="cypress" />

import { USERS } from "src/config/endpoint";
import { viewportSizeForTest } from "src/config/device";
import { validationMessage } from "src/config/message";

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
        cy.intercept("post", USERS.INDEX).as("api");

        cy.contains("회원가입").click();
      });

      it("Given empty fields, When click submit button, Then show validation error message and not call submit", () => {
        cy.contains("계속").click();

        cy.contains(validationMessage.email.required);
        cy.contains(validationMessage.password.required);
        cy.contains(validationMessage.passwordVerified.required);
        cy.contains(validationMessage.name.required);
        cy.contains(validationMessage.phoneNumber.required);
        cy.contains(validationMessage.agree.required);
        cy.get("@api").should("eq", null);
      });

      it("When type invalid values and click submit button, Then show validation error message and not call submit", () => {
        const invalidTypedValue = {
          email: "abcdef",
          password: "123456",
          passwordVerified: "1234567",
          name: "가나다라마바",
          phoneNumber: "010123456789",
        };

        cy.contains("이메일").closest(".field").find("input").type(invalidTypedValue.email);
        cy.contains("비밀번호").closest(".field").find("input").type(invalidTypedValue.password);
        cy.contains("비밀번호 확인").closest(".field").find("input").type(invalidTypedValue.passwordVerified);
        cy.contains("이름").closest(".field").find("input").type(invalidTypedValue.name);
        cy.contains("휴대폰 번호").closest(".field").find("input").type(invalidTypedValue.phoneNumber);
        cy.contains("계속").click();

        cy.contains(validationMessage.email.match);
        cy.contains(validationMessage.password.match);
        cy.contains(validationMessage.passwordVerified.match);
        cy.contains(validationMessage.name.match);
        cy.contains(validationMessage.phoneNumber.match);
        cy.get("@api").should("eq", null);
      });
    });

    describe("submit", () => {
      it("When type proper values and click submit button, Then not show validation error message and submit successfully and show wait message", () => {
        const validValue = {
          email: "abcd@gmail.com",
          password: "1234abcd!",
          passwordVerified: "1234abcd!",
          name: "가나다라마",
          phoneNumber: "01012345678",
          bankId: "",
          accountNumber: "",
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
        cy.contains("이메일").closest(".field").find("input").type(validValue.email);
        cy.contains("비밀번호").closest(".field").find("input").type(validValue.password);
        cy.contains("비밀번호 확인").closest(".field").find("input").type(validValue.passwordVerified);
        cy.contains("이름").closest(".field").find("input").type(validValue.name);
        cy.contains("휴대폰 번호").closest(".field").find("input").type(validValue.phoneNumber);
        cy.contains("전체 약관 동의").click();
        cy.contains("계속").click();

        cy.get(".error").should("have.length", 0);
        cy.wait("@api").then(interception => {
          const {
            request: { body },
          } = interception;

          expect(body).to.deep.equal(validValue);
        });
        cy.contains("인증 이메일이 발송되었습니다. 이메일 인증을 하면 회원가입이 완료됩니다.").should("exist");
      });

      it("When type proper values including optional field and click submit button, Then submit successfully", () => {
        const validValue = {
          email: "abcd@gmail.com",
          password: "1234abcd!",
          passwordVerified: "1234abcd!",
          name: "가나다라마",
          phoneNumber: "01012345678",
          bankId: "0",
          accountNumber: "1234567",
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
        cy.contains("이메일").closest(".field").find("input").type(validValue.email);
        cy.contains("비밀번호").closest(".field").find("input").type(validValue.password);
        cy.contains("비밀번호 확인").closest(".field").find("input").type(validValue.passwordVerified);
        cy.contains("이름").closest(".field").find("input").type(validValue.name);
        cy.contains("휴대폰 번호").closest(".field").find("input").type(validValue.phoneNumber);
        cy.contains("은행명 (선택 사항)").closest(".select-field").click();
        cy.contains("하나").click();
        cy.contains("계좌 번호").closest(".field").find("input").type(validValue.accountNumber);
        cy.contains("전체 약관 동의").click();
        cy.contains("계속").click();

        cy.get(".error").should("have.length", 0);
        cy.wait("@api").then(interception => {
          const {
            request: { body },
          } = interception;

          expect(body).to.deep.equal(validValue);
        });
        cy.contains("인증 이메일이 발송되었습니다. 이메일 인증을 하면 회원가입이 완료됩니다.").should("exist");
      });
    });
  });
});
