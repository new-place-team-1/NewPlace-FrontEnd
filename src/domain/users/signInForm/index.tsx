import { useCallback } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";

import regExp from "src/config/regExp";
import { validationMessage, alertMessage } from "src/config/message";
import { signIn } from "src/services/users";
import { Typography, Paper, Button } from "src/UI/MUI";
import CustomModal from "src/UI/MUI/customs/modal";
import CustomForm from "src/UI/form";
import Field from "src/UI/form/field";

export interface IProps {
  size: ModalSize;
  open: boolean;
  handleClose: () => void;
}

function SignInForm({ size, open, handleClose }: IProps) {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required(validationMessage.email.required).matches(regExp.email, validationMessage.email.match),
    password: Yup.string()
      .required(validationMessage.password.required)
      .matches(regExp.password, validationMessage.password.match),
  });

  const handleSubmit = useCallback(
    (values: ISignInFormValues, actions) => {
      signIn(values)
        .then(() => {
          handleClose();
        })
        .catch(() => {
          actions.setSubmitting(false);
          Swal.fire({
            icon: "error",
            title: alertMessage.signIn.error.title,
            text: alertMessage.signIn.error.text,
          });
        });
    },
    [handleClose],
  );

  const paperStyle = {
    padding: size === "small" ? 2 : 6,
  };

  return (
    <CustomModal id="sign-in-form" open={open} onClose={handleClose} size={size}>
      <Paper elevation={2} sx={paperStyle}>
        <CustomForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h2" component="h2">
            로그인
          </Typography>
          <Field type="email" name="email" label="이메일" variant="standard" color="secondary" fullWidth />
          <Field type="password" name="password" label="비밀번호" variant="standard" color="secondary" fullWidth />
          <Button type="submit" variant="contained" sx={{ alignSelf: "center", marginTop: 1 }}>
            계속
          </Button>
        </CustomForm>
      </Paper>
    </CustomModal>
  );
}

export default SignInForm;
