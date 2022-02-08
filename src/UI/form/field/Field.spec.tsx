import { Formik, Form } from "formik";

import Field from ".";
import setUp from "src/utils/test/setUp";

describe("Field", () => {
  const defaultProps = {
    label: "nickname",
    color: "secondary",
    variant: "standard",
    type: "text",
    name: "nickname",
    placeholder: "type nickname...",
  };

  beforeEach(() => {
    function TestComponent() {
      return (
        <Formik initialValues={{ nickname: "" }} onSubmit={cy.stub()}>
          <Form>
            <Field {...defaultProps} />
          </Form>
        </Formik>
      );
    }

    setUp(TestComponent);
  });

  it("Given props, Then render MUI-Field with props", () => {
    cy.get("input[name='nickname']")
      .should("have.attr", "placeholder", defaultProps.placeholder)
      .and("have.attr", "type", "text");
  });
});
