import type { ApiPaged, ApiWrapper } from "./common";
import type { ShopSummary } from "./shop";

export type SortKey = "time" | "pay" | "hour" | "shop";

export interface NoticeItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop?: ApiWrapper<ShopSummary>;
  currentUserApplication?: {
    item: {
      id: string;
      status: "pending" | "accepted" | "rejected" | "canceled";
      createdAt: string;
    };
  };
}

export interface NoticePayload {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

export type NoticeSummary = Pick<
  NoticeItem,
  "id" | "hourlyPay" | "description" | "startsAt" | "workhour" | "closed"
>;

export type NoticeResponse = ApiWrapper<NoticeItem>;
export type NoticeListResponse = ApiPaged<NoticeItem>;
