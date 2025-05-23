import { LoaderFunction } from "react-router-dom";

import { loadNotice, loadRecentNotices } from "@/apis/loaders/notice";
import { useUserStore } from "@/store/useUserStore";

const noticeEmployeeLoader: LoaderFunction = async ({ params }) => {
  const user = useUserStore.getState().user;
  const { shopId, noticeId } = params as {
    shopId: string;
    noticeId: string;
  };

  const noticeInfo = await loadNotice({ shopId, noticeId });
  const recentNotices = loadRecentNotices(noticeId, user?.type);

  return { noticeInfo, recentNotices };
};

export default noticeEmployeeLoader;
