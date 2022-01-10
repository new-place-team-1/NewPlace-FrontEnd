import { mount } from "@cypress/react";
import { Formik, Form } from "formik";
import { ThemeProvider } from "@mui/material/styles";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import DateField from ".";
import { DateRange } from "src/components/MUI/icons";
import { InputAdornment } from "src/components/MUI/api";
import theme from "src/utils/contexts/Theme";

describe("DateField", () => {
  beforeEach(function () {
    this.props = {
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
    mount(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Formik initialValues={{ startDate: "" }} onSubmit={cy.stub()}>
            <Form>
              <DateField {...this.props} />
            </Form>
          </Formik>
        </ThemeProvider>
      </LocalizationProvider>,
    );
  });

  it("Given props, Then render MUI Field with props", function () {
    cy.get(".date-field label").should("have.text", this.props.label);
    cy.get(".date-field input").should("have.attr", "placeholder", this.props.inputFormat.toLowerCase());
  });
});
