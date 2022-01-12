import { useCallback } from "react";
import * as Yup from "yup";

import { StyledBox } from "./SignUpForm.styled";
import { errorMessage } from "src/config/message";
import { Typography, Paper, Button, Checkbox } from "src/components/MUI";
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
  const initialValues = {
    email: "",
    password: "",
    passwordConfirm: "",
    userName: "",
    phoneNumber: "",
    agree: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().required(errorMessage.email.required),
    password: Yup.string().required(errorMessage.password.required),
    passwordConfirm: Yup.string().required(errorMessage.passwordConfirm.required),
    userName: Yup.string().required(errorMessage.userName.required),
    phoneNumber: Yup.string().required(errorMessage.phoneNumber.required),
    agree: Yup.boolean().oneOf([true], errorMessage.agree.required),
  });

  const handleSubmit = useCallback(values => {
    return new Promise(resolve => resolve(values));
  }, []);

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
          <Field type="text" name="userName" label="이름" variant="standard" color="secondary" fullWidth />
          <Field type="text" name="phoneNumber" label="휴대폰 번호" variant="standard" color="secondary" fullWidth />
          <CheckboxField name="agree" value="전체 약관 동의" color="secondary" />
          <StyledBox>
            <Checkbox color="secondary" />
            <Typography variant="caption" component="span">
              회원 가입 및 운영 약관 동의 (필수)
            </Typography>
            <Checkbox color="secondary" />
            <Typography variant="caption" component="span">
              개인정보 처리방침 동의 (필수)
            </Typography>
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
