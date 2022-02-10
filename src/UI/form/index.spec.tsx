import { mount } from "@cypress/react";
import * as Yup from "yup";
import { ThemeProvider } from "@mui/material/styles";

import CustomForm from ".";
import Field from "src/UI/form/field";
import CheckboxField from "src/UI/form/checkboxField";
import { Button } from "src/UI/MUI";
import theme from "src/utils/contexts/Theme";
import setUp from "src/utils/test/setUp";

interface IProps {
  initialValues: object;
  validationSchema?: object;
  handleSubmit: (values: object) => Promise<any>;
}

describe("CustomForm", () => {
  const validationMessage = {
    required: "Required",
    tooShort: "Must be 6 characters or more",
    tooLong: "Must be 10 characters or less",
  };
  const validationSchema = Yup.object({
    nickname: Yup.string().max(10, validationMessage.tooLong).required(validationMessage.required),
    password: Yup.string()
      .min(6, validationMessage.tooShort)
      .max(10, validationMessage.tooLong)
      .required(validationMessage.required),
  });

  beforeEach(() => {
    const defaultProps: IProps = {
      initialValues: {
        nickname: "",
        password: "",
      },
      validationSchema,
      handleSubmit: cy.stub().as("handleSubmit"),
    };
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

    setUp(TestComponent, defaultProps);
  });

  it("When type proper nickname and password and click submit button, Then show Spinner and call handleSubmit with proper arguments", () => {
    const typedNickname = "cypress";
    const typedPassword = "123456";

    cy.get("form input[name='nickname']").type(typedNickname).should("have.value", typedNickname);
    cy.get("form input[name='password']").type(typedPassword).should("have.value", typedPassword);

    cy.get("form button").click();

    cy.get(".MuiCircularProgress-root").should("exist");
    cy.get("@handleSubmit").should("have.been.calledOnceWith", { nickname: typedNickname, password: typedPassword });
  });

  it("When type proper nickname and password and keypress enter, Then call handleSubmit with proper arguments", () => {
    const typedNickname = "cypress";
    const typedPassword = "123456";

    cy.get("form input[name='nickname']").type(typedNickname);
    cy.get("form input[name='password']").type(typedPassword).type("{enter}");

    cy.get("@handleSubmit").should("have.been.calledOnceWith", { nickname: typedNickname, password: typedPassword });
  });

  it("Given empty all field, When submit, Then not pass validation", () => {
    cy.get("form button").click();

    cy.get("@handleSubmit").should("not.have.been.called");
    cy.get("form .error").contains(validationMessage.required).should("exist");
  });

  it("Given empty some field, When submit, Then not pass validation", () => {
    const typedNickname = "cypress";

    cy.get("form input[name='nickname']").type(typedNickname);
    cy.get("form button").click();

    cy.get("@handleSubmit").should("not.have.been.called");
    cy.get("form .error").contains(validationMessage.required).should("exist");
  });

  it("When short password or long password, Then not pass validation", () => {
    const typedShortPassword = "12345";
    const appendedTypedLongPawssword = "67890!";

    cy.get("form input[name='password']").type(typedShortPassword);
    cy.get("form button").click();

    cy.get("@handleSubmit").should("not.have.been.called");
    cy.get("form .error").contains(validationMessage.tooShort).should("exist");

    cy.get("form input[name='password']").type(appendedTypedLongPawssword);
    cy.get("form button").click();

    cy.get("@handleSubmit").should("not.have.been.called");
    cy.get("form .error").contains(validationMessage.tooLong).should("exist");
  });
});

describe("CustomForm with CheckboxField", () => {
  const validationMessage = {
    required: "Required",
  };
  const validationSchema = Yup.object({
    agree: Yup.boolean().oneOf([true], validationMessage.required),
  });

  beforeEach(() => {
    const defaultProps: IProps = {
      initialValues: {
        agree: false,
      },
      validationSchema,
      handleSubmit: cy.stub().as("handleSubmit"),
    };
    function TestComponent({ initialValues, validationSchema, handleSubmit }: IProps) {
      return (
        <ThemeProvider theme={theme}>
          <CustomForm initialValues={initialValues} validationSchema={validationSchema} handleSubmit={handleSubmit}>
            <CheckboxField name="agree" color="secondary" label="전체 약관 동의" />
            <Button type="submit">submit</Button>
          </CustomForm>
        </ThemeProvider>
      );
    }

    setUp(TestComponent, defaultProps);
  });

  it("Given CheckboxField checked, When click submit button, Then call onSubmit with proper arguments", () => {
    cy.get("form input[name='agree']").click();

    cy.get("form button").click();

    cy.get("@handleSubmit").should("have.been.calledOnceWith", { agree: true });
  });

  it("Given CheckboxField not checked, When click submit button, Then not call onSubmit", () => {
    cy.get("form button").click();

    cy.get("@handleSubmit").should("not.have.been.called");
  });
});
