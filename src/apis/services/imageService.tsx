import axios, { AxiosResponse } from "axios";
import { ApiWrapper } from "src/types";

import requestor from "../client/requestor";

interface PresignedItem {
  url: string;
}
type PresignedResponse = ApiWrapper<PresignedItem>;

class ImageService {
  async postImage(name: string): Promise<string> {
    const res: AxiosResponse<PresignedResponse> = await requestor.post(
      "/images",
      { name },
    );
    return res.data.item.url;
  }

  async putImage(
    presignedURL: string,
    file: File | Blob,
  ): Promise<AxiosResponse<void>> {
    return axios.put(presignedURL, file, {
      headers: { "Content-Type": file.type || "application/octet-stream" },
    });
  }

  getPublicURL(presignedURL: string) {
    return presignedURL.split("?")[0];
  }
  getImage(publicURL: string): Promise<AxiosResponse<Blob>> {
    return axios.get(publicURL, { responseType: "blob" });
  }
}

export default new ImageService();
