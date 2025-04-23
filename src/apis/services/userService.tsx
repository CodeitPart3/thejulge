import type { AxiosResponse } from "axios";
import {
  SignupPayload,
  SignupResponse,
  UserResponse,
  UpdateUserPayload,
} from "src/types";

import requestor from "../client/requestor";

class UserService {
  postUser(payload: SignupPayload): Promise<AxiosResponse<SignupResponse>> {
    return requestor.post("/users", payload);
  }

  getUser(userId: string): Promise<AxiosResponse<UserResponse>> {
    return requestor.get(`/users/${userId}`);
  }

  putUser(
    userId: string,
    payload: UpdateUserPayload,
  ): Promise<AxiosResponse<UserResponse>> {
    return requestor.put(`/users/${userId}`, payload);
  }
}

export default new UserService();
