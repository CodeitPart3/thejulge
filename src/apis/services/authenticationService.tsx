import type { AxiosResponse } from "axios";
import type { UserItem } from "src/types";
import { ApiWrapper } from "src/types";

import requestor from "../client/requestor";

interface LoginItem {
  token: string;
  user: ApiWrapper<UserItem>;
}

export type LoginRequest = { email: string; password: string };
export type LoginResponse = ApiWrapper<LoginItem>;

class AuthenticationService {
  async postAuthentication(
    payload: LoginRequest,
  ): Promise<AxiosResponse<LoginResponse>> {
    const res = await requestor.post<LoginResponse>("/token", payload);

    const token = res.data.item.token;
    const user = res.data.item.user.item;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return res;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getToken() {
    return localStorage.getItem("token");
  }
  isAuthenticated() {
    return Boolean(this.getToken());
  }
  getUser(): UserItem | null {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as UserItem) : null;
  }
}

export default new AuthenticationService();
