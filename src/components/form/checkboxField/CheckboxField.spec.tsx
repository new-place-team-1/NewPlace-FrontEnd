import { mount } from "@cypress/react";
import { Formik, Form } from "formik";
import { ThemeProvider } from "@mui/material/styles";

import CheckboxField from ".";
import theme from "src/utils/contexts/Theme";

describe("CheckboxField", () => {
  beforeEach(function () {
    this.props = {
      defaultChecked: false,
      color: "secondary",
      name: "agree",
      value: "agree",
      size: "small",
    };

    mount(
      <ThemeProvider theme={theme}>
        <Formik initialValues={{ agree: false }} onSubmit={cy.stub().as("onSubmit")}>
          <Form>
            <CheckboxField {...this.props} />
          </Form>
        </Formik>
      </ThemeProvider>,
    );
  });

  it("Given props, Then render MUI-Field with props", function () {
    cy.get(".checkbox-field input").as("checkbox").should("not.have.attr", "checked", false);
    cy.get("@checkbox").click().should("not.have.attr", "checked", true);
    cy.get("@checkbox").type("{enter}");
    cy.get("@onSubmit").should("have.been.calledOnce");
  });
});
