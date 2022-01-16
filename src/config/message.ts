export const validationMessage = {
  email: {
    required: "이메일을 입력해주세요.",
    match: "올바른 이메일 형식이 아닙니다.",
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    match: "비밀번호는 영문(대소문자 구분)/숫자/특수문자 포함 8자 이상입니다.",
  },
  passwordVerified: {
    required: "비밀번호를 확인해주세요.",
    match: "비밀번호가 일치하지 않습니다.",
  },
  name: {
    required: "이름을 입력해주세요.",
    match: "이름은 5자 이내입니다.",
  },
  phoneNumber: {
    required: "휴대폰 번호를 입력해주세요.",
    match: "올바른 번호 형식이 아닙니다.",
  },
  agree: {
    required: "약관에 동의가 필요합니다.",
  },
};

export const alertMessage = {
  signUp: {
    success: {
      text: "회원가입에 성공했습니다.",
    },
    error: {
      title: "회원가입 실패",
      text: "회원가입에 실패했습니다. 다시 요청해주세요.",
    },
  },
  signIn: {
    error: {
      title: "로그인 실패",
      text: "이메일이나 패스워드가 올바르지 않습니다.",
    },
  },
};
