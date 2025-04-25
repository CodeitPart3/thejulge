import type {
  ApiWithHref,
  ApiWrapper,
  SeoulDistrict,
  ShopCategory,
} from "./common";
import type { UserSummary } from "./user";

export interface ShopSummary {
  id: string;
  name: string;
  category: ShopCategory;
  address1: SeoulDistrict;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export type ShopItem = ShopSummary & { user?: ApiWithHref<UserSummary> };

export interface ShopPayload {
  name: string;
  category: ShopCategory;
  address1: SeoulDistrict;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export type ShopResponse = ApiWrapper<ShopItem>;
