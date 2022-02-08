import { Formik, Form } from "formik";

import SelectField from ".";
import setUp from "src/utils/test/setUp";

describe("SelectField", () => {
  const defaultProps = {
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

  beforeEach(() => {
    function TestComponent() {
      return (
        <Formik initialValues={{ character: "" }} onSubmit={cy.stub().as("onSubmit")}>
          <Form>
            <SelectField {...defaultProps} />
          </Form>
        </Formik>
      );
    }

    setUp(TestComponent);
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
