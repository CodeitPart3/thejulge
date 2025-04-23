import type { ApiWrapper, SeoulDistrict, ShopCategory } from "./common";
import type { UserSummary } from "./user";

export interface ShopItem {
  id: string;
  name: string;
  category: ShopCategory;
  address1: SeoulDistrict;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user?: ApiWrapper<UserSummary>;
}

export interface ShopPayload {
  name: string;
  category: ShopCategory;
  address1: SeoulDistrict;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export type ShopSummary = Pick<
  ShopItem,
  | "id"
  | "name"
  | "category"
  | "address1"
  | "address2"
  | "description"
  | "imageUrl"
  | "originalHourlyPay"
>;

export type ShopResponse = ApiWrapper<ShopItem>;
