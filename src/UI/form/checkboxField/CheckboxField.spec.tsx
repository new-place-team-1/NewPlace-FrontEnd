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
      label: "agree",
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

  it("Given props, Then render MUI-Field with props", () => {
    cy.get(".checkbox-field input").should("not.have.attr", "checked", false);
  });

  it("When click and submit, Then call onSubmit with proper arguments", () => {
    cy.get(".checkbox-field input").type("{enter}").should("not.have.attr", "checked", true);
    cy.get("@onSubmit").should("have.been.calledOnceWith", { agree: true });
  });
});
