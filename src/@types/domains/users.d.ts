interface ISignUpFormValues {
  email: string;
  password: string;
  passwordVerified: string;
  name: string;
  phoneNumber: string;
  bankId: string;
  accountNumber: string;
  agree: boolean;
  agreeContact: boolean;
  agreePolicy: boolean;
}
interface ISignUpRequestPayload {
  email: string;
  password: string;
  passwordVerified: string;
  name: string;
  phoneNumber: string;
  bankId?: string;
  accountNumber?: string;
}

interface ILogInFormValues {
  email: string;
  password: string;
}
interface ILogInRequestPayload {
  email: string;
  password: string;
}
