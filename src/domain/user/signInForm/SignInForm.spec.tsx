import { mount } from "@cypress/react";
import { ThemeProvider } from "@mui/material/styles";

import SignInForm from ".";
import theme from "src/utils/contexts/Theme";

describe("SignInForm", () => {
  beforeEach(function () {
    this.props = {
      open: true,
      onClose: cy.stub().as("onClose"),
    };
    mount(
      <ThemeProvider theme={theme}>
        <SignInForm {...this.props} />
      </ThemeProvider>,
    );
  });

  it("Given open=false, Then not render SignInForm", function () {
    this.props.open = false;
    mount(
      <ThemeProvider theme={theme}>
        <SignInForm {...this.props} />
      </ThemeProvider>,
    );
    cy.get("#sign-in-form").should("not.exist");
  });

  it("Given open=true, Then render SignInForm", function () {
    cy.get("#sign-in-form");
  });

  it("When click outside, Then call onClose", function () {
    cy.get("#sign-in-form").click(1, 1);
    cy.get("@onClose").should("have.been.calledOnce");
  });
});
