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
});

export {};
