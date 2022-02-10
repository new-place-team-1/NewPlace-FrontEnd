import BottomMenu, { IProps } from ".";
import setUp from "src/utils/test/setUp";

describe("Header", () => {
  beforeEach(() => {
    const defaultProps: IProps = {
      handleLogInFormOpen: cy.stub(),
      handleSignUpFormOpen: cy.stub().as("handleSignUpFormOpen"),
    };
    setUp(BottomMenu, defaultProps);
  });

  it("Given sign-up menu button, When click it, Then call handleSignUpFormOpen", () => {
    cy.contains("회원가입").click();

    cy.get("@handleSignUpFormOpen").should("have.been.calledOnce");
  });
});
