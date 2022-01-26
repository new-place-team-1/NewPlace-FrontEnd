import { mount } from "@cypress/react";
import { Formik, Form } from "formik";
import { ThemeProvider } from "@mui/material/styles";

import Field from ".";
import theme from "src/utils/contexts/Theme";

describe("Field", () => {
  beforeEach(function () {
    this.props = {
      label: "nickname",
      color: "secondary",
      variant: "standard",
      type: "text",
      name: "nickname",
      placeholder: "type nickname...",
    };
    mount(
      <ThemeProvider theme={theme}>
        <Formik initialValues={{ nickname: "" }} onSubmit={cy.stub()}>
          <Form>
            <Field {...this.props} />
          </Form>
        </Formik>
      </ThemeProvider>,
    );
  });

  it("Given props, Then render MUI-Field with props", function () {
    cy.get("input[name='nickname']")
      .should("have.attr", "placeholder", this.props.placeholder)
      .and("have.attr", "type", "text");
  });
});
