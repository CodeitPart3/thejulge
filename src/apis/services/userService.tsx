import type { AxiosResponse } from "axios";
import {
  SignupPayload,
  SignupResponse,
  UserResponse,
  UpdateUserPayload,
} from "src/types";

import requestor from "../client/requestor";

/* 회원가입 */
export const postUser = (
  payload: SignupPayload,
): Promise<AxiosResponse<SignupResponse>> => {
  return requestor.post("/users", payload);
};

/* 내 정보 조회 */
export const getUser = (
  userId: string,
): Promise<AxiosResponse<UserResponse>> => {
  return requestor.get(`/users/${userId}`);
};

/* 내 정보 수정 */
export const putUser = (
  userId: string,
  payload: UpdateUserPayload,
): Promise<AxiosResponse<UserResponse>> => {
  return requestor.put(`/users/${userId}`, payload);
};
