import { useState, useCallback, useMemo } from "react";
import * as Yup from "yup";
import { omit } from "lodash";
import Swal from "sweetalert2";

import { StyledBox } from "./SignUpForm.styled";
import { validationMessage, alertMessage } from "src/config/message";
import regExp from "src/config/regExp";
import { bankSelectOptions } from "src/config/banks";
import { signUp } from "src/services/users";
import { Typography, Paper, Button } from "src/components/MUI";
import CustomModal, { ModalSize } from "src/components/MUI/customs/modal";
import CustomForm from "src/components/form";
import Field from "src/components/form/field";
import CheckboxField from "src/components/form/checkboxField";
import SelectField from "src/components/form/selectField";

interface IProps {
  size: ModalSize;
  open: boolean;
  handleClose: () => void;
}

function SignUpForm({ size, open, handleClose }: IProps) {
  const [agreeContact, setAgreeContact] = useState<boolean>(false);
  const [agreePolicy, setAgreePolicy] = useState<boolean>(false);
  const [showWaitMessage, setShowWaitMessage] = useState<boolean>(false);
  const initialValues: ISignUpFormValues = useMemo(() => {
    return {
      email: "",
      password: "",
      passwordVerified: "",
      name: "",
      phoneNumber: "",
      bankId: "",
      accountNumber: "",
      agree: false,
      agreeContact: false,
      agreePolicy: false,
    };
  }, []);
  const validationSchema = Yup.object({
    email: Yup.string().required(validationMessage.email.required).matches(regExp.email, validationMessage.email.match),
    password: Yup.string()
      .required(validationMessage.password.required)
      .matches(regExp.password, validationMessage.password.match),
    passwordVerified: Yup.string()
      .required(validationMessage.passwordVerified.required)
      .oneOf([Yup.ref("password")], validationMessage.passwordVerified.match),
    name: Yup.string().required(validationMessage.name.required).matches(regExp.userName, validationMessage.name.match),
    phoneNumber: Yup.string()
      .required(validationMessage.phoneNumber.required)
      .matches(regExp.phoneNumber, validationMessage.phoneNumber.match),
    agree: Yup.boolean().oneOf([true], validationMessage.agree.required),
  });

  const handleSubmit = useCallback(
    (values: ISignUpFormValues, actions) =>
      signUp(omit(values, ["agree", "agreeContact", "agreePolicy"]))
        .then(() => {
          setShowWaitMessage(true);
        })
        .catch(() => {
          actions.resetForm({
            values: initialValues,
          });
          Swal.fire({
            icon: "error",
            title: alertMessage.signUp.error.title,
            text: alertMessage.signUp.error.text,
          });
        }),
    [initialValues],
  );

  const handleAgreeContactChange = useCallback((event, values: ISignUpFormValues, setValues) => {
    const checked = event.target.checked;

    setValues({
      ...values,
      agree: checked && values.agreePolicy,
      agreeContact: checked,
    });
    setAgreeContact(event.target.checked);
  }, []);

  const handleAgreePolicyChange = useCallback((event, values: ISignUpFormValues, setValues) => {
    const checked = event.target.checked;

    setValues({
      ...values,
      agree: checked && values.agreeContact,
      agreePolicy: checked,
    });
    setAgreePolicy(event.target.checked);
  }, []);

  const handleAgreeAllChange = useCallback((event, values: ISignUpFormValues, setValues) => {
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

  const paperStyle = {
    padding: size === "small" ? 2 : 6,
  };

  return (
    <CustomModal id="sign-up-form" open={open} onClose={handleClose} size={size}>
      <Paper elevation={2} sx={paperStyle}>
        {showWaitMessage ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h2" component="h2" sx={{ marginBottom: 1 }}>
              이메일 인증
            </Typography>
            <Typography sx={{ margin: 1 }}>
              인증 이메일이 발송되었습니다. 이메일 인증을 하면 회원가입이 완료됩니다.
            </Typography>
            <Button type="button" variant="contained" sx={{ alignSelf: "center", marginTop: 1 }} onClick={handleClose}>
              확인
            </Button>
          </div>
        ) : (
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
              name="passwordVerified"
              label="비밀번호 확인"
              variant="standard"
              color="secondary"
              fullWidth
            />
            <Field type="text" name="name" label="이름" variant="standard" color="secondary" fullWidth />
            <Field
              type="text"
              name="phoneNumber"
              label="휴대폰 번호"
              placeholder="'-'을 빼고 기입해주세요."
              variant="standard"
              color="secondary"
              fullWidth
            />
            <SelectField
              size="small"
              color="secondary"
              name="bankId"
              label="은행명 (선택 사항)"
              labelId="bankId-label"
              options={bankSelectOptions}
              sx={{ alignSelf: "start", width: 220 }}
            />
            <Field
              size="small"
              type="text"
              name="accountNumber"
              label="계좌 번호 (선택 사항)"
              placeholder="'-'을 빼고 기입해주세요."
              color="secondary"
              fullWidth
            />
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
        )}
      </Paper>
    </CustomModal>
  );
}

export default SignUpForm;
