import { mount } from "@cypress/react";
import { ThemeProvider } from "@mui/material/styles";

import BottomMenu from ".";
import theme from "src/utils/contexts/Theme";

describe("Header", () => {
  beforeEach(function () {
    this.props = {
      handleSignUpFormOpen: cy.stub().as("handleSignUpFormOpen"),
    };

    mount(
      <ThemeProvider theme={theme}>
        <BottomMenu {...this.props} />
      </ThemeProvider>,
    );
  });

  it("Given Render sign-up menu, When click it, Then call handleSignUpFormOpen", () => {
    cy.contains("회원가입").click();
    cy.get("@handleSignUpFormOpen").should("have.been.calledOnce");
  });
});
