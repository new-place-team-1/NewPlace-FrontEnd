import axios from "axios";

import { API_URL, USERS } from "src/config/endpoint";

export const signUp = (payload: ISignUpRequestPayload) =>
  axios({
    method: "post",
    url: API_URL + USERS.INDEX,
    data: payload,
  });

export const logIn = (payload: ILogInRequestPayload) =>
  axios({
    method: "post",
    url: API_URL + USERS.LOGIN,
    data: payload,
  });
