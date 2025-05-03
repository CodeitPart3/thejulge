import { LoaderFunction } from "react-router-dom";

import { loadNotice, loadRecentNotices } from "@/apis/loaders/notice";

const noticeEmployeeLoader: LoaderFunction = async ({ params }) => {
  const { shopId, noticeId } = params as {
    shopId: string;
    noticeId: string;
  };

  const [noticeInfo] = await Promise.all([loadNotice({ shopId, noticeId })]);
  const recentNotices = loadRecentNotices(noticeId);

  return { noticeInfo, recentNotices };
};

export default noticeEmployeeLoader;
