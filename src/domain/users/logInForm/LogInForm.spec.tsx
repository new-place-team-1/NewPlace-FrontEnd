import LogInForm, { IProps } from ".";
import setUp from "src/utils/test/setUp";

describe("LogInForm", () => {
  const defaultProps: IProps = {
    size: "small",
    open: true,
    handleClose: () => {},
  };

  beforeEach(() => {
    setUp(LogInForm, defaultProps);
  });

  it("Given open=false, Then close Modal", () => {
    setUp(LogInForm, { ...defaultProps, open: false });

    cy.get("#sign-in-form").should("not.exist");
  });

  it("Given open=true, Then open Modal", () => {
    cy.get("#sign-in-form").should("exist");
    cy.contains("로그인").should("exist");
    cy.get("input[name='email']").should("exist");
    cy.get("input[name='password']").should("exist");
    cy.get("button").contains("계속").should("exist");
  });

  it("When click outside, Then call handleClose", () => {
    setUp(LogInForm, { ...defaultProps, handleClose: cy.stub().as("handleClose") });

    cy.get("#sign-in-form").click(1, 1);

    cy.get("@handleClose").should("have.been.calledOnce");
  });
});
