import type { AxiosResponse } from "axios";
import { AlertListResponse, AlertReadListResponse } from "src/types";

import requestor from "../client/requestor";

/* 유저의 알림 목록 조회 */
export const getAlerts = (
  userId: string,
  offset: number = 0,
  limit?: number,
): Promise<AxiosResponse<AlertListResponse>> => {
  return requestor.get(`/users/${userId}/alerts`, {
    params: { offset, limit },
  });
};

/* 알림 읽음 처리 */
export const putAlert = (
  userId: string,
  alertId: string,
): Promise<AxiosResponse<AlertReadListResponse>> => {
  return requestor.put(`/users/${userId}/alerts/${alertId}`);
};
