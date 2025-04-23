import type { AxiosResponse } from "axios";
import {
  ApplicationListResponse,
  ApplicationResponse,
  ApplicationStatus,
} from "src/types";

import requestor from "../client/requestor";

class ApplicationService {
  getShopApplications(
    shopId: string,
    noticeId: string,
    offset?: number,
    limit?: number,
  ): Promise<AxiosResponse<ApplicationListResponse>> {
    return requestor.get(`/shops/${shopId}/notices/${noticeId}/applications`, {
      params: { offset, limit },
    });
  }

  postApplication(
    shopId: string,
    noticeId: string,
  ): Promise<AxiosResponse<ApplicationResponse>> {
    return requestor.post(`/shops/${shopId}/notices/${noticeId}/applications`);
  }

  putApplication(
    shopId: string,
    noticeId: string,
    applicationId: string,
    status: Exclude<ApplicationStatus, "pending">,
  ): Promise<AxiosResponse<ApplicationResponse>> {
    return requestor.put(
      `/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
      { status },
    );
  }

  getUserApplications(
    userId: string,
    offset?: number,
    limit?: number,
  ): Promise<AxiosResponse<ApplicationListResponse>> {
    return requestor.get(`/users/${userId}/applications`, {
      params: { offset, limit },
    });
  }
}

export default new ApplicationService();
