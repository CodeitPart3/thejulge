import type { AxiosResponse } from "axios";
import { ShopPayload, ShopResponse } from "src/types";

import requestor from "../client/requestor";

class ShopService {
  postShop(payload: ShopPayload): Promise<AxiosResponse<ShopResponse>> {
    return requestor.post("/shops", payload);
  }

  getShop(shopId: string): Promise<AxiosResponse<ShopResponse>> {
    return requestor.get(`/shops/${shopId}`);
  }

  putShop(
    shopId: string,
    payload: ShopPayload,
  ): Promise<AxiosResponse<ShopResponse>> {
    return requestor.put(`/shops/${shopId}`, payload);
  }
}

export default new ShopService();
