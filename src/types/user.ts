import type { ApiWrapper } from "./common";
import type { SeoulDistrict } from "./common";
import { ShopSummary } from "./shop";

export type UserType = "employee" | "employer";

export interface UserItem {
  id: string;
  email: string;
  type: UserType;
  name?: string;
  phone?: string;
  address?: SeoulDistrict;
  bio?: string;
  shop?: ApiWrapper<ShopSummary> | null;
}

export type UserSummary = Pick<
  UserItem,
  "id" | "email" | "type" | "name" | "phone" | "address" | "bio"
>;

export interface SignupPayload {
  email: string;
  password: string;
  type: UserType;
}

export interface UpdateUserPayload {
  name?: string;
  phone?: string;
  address?: SeoulDistrict;
  bio?: string;
}

export type UserResponse = ApiWrapper<UserItem>;
export type SignupResponse = ApiWrapper<
  Pick<UserItem, "id" | "email" | "type">
>;
