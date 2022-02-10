/// <reference types="cypress" />

import palette from "src/config/styles/palette";

describe.only("navigate policy", () => {
  const HOST_URL = Cypress.env("REACT_APP_HOST_URL");
  const contractPath = "/policy/contract";
  const privacyPath = "/policy/privacy";
  const cancellationPath = "/policy/cancellation";

  describe("footer", () => {
    beforeEach(() => {
      cy.visit(HOST_URL);
    });

    it(`When click 이용약관 on footer, Then move to 이용약관`, () => {
      cy.get("footer").contains("이용약관").click();

      cy.url().should("eq", `${HOST_URL}${contractPath}`);
    });

    it("When click 개인정보 처리방침 on footer, Then move to 개인정보 처리방침", () => {
      cy.get("footer").contains("개인정보 처리방침").click();

      cy.url().should("eq", `${HOST_URL}${privacyPath}`);
    });

    it("When click 취소 및 환불 정책 on footer, Then move to 취소 및 환불 정책", () => {
      cy.get("footer").contains("취소 및 환불 정책").click();

      cy.url().should("eq", `${HOST_URL}${cancellationPath}`);
    });
  });

  describe("policy", () => {
    it("When visit /policy/contract, Then render nav and 이용약관", () => {
      cy.visit(`${HOST_URL}${contractPath}`);

      cy.get("#policy-nav").contains("이용약관").should("have.css", "color", `${palette.primary.main}`);
      cy.get("#policy-nav").contains("개인정보 처리방침").should("exist");
      cy.get("#policy-nav").contains("취소 및 환불 정책").should("exist");
    });

    it("When visit /policy/privacy, Then render nav and 개인정보 처리방침", () => {
      cy.visit(`${HOST_URL}${privacyPath}`);

      cy.get("#policy-nav").contains("이용약관").should("exist");
      cy.get("#policy-nav").contains("개인정보 처리방침").should("have.css", "color", `${palette.primary.main}`);
      cy.get("#policy-nav").contains("취소 및 환불 정책").should("exist");
    });

    it("When visit /policy/cancellation, Then render nav and 취소 및 환불 정책", () => {
      cy.visit(`${HOST_URL}${cancellationPath}`);

      cy.get("#policy-nav").contains("이용약관").should("exist");
      cy.get("#policy-nav").contains("개인정보 처리방침").should("exist");
      cy.get("#policy-nav").contains("취소 및 환불 정책").should("have.css", "color", `${palette.primary.main}`);
    });

    it(`When click 이용약관 on nav in policy template, Then move to 이용약관`, () => {
      cy.visit(`${HOST_URL}${privacyPath}`);

      cy.get("#policy-nav").contains("이용약관").as("activeTab").click();

      cy.url().should("eq", `${HOST_URL}${contractPath}`);
      cy.get("@activeTab").should("have.css", "color", `${palette.primary.main}`);
      cy.get("#policy-contract").should("exist");
    });

    it("When click 개인정보 처리방침 on nav in policy template, Then move to 개인정보 처리방침", () => {
      cy.visit(`${HOST_URL}${contractPath}`);

      cy.get("#policy-nav").contains("개인정보 처리방침").as("activeTab").click();

      cy.url().should("eq", `${HOST_URL}${privacyPath}`);
      cy.get("@activeTab").should("have.css", "color", `${palette.primary.main}`);
      cy.get("#policy-privacy").should("exist");
    });

    it("When click 취소 및 환불 정책 on nav in policy template, Then move to 취소 및 환불 정책", () => {
      cy.visit(`${HOST_URL}${contractPath}`);

      cy.get("#policy-nav").contains("취소 및 환불 정책").as("activeTab").click();

      cy.url().should("eq", `${HOST_URL}${cancellationPath}`);
      cy.get("@activeTab").should("have.css", "color", `${palette.primary.main}`);
      cy.get("#policy-cancellation").should("exist");
    });
  });
});
