import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";

import Layout from ".";
import { viewportSizeForTest } from "src/config/device";

describe("Layout", () => {
  it("Render header, footer", () => {
    cy.viewport(viewportSizeForTest.mobile.width, viewportSizeForTest.mobile.height);

    mount(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>,
    );

    cy.get("header").should("exist");
    cy.get("footer").should("exist");
  });

  it("When viewport width <= 992, Then render BottomMenu", () => {
    cy.viewport(viewportSizeForTest.mobile.width, viewportSizeForTest.mobile.height);

    mount(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>,
    );

    cy.get("#bottom-menu").should("exist");
  });

  it("When viewport width > 992, Then not render BottomMenu", () => {
    cy.viewport(viewportSizeForTest.desktop.width, viewportSizeForTest.desktop.height);

    mount(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>,
    );

    cy.get("#bottom-menu").should("not.exist");
  });
});
