const regExp = {
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8,}$/,
  userName: /^[가-힣a-zA-Z]{1,5}$/,
  phoneNumber: /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/,
};

export default regExp;
