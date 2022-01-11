import { mount } from "@cypress/react";
import { ThemeProvider } from "@mui/material/styles";

import Header from ".";
import theme from "src/utils/contexts/Theme";

describe("Header", () => {
  it("When viewport width <= 992, Then render MobileHeader", () => {
    cy.viewport(320, 768);

    mount(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>,
    );

    cy.get("#mobile-header");
  });

  it("When viewport width > 992, Then render DesktopHeader", () => {
    cy.viewport(1024, 768);

    mount(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>,
    );

    cy.get("#desktop-header");
  });
});
