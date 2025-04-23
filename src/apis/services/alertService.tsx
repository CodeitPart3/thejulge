import type { AxiosResponse } from "axios";
import { AlertListResponse, AlertResponse } from "src/types";

import requestor from "../client/requestor";

class AlertService {
  getAlerts(
    userId: string,
    offset?: number,
    limit?: number,
  ): Promise<AxiosResponse<AlertListResponse>> {
    return requestor.get(`/users/${userId}/alerts`, {
      params: { offset, limit },
    });
  }

  putAlert(
    userId: string,
    alertId: string,
  ): Promise<AxiosResponse<AlertResponse>> {
    return requestor.put(`/users/${userId}/alerts/${alertId}`);
  }
}

export default new AlertService();
