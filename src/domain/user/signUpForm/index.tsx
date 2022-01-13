import { useState, useCallback } from "react";
import * as Yup from "yup";

import { StyledBox } from "./SignUpForm.styled";
import { errorMessage } from "src/config/message";
import { Typography, Paper, Button } from "src/components/MUI";
import CustomModal, { ModalSize } from "src/components/MUI/customs/modal";
import CustomForm from "src/components/form";
import Field from "src/components/form/field";
import CheckboxField from "src/components/form/checkboxField";

interface IProps {
  open: boolean;
  onClose: () => void;
  size: ModalSize;
}

function SignUpForm({ open, onClose, size }: IProps) {
  const [agreeContact, setAgreeContact] = useState<boolean>(false);
  const [agreePolicy, setAgreePolicy] = useState<boolean>(false);

  const handleSubmit = useCallback(values => {
    return new Promise(resolve => resolve(values));
  }, []);

  const handleAgreeContactChange = useCallback((event, values, setValues) => {
    const checked = event.target.checked;

    setValues({
      ...values,
      agree: checked && values.agreePolicy,
      agreeContact: checked,
    });
    setAgreeContact(event.target.checked);
  }, []);

  const handleAgreePolicyChange = useCallback((event, values, setValues) => {
    const checked = event.target.checked;

    setValues({
      ...values,
      agree: checked && values.agreeContact,
      agreePolicy: checked,
    });
    setAgreePolicy(event.target.checked);
  }, []);

  const handleAgreeAllChange = useCallback((event, values, setValues) => {
    const checked = event.target.checked;

    setValues({
      ...values,
      agree: checked,
      agreeContact: checked,
      agreePolicy: checked,
    });
    setAgreeContact(checked);
    setAgreePolicy(checked);
  }, []);

  const initialValues = {
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phoneNumber: "",
    agree: false,
    agreeContact: false,
    agreePolicy: false,
  };
  const validationSchema = Yup.object({
    email: Yup.string().required(errorMessage.email.required),
    password: Yup.string().required(errorMessage.password.required),
    passwordConfirm: Yup.string().required(errorMessage.passwordConfirm.required),
    name: Yup.string().required(errorMessage.name.required),
    phoneNumber: Yup.string().required(errorMessage.phoneNumber.required),
    agree: Yup.boolean().oneOf([true], errorMessage.agree.required),
  });

  return (
    <CustomModal id="sign-up-form" open={open} onClose={onClose} size={size}>
      <Paper elevation={2} sx={{ padding: 2 }}>
        <CustomForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h2" component="h2" sx={{ marginBottom: 1 }}>
            회원가입
          </Typography>
          <Field type="email" name="email" label="이메일" variant="standard" color="secondary" fullWidth />
          <Field type="password" name="password" label="비밀번호" variant="standard" color="secondary" fullWidth />
          <Field
            type="password"
            name="passwordConfirm"
            label="비밀번호 확인"
            variant="standard"
            color="secondary"
            fullWidth
          />
          <Field type="text" name="name" label="이름" variant="standard" color="secondary" fullWidth />
          <Field type="text" name="phoneNumber" label="휴대폰 번호" variant="standard" color="secondary" fullWidth />
          <CheckboxField
            name="agree"
            color="secondary"
            label="전체 약관 동의"
            checked={agreeContact && agreePolicy}
            handleChange={handleAgreeAllChange}
          />
          <StyledBox>
            <CheckboxField
              name="agreeContact"
              color="secondary"
              label="회원 가입 및 운영 약관 동의 (필수)"
              checked={agreeContact}
              handleChange={handleAgreeContactChange}
            />
            <CheckboxField
              name="agreePolicy"
              color="secondary"
              label="개인정보 처리방침 동의 (필수)"
              checked={agreePolicy}
              handleChange={handleAgreePolicyChange}
            />
          </StyledBox>
          <Button type="submit" variant="contained" sx={{ alignSelf: "center", marginTop: 1 }}>
            계속
          </Button>
        </CustomForm>
      </Paper>
    </CustomModal>
  );
}

export default SignUpForm;
