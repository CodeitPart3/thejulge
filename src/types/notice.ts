import type { ApiPaged, ApiWithHref, ApiWrapper } from "./common";
import type { ShopSummary } from "./shop";

export type SortKey =
  | "time" /* 마감임박순 */
  | "pay" /* 시급많은순 */
  | "hour" /* 시간적은순 */
  | "shop"; /* 가나다순 */

export interface NoticeListMeta {
  address: string[];
  keyword?: string;
}

export interface NoticeItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop?: ApiWithHref<ShopSummary>;
  currentUserApplication?: {
    item: {
      id: string;
      status: "pending" | "accepted" | "rejected" | "canceled";
      createdAt: string;
    };
  };
}

export interface GetNoticesParams {
  offset?: number;
  limit?: number;
  address?: string | string[];
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
  sort?: SortKey;
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
export type NoticeWithoutUserApplication = Omit<
  NoticeItem,
  "currentUserApplication"
>;

export interface NoticeListResponseWithoutUserApplication
  extends ApiPaged<NoticeWithoutUserApplication>,
    NoticeListMeta {}
