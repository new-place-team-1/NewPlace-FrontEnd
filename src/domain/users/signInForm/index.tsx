import { useCallback } from "react";
import * as Yup from "yup";

import regExp from "src/config/regExp";
import { errorMessage } from "src/config/message";
import { Typography, Paper, Button } from "src/components/MUI";
import CustomModal from "src/components/MUI/customs/modal";
import CustomForm from "src/components/form";
import Field from "src/components/form/field";

interface IProps {
  open: boolean;
  onClose: () => void;
}

function SignInForm({ open, onClose }: IProps) {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required(errorMessage.email.required).matches(regExp.email, errorMessage.email.match),
    password: Yup.string()
      .required(errorMessage.password.required)
      .matches(regExp.password, errorMessage.password.match),
  });

  const handleSubmit = useCallback(values => {
    return new Promise(resolve => resolve(values));
  }, []);

  return (
    <CustomModal id="sign-in-form" open={open} onClose={onClose} size="small">
      <Paper elevation={2} sx={{ padding: 2 }}>
        <CustomForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h2" component="h2" sx={{ marginBottom: 1 }}>
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
