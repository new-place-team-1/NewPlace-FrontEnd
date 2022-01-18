import { mount } from "@cypress/react";
import { ThemeProvider } from "@mui/material/styles";

import SignUpForm from ".";
import theme from "src/utils/contexts/Theme";

describe("SignUpForm", () => {
  beforeEach(function () {
    cy.viewport(400, 700);
    this.props = {
      open: true,
      handleClose: cy.stub().as("handleClose"),
      size: "small",
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
    cy.get("#sign-up-form form").should("exist");

    cy.contains("회원가입");
    cy.get("input[name='email']");
    cy.get("input[name='password']");
    cy.get("input[name='passwordVerified']");
    cy.get("input[name='name']");
    cy.get("input[name='phoneNumber']");
    cy.get("input[name='bankId']");
    cy.get("input[name='accountNumber']");
    cy.get("input[name='agree']");
    cy.get("input[type='checkbox']").should("have.length", 3);
    cy.get("button").contains("계속");
  });

  it("When click outside, Then call handleClose", function () {
    cy.get("#sign-up-form").click(1, 1);
    cy.get("@handleClose").should("have.been.calledOnce");
  });
});
