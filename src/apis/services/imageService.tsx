import axios, { AxiosResponse } from "axios";
import { ApiWrapper } from "src/types";

import requestor from "../client/requestor";

interface PresignedItem {
  url: string;
}
type PresignedResponse = ApiWrapper<PresignedItem>;

/* Presigned URL 생성 */
export const postImage = async (name: string): Promise<string> => {
  const res: AxiosResponse<PresignedResponse> = await requestor.post(
    "/images",
    { name },
  );
  return res.data.item.url;
};

/* S3로 이미지 업로드 */
export const putImage = async (
  presignedURL: string,
  file: File | Blob,
): Promise<AxiosResponse<void>> => {
  return axios.put(presignedURL, file, {
    headers: { "Content-Type": file.type || "application/octet-stream" },
  });
};

/* Presigned URL 조회 */
export const getPublicURL = (presignedURL: string) => {
  return presignedURL.split("?")[0];
};

/* 이미지 조회 */
export const getImage = (publicURL: string): Promise<AxiosResponse<Blob>> => {
  return axios.get(publicURL, { responseType: "blob" });
};
