import { mount } from "@cypress/react";
import * as Yup from "yup";
import { ThemeProvider } from "@mui/material/styles";

import CustomForm from ".";
import Field from "src/components/form/field";
import { Button } from "src/components/MUI";
import theme from "src/utils/contexts/Theme";

describe("CustomForm", () => {
  interface IProps {
    initialValues: object;
    validationSchema?: object;
    handleSubmit: (values: object) => Promise<any>;
  }

  function TestComponent({ initialValues, validationSchema, handleSubmit }: IProps) {
    return (
      <ThemeProvider theme={theme}>
        <CustomForm initialValues={initialValues} validationSchema={validationSchema} handleSubmit={handleSubmit}>
          <Field
            label="nickname"
            color="secondary"
            variant="standard"
            type="text"
            name="nickname"
            placeholder="type nickname..."
          />
          <Field
            label="password"
            color="secondary"
            variant="standard"
            type="password"
            name="password"
            placeholder="type password..."
          />
          <Button type="submit">submit</Button>
        </CustomForm>
      </ThemeProvider>
    );
  }

  beforeEach(function () {
    this.errorMessage = {
      required: "Required",
      tooShort: "Must be 6 characters or more",
      tooLong: "Must be 10 characters or less",
    };
    const validationSchema = Yup.object({
      nickname: Yup.string().max(10, this.errorMessage.tooLong).required(this.errorMessage.required),
      password: Yup.string()
        .min(6, this.errorMessage.tooShort)
        .max(10, this.errorMessage.tooLong)
        .required(this.errorMessage.required),
    });
    this.props = {
      initialValues: {
        nickname: "",
        password: "",
      },
      validationSchema,
      handleSubmit: cy.stub().as("handleSubmit"),
    };
    mount(<TestComponent {...this.props} />);
  });

  it("When type proper nickname and password and click submit button, Then call handleSubmit", function () {
    const typedNickname = "cypress";
    const typedPassword = "123456";

    cy.get("form input[name='nickname']").type(typedNickname).should("have.value", typedNickname);
    cy.get("form input[name='password']").type(typedPassword).should("have.value", typedPassword);
    cy.get("form button").click();
    cy.get("@handleSubmit").should("have.been.calledOnce");
  });

  it("When type proper nickname and password and keypress enter, Then call handleSubmit", function () {
    const typedNickname = "cypress";
    const typedPassword = "123456";

    cy.get("form input[name='nickname']").type(typedNickname);
    cy.get("form input[name='password']").type(typedPassword).type("{enter}");
    cy.get("@handleSubmit").should("have.been.calledOnce");
  });

  it("Given empty all field, When submit, Then not pass validation", function () {
    cy.get("form button").click();
    cy.get("@handleSubmit").should("not.have.been.called");
    cy.get("form .error").contains(this.errorMessage.required);
  });

  it("Given empty some field, When submit, Then not pass validation", function () {
    const typedNickname = "cypress";

    cy.get("form input[name='nickname']").type(typedNickname);
    cy.get("form button").click();
    cy.get("@handleSubmit").should("not.have.been.called");
    cy.get("form .error").contains(this.errorMessage.required);
  });

  it("When short password or long password, Then not pass validation", function () {
    const typedShortPassword = "12345";
    const appendedTypedLongPawssword = "67890!";

    cy.get("form input[name='password']").type(typedShortPassword);
    cy.get("form button").click();
    cy.get("@handleSubmit").should("not.have.been.called");
    cy.get("form .error").contains(this.errorMessage.tooShort);

    cy.get("form input[name='password']").type(appendedTypedLongPawssword);
    cy.get("form button").click();
    cy.get("@handleSubmit").should("not.have.been.called");
    cy.get("form .error").contains(this.errorMessage.tooLong);
  });
});
