import SignUpForm, { IProps } from ".";
import setUp from "src/utils/test/setUp";

describe("SignUpForm", () => {
  const defaultProps: IProps = {
    size: "small",
    open: true,
    handleClose: () => {},
  };

  beforeEach(() => {
    cy.viewport(400, 700);
    setUp(SignUpForm, defaultProps);
  });

  it("Given open=false, Then close Modal", () => {
    setUp(SignUpForm, { ...defaultProps, open: false });

    cy.get("#sign-up-form").should("not.exist");
  });

  it("Given open=true, Then open Modal", () => {
    cy.get("#sign-up-form form").should("exist");
    cy.contains("회원가입").should("exist");
    cy.get("input[name='email']").should("exist");
    cy.get("input[name='password']").should("exist");
    cy.get("input[name='passwordVerified']").should("exist");
    cy.get("input[name='name']").should("exist");
    cy.get("input[name='phoneNumber']").should("exist");
    cy.get("input[name='bankId']").should("exist");
    cy.get("input[name='accountNumber']").should("exist");
    cy.get("input[name='agree']").should("exist");
    cy.get("input[type='checkbox']").should("have.length", 3);
    cy.get("button").contains("계속").should("exist");
  });

  it("When click outside, Then call handleClose", () => {
    setUp(SignUpForm, { ...defaultProps, handleClose: cy.stub().as("handleClose") });

    cy.get("#sign-up-form").click(1, 1);

    cy.get("@handleClose").should("have.been.calledOnce");
  });

  it("when click icon of contract, Then move to contract including arrow-back", () => {
    cy.get("[data-testid='DescriptionIcon']").then($icons => {
      const contractIcon = $icons[0];

      cy.wrap(contractIcon).click();

      cy.get("#policy-contract").should("exist");
      cy.get("[data-testid='ArrowBackIcon']").should("exist");
    });
  });

  it("when click icon of privacy, Then move to privacy including arrow-back", () => {
    cy.get("[data-testid='DescriptionIcon']").then($icons => {
      const contractIcon = $icons[1];

      cy.wrap(contractIcon).click();

      cy.get("#policy-privacy").should("exist");
      cy.get("[data-testid='ArrowBackIcon']").should("exist");
    });
  });

  it("Given policy content, When click back arrow icon, Then move to index", function () {
    cy.get("[data-testid='DescriptionIcon']").then($icons => {
      const contractIcon = $icons[0];

      cy.wrap(contractIcon).click();
    });

    cy.get("[data-testid='ArrowBackIcon']").then($icons => {
      cy.wrap($icons).click();

      cy.get("form").should("exist");
    });
  });
});
