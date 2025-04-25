import type { AxiosResponse } from "axios";
import { ShopPayload, ShopResponse } from "src/types";

import requestor from "../client/requestor";

/* 가게 등록 */
export const postShop = (
  payload: ShopPayload,
): Promise<AxiosResponse<ShopResponse>> => {
  return requestor.post("/shops", payload);
};

/* 가게 정보 조회 */
export const getShop = (
  shopId: string,
): Promise<AxiosResponse<ShopResponse>> => {
  return requestor.get(`/shops/${shopId}`);
};

/* 가게 정보 수정 */
export const putShop = (
  shopId: string,
  payload: ShopPayload,
): Promise<AxiosResponse<ShopResponse>> => {
  return requestor.put(`/shops/${shopId}`, payload);
};
