import type { ApplicationStatus } from "./application";
import type { ApiWrapper, ApiPaged, ApiWithHref, LinkItem } from "./common";
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
  application: ApiWithHref<ApplicationMini>;
  shop: ApiWithHref<ShopSummary>;
  notice: ApiWithHref<NoticeSummary>;
}

export type AlertResponse = ApiWrapper<AlertItem>;
export type AlertListResponse = ApiPaged<AlertItem>;
export interface AlertReadListResponse {
  offset: number;
  limit: number;
  items: ApiWrapper<AlertItem>[];
  links: LinkItem[];
}
