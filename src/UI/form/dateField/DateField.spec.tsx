import { Formik, Form } from "formik";

import DateField, { IProps } from ".";
import { DateRange } from "src/UI/MUI/icons";
import { InputAdornment } from "src/UI/MUI/api";
import setUp from "src/utils/test/setUp";

describe("DateField", () => {
  const defaultProps: IProps = {
    label: "start date",
    inputFormat: "YYYY - MM - DD",
    textFieldProps: {
      color: "secondary",
      variant: "standard",
      name: "startDate",
    },
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <DateRange />
        </InputAdornment>
      ),
    },
  };

  beforeEach(() => {
    function TestComponent() {
      return (
        <Formik initialValues={{ startDate: "" }} onSubmit={cy.stub()}>
          <Form>
            <DateField {...defaultProps} />
          </Form>
        </Formik>
      );
    }

    setUp(TestComponent);
  });

  it("Given props, Then render MUI-Field with props", () => {
    cy.get(".date-field label").should("have.text", defaultProps.label);
    cy.get(".date-field input").should("have.attr", "placeholder", defaultProps.inputFormat.toLowerCase());
  });
});
