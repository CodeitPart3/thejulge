import type { ApplicationStatus } from "./application";
import type { ApiWrapper, ApiPaged } from "./common";
import type { NoticeSummary } from "./notice";
import type { ShopSummary } from "./shop";

export type AlertResult = "accepted" | "rejected";

export interface ApplicationMini {
  id: string;
  status: Exclude<ApplicationStatus, "canceled">;
}

export interface AlertItem {
  id: string;
  createdAt: string;
  result: AlertResult;
  read: boolean;
  application: ApiWrapper<ApplicationMini>;
  shop: ApiWrapper<ShopSummary>;
  notice: ApiWrapper<NoticeSummary>;
}

export type AlertResponse = ApiWrapper<AlertItem>;
export type AlertListResponse = ApiPaged<AlertItem>;
