import { mount } from "@cypress/react";
import { Formik, Form } from "formik";
import { ThemeProvider } from "@mui/material/styles";

import SelectField from ".";
import theme from "src/utils/contexts/Theme";

describe("SelectField", () => {
  beforeEach(function () {
    this.props = {
      color: "secondary",
      name: "select",
      label: "select",
      labelId: "select-label",
      options: [
        {
          id: 0,
          value: "",
          label: "-",
        },
        {
          id: 1,
          value: "a",
          label: "A",
        },
        {
          id: 2,
          value: "b",
          label: "B",
        },
        {
          id: 3,
          value: "c",
          label: "C",
        },
      ],
    };

    mount(
      <ThemeProvider theme={theme}>
        <Formik initialValues={{ agree: false }} onSubmit={cy.stub().as("onSubmit")}>
          <Form>
            <SelectField {...this.props} />
          </Form>
        </Formik>
      </ThemeProvider>,
    );
  });

  it("Given props, Then render MUI-Field with props with empty value", () => {
    cy.get(".select-field input").should("have.attr", "value", "");
  });

  it("When select any option, Then change value", () => {
    cy.get(".select-field").click();
    cy.contains("A").click();

    cy.get(".select-field input").should("have.attr", "value", "a");
  });
});
