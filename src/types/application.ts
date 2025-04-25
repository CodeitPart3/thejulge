import type { ApiWrapper, ApiPaged, ApiWithHref } from "./common";
import type { NoticeSummary } from "./notice";
import type { ShopSummary } from "./shop";
import type { UserSummary } from "./user";

export type ApplicationStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "canceled";

export interface ApplicationItem {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  user: ApiWithHref<UserSummary>;
  shop: ApiWithHref<ShopSummary>;
  notice: ApiWithHref<NoticeSummary>;
}

export type UserApplicationList = Omit<ApplicationItem, "user">;

export type ApplicationResponse = ApiWrapper<ApplicationItem>;
export type ApplicationListResponse = ApiPaged<ApplicationItem>;

export type UserApplicationListResponse = ApiPaged<UserApplicationList>;
