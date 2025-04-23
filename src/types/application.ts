import type { ApiWrapper, ApiPaged } from "./common";
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
  user: ApiWrapper<UserSummary>;
  shop: ApiWrapper<ShopSummary>;
  notice: ApiWrapper<NoticeSummary>;
}

export type ApplicationResponse = ApiWrapper<ApplicationItem>;
export type ApplicationListResponse = ApiPaged<ApplicationItem>;
