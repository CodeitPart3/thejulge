import type { AxiosResponse } from "axios";
import {
  ApplicationListResponse,
  ApplicationResponse,
  ApplicationStatus,
  UserApplicationListResponse,
} from "src/types";

import requestor from "../client/requestor";

/* 가게의 특정 공고의 지원 목록 조회 */
export const getShopApplications = (
  shopId: string,
  noticeId: string,
  offset?: number,
  limit?: number,
): Promise<AxiosResponse<ApplicationListResponse>> => {
  return requestor.get(`/shops/${shopId}/notices/${noticeId}/applications`, {
    params: { offset, limit },
  });
};

/* 가게의 특정 공고 지원 등록 */
export const postApplication = (
  shopId: string,
  noticeId: string,
): Promise<AxiosResponse<ApplicationResponse>> => {
  return requestor.post(`/shops/${shopId}/notices/${noticeId}/applications`);
};

/* 가게의 특정 공고 지원 승인, 거절 또는 취소소 */
export const putApplication = (
  shopId: string,
  noticeId: string,
  applicationId: string,
  status: Exclude<ApplicationStatus, "pending">,
): Promise<AxiosResponse<ApplicationResponse>> => {
  return requestor.put(
    `/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    { status },
  );
};

/* 유저의 지원 목록 조회 */
export const getUserApplications = (
  userId: string,
  offset?: number,
  limit?: number,
): Promise<AxiosResponse<UserApplicationListResponse>> => {
  return requestor.get(`/users/${userId}/applications`, {
    params: { offset, limit },
  });
};
