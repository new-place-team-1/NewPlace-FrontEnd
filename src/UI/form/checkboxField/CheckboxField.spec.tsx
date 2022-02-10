import { Formik, Form } from "formik";

import CheckboxField from ".";
import setUp from "src/utils/test/setUp";

describe("CheckboxField", () => {
  const defaultProps = {
    defaultChecked: false,
    color: "secondary",
    name: "agree",
    label: "agree",
    size: "small",
  };

  beforeEach(() => {
    function TestComponent() {
      return (
        <Formik initialValues={{ agree: false }} onSubmit={cy.stub().as("onSubmit")}>
          <Form>
            <CheckboxField {...defaultProps} />
          </Form>
        </Formik>
      );
    }

    setUp(TestComponent);
  });

  it("Given props, Then render MUI-Field with props", () => {
    cy.get(".checkbox-field input").should("not.have.attr", "checked", false);
  });

  it("When click and submit, Then call onSubmit with proper arguments", () => {
    cy.get(".checkbox-field input").as("checkbox").type("{enter}");

    cy.get("@checkbox").should("not.have.attr", "checked", true);
    cy.get("@onSubmit").should("have.been.calledOnceWith", { agree: true });
  });
});
