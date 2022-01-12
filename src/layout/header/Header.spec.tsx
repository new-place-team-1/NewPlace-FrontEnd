import { mount } from "@cypress/react";
import { ThemeProvider } from "@mui/material/styles";

import Header from ".";
import { viewportSizeForTest } from "src/config/device";
import theme from "src/utils/contexts/Theme";

describe("Header", () => {
  it("When viewport width <= 992, Then render MobileHeader", () => {
    cy.viewport(viewportSizeForTest.mobile.width, viewportSizeForTest.mobile.height);

    mount(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>,
    );

    cy.get("#mobile-header");
  });

  it("When viewport width > 992, Then render DesktopHeader", () => {
    cy.viewport(viewportSizeForTest.desktop.width, viewportSizeForTest.desktop.height);

    mount(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>,
    );

    cy.get("#desktop-header");
  });
});
