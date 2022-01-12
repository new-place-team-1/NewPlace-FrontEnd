import { mount } from "@cypress/react";

import App from "./App";
import { viewportSizeForTest } from "src/config/device";

describe("App", () => {
  it("When viewport width <= 992, Then render MobileHeader", () => {
    cy.viewport(viewportSizeForTest.mobile.width, viewportSizeForTest.mobile.height);

    mount(<App />);

    cy.get("#bottom-menu");
  });

  it("When viewport width > 992, Then render DesktopHeader", () => {
    cy.viewport(viewportSizeForTest.desktop.width, viewportSizeForTest.desktop.height);

    mount(<App />);

    cy.get("#bottom-menu").should("not.exist");
  });
});
