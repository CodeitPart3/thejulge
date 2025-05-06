import type { AxiosResponse } from "axios";
import {
  NoticeResponse,
  NoticePayload,
  GetNoticesParams,
  NoticeListResponseWithoutUserApplication,
} from "src/types";

import requestor from "../client/requestor";

/* 공고 조회 */
export const getNotices = (
  params?: GetNoticesParams,
): Promise<AxiosResponse<NoticeListResponseWithoutUserApplication>> => {
  const { address, ...restParams } = params ?? {};
  let queryAddress: string | undefined = "";

  if (address && Array.isArray(address)) {
    queryAddress = "?" + address.map((area) => `address=${area}`).join("&");
  }

  if (typeof address === "string") {
    queryAddress = `?address=${address}`;
  }

  return requestor.get(`/notices${queryAddress}`, { params: restParams });
};

/* 가게의 공고 목록 조회 */
export const getShopNotices = (
  shopId: string,
  offset?: number,
  limit?: number,
): Promise<AxiosResponse<NoticeListResponseWithoutUserApplication>> => {
  return requestor.get(`/shops/${shopId}/notices`, {
    params: { offset, limit },
  });
};

/* 가게 공고 등록 */
export const postNotice = (
  shopId: string,
  payload: NoticePayload,
): Promise<AxiosResponse<NoticeResponse>> => {
  return requestor.post(`/shops/${shopId}/notices`, payload);
};

/* 가게의 특정 공고 조회 */
export const getNotice = (
  shopId: string,
  noticeId: string,
): Promise<AxiosResponse<NoticeResponse>> => {
  return requestor.get(`/shops/${shopId}/notices/${noticeId}`);
};

/* 가게의 특정 공고 수정 */
export const putNotice = (
  shopId: string,
  noticeId: string,
  payload: NoticePayload,
): Promise<AxiosResponse<NoticeResponse>> => {
  return requestor.put(`/shops/${shopId}/notices/${noticeId}`, payload);
};
