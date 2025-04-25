import type { AxiosResponse } from "axios";
import type { ApiWithHref, UserItem } from "src/types";
import { ApiWrapper } from "src/types";

import requestor from "../client/requestor";

interface LoginItem {
  token: string;
  user: ApiWithHref<UserItem>;
}

export type LoginRequest = { email: string; password: string };
export type LoginResponse = ApiWrapper<LoginItem>;

/* 로그인 */
export const postAuthentication = async (
  payload: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
  const res = await requestor.post<LoginResponse>("/token", payload);

  const token = res.data.item.token;
  const user = res.data.item.user.item;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return res;
};

/* 로그아웃 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/* 토큰 반환 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/* 인증 여부 확인 */
export const isAuthenticated = () => {
  return Boolean(getToken());
};
