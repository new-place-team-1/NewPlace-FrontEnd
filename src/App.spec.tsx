import { mount } from "@cypress/react";

import App from "./App";

describe("App", () => {
  it("When viewport width <= 992, Then render MobileHeader", () => {
    cy.viewport(320, 768);

    mount(<App />);

    cy.get("#bottom-menu");
  });

  it("When viewport width > 992, Then render DesktopHeader", () => {
    cy.viewport(1024, 768);

    mount(<App />);

    cy.get("#bottom-menu").should("not.exist");
  });
});
