import { mount } from "@cypress/react";

import Layout from ".";
import { viewportSizeForTest } from "src/config/device";

describe("Layout", () => {
  it("When viewport width <= 992, Then render BottomMenu", () => {
    cy.viewport(viewportSizeForTest.mobile.width, viewportSizeForTest.mobile.height);

    mount(<Layout />);

    cy.get("#bottom-menu");
  });

  it("When viewport width > 992, Then not render BottomMenu", () => {
    cy.viewport(viewportSizeForTest.desktop.width, viewportSizeForTest.desktop.height);

    mount(<Layout />);

    cy.get("#bottom-menu").should("not.exist");
  });
});
