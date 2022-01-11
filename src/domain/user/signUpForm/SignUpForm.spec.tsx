import { mount } from "@cypress/react";
import { ThemeProvider } from "@mui/material/styles";

import SignUpForm from ".";
import theme from "src/utils/contexts/Theme";

describe("SignUpForm", () => {
  beforeEach(function () {
    this.props = {
      open: true,
      onClose: cy.stub().as("onClose"),
    };
    mount(
      <ThemeProvider theme={theme}>
        <SignUpForm {...this.props} />
      </ThemeProvider>,
    );
  });

  it("Given open=false, Then not render SignUpForm", function () {
    this.props.open = false;
    mount(
      <ThemeProvider theme={theme}>
        <SignUpForm {...this.props} />
      </ThemeProvider>,
    );
    cy.get("#sign-up-form").should("not.exist");
  });

  it("Given open=true, Then render SignUpForm", function () {
    cy.get("#sign-up-form");
  });

  it("When click outside, Then call onClose", function () {
    cy.get("#sign-up-form").click(1, 1);
    cy.get("@onClose").should("have.been.calledOnce");
  });
});
