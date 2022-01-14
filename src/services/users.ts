import axios from "axios";

import { API_URL, USERS } from "src/config/endpoint";

export const signUp = (payload: ISignUpRequestPayload) => {
  return axios({
    method: "post",
    url: API_URL + USERS.INDEX,
    data: payload,
  });
};

export const signIn = (payload: ISignInRequestPayload) => {
  return axios({
    method: "post",
    url: API_URL + USERS.SESSION,
    data: payload,
  });
};