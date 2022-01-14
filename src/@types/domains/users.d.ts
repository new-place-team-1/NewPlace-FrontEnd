interface ISignUpFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  agree: boolean;
  agreeContact: boolean;
  agreePolicy: boolean;
}
interface ISignUpRequestPayload {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
}

interface ISignInFormValues {
  email: string;
  password: string;
}
interface ISignInRequestPayload {
  email: string;
  password: string;
}
