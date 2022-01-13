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

type IFormValues = ISignUpFormValues;
