/// <reference types="cypress" />

describe.only("navigate policy", () => {
  const HOST_URL = Cypress.env("REACT_APP_HOST_URL");

  beforeEach(() => {
    cy.visit(HOST_URL);
  });

  it("When click 이용약관 on footer, Then move to 이용약관", () => {
    cy.get("footer").contains("이용약관").click();

    cy.url().should("eq", `${HOST_URL}/policy/contract`);
  });

  it("When click 개인정보 처리방침 on footer, Then move to 개인정보 처리방침", () => {
    cy.get("footer").contains("개인정보 처리방침").click();

    cy.url().should("eq", `${HOST_URL}/policy/privacy`);
  });

  it("When click 취소 및 환불 정책 on footer, Then move to 취소 및 환불 정책", () => {
    cy.get("footer").contains("취소 및 환불 정책").click();

    cy.url().should("eq", `${HOST_URL}/policy/cancellation`);
  });
});

export {};
