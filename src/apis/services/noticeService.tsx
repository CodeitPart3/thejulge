import type { AxiosResponse } from "axios";
import {
  NoticeListResponse,
  NoticeResponse,
  SortKey,
  NoticePayload,
} from "src/types";

import requestor from "../client/requestor";

class NoticeService {
  getNotices(params?: {
    offset?: number;
    limit?: number;
    address?: string;
    keyword?: string;
    startsAtGte?: string;
    hourlyPayGte?: number;
    sort?: SortKey;
  }): Promise<AxiosResponse<NoticeListResponse>> {
    return requestor.get("/notices", { params });
  }

  getShopNotices(
    shopId: string,
    offset?: number,
    limit?: number,
  ): Promise<AxiosResponse<NoticeListResponse>> {
    return requestor.get(`/shops/${shopId}/notices`, {
      params: { offset, limit },
    });
  }

  postNotice(
    shopId: string,
    payload: NoticePayload,
  ): Promise<AxiosResponse<NoticeResponse>> {
    return requestor.post(`/shops/${shopId}/notices`, payload);
  }

  getNotice(
    shopId: string,
    noticeId: string,
  ): Promise<AxiosResponse<NoticeResponse>> {
    return requestor.get(`/shops/${shopId}/notices/${noticeId}`);
  }

  putNotice(
    shopId: string,
    noticeId: string,
    payload: NoticePayload,
  ): Promise<AxiosResponse<NoticeResponse>> {
    return requestor.put(`/shops/${shopId}/notices/${noticeId}`, payload);
  }
}

export default new NoticeService();
