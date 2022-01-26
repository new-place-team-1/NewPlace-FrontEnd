import { mount } from "@cypress/react";
import * as Yup from "yup";
import { ThemeProvider } from "@mui/material/styles";

import CustomForm from ".";
import Field from "src/UI/form/field";
import CheckboxField from "src/UI/form/checkboxField";
import { Button } from "src/UI/MUI";
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
    this.validationMessage = {
      required: "Required",
      tooShort: "Must be 6 characters or more",
      tooLong: "Must be 10 characters or less",
    };
    const validationSchema = Yup.object({
      nickname: Yup.string().max(10, this.validationMessage.tooLong).required(this.validationMessage.required),
      password: Yup.string()
        .min(6, this.validationMessage.tooShort)
        .max(10, this.validationMessage.tooLong)
        .required(this.validationMessage.required),
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

  it("When type proper nickname and password and click submit button, Then show Spinner call handleSubmit", function () {
    const typedNickname = "cypress";
    const typedPassword = "123456";

    cy.get("form input[name='nickname']").type(typedNickname).should("have.value", typedNickname);
    cy.get("form input[name='password']").type(typedPassword).should("have.value", typedPassword);
    cy.get("form button").click();
    cy.get(".MuiCircularProgress-root");
    cy.get("@handleSubmit").should("have.been.calledOnceWith", { nickname: typedNickname, password: typedPassword });
  });

  it("When type proper nickname and password and keypress enter, Then call handleSubmit", function () {
    const typedNickname = "cypress";
    const typedPassword = "123456";

    cy.get("form input[name='nickname']").type(typedNickname);
    cy.get("form input[name='password']").type(typedPassword).type("{enter}");
    cy.get("@handleSubmit").should("have.been.calledOnceWith", { nickname: typedNickname, password: typedPassword });
  });

  it("Given empty all field, When submit, Then not pass validation", function () {
    cy.get("form button").click();
    cy.get("@handleSubmit").should("not.have.been.called");
    cy.get("form .error").contains(this.validationMessage.required);
  });

  it("Given empty some field, When submit, Then not pass validation", function () {
    const typedNickname = "cypress";

    cy.get("form input[name='nickname']").type(typedNickname);
    cy.get("form button").click();
    cy.get("@handleSubmit").should("not.have.been.called");
    cy.get("form .error").contains(this.validationMessage.required);
  });

  it("When short password or long password, Then not pass validation", function () {
    const typedShortPassword = "12345";
    const appendedTypedLongPawssword = "67890!";

    cy.get("form input[name='password']").type(typedShortPassword);
    cy.get("form button").click();
    cy.get("@handleSubmit").should("not.have.been.called");
    cy.get("form .error").contains(this.validationMessage.tooShort);

    cy.get("form input[name='password']").type(appendedTypedLongPawssword);
    cy.get("form button").click();
    cy.get("@handleSubmit").should("not.have.been.called");
    cy.get("form .error").contains(this.validationMessage.tooLong);
  });
});

describe("CustomForm with CheckboxField", () => {
  interface IProps {
    initialValues: object;
    validationSchema?: object;
    handleSubmit: (values: object) => Promise<any>;
  }

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

  beforeEach(function () {
    this.validationMessage = {
      required: "Required",
    };
    const validationSchema = Yup.object({
      agree: Yup.boolean().oneOf([true], this.validationMessage.required),
    });
    this.props = {
      initialValues: {
        agree: false,
      },
      validationSchema,
      handleSubmit: cy.stub().as("handleSubmit"),
    };
    mount(<TestComponent {...this.props} />);
  });

  it("Given CheckboxField checked, When click submit button, Then call onSubmit with proper arguments", function () {
    cy.get("form input[name='agree']").click();
    cy.get("form button").click();
    cy.get("@handleSubmit").should("have.been.calledOnceWith", { agree: true });
  });

  it("Given CheckboxField not checked, When click submit button, Then not call onSubmit", function () {
    cy.get("form button").click();
    cy.get("@handleSubmit").should("not.have.been.called");
  });
});
