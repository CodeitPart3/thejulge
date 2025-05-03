import { LoaderFunction } from "react-router-dom";

import { loadNotice } from "@/apis/loaders/notice";

const noticeEmployerLoader: LoaderFunction = async ({ params }) => {
  const { shopId, noticeId } = params as {
    shopId: string;
    noticeId: string;
  };

  const [noticeInfo] = await Promise.all([loadNotice({ shopId, noticeId })]);

  return { noticeInfo };
};

export default noticeEmployerLoader;
