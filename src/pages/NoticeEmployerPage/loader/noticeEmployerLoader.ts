import { LoaderFunction } from "react-router-dom";

import { loadNotice, loadRecentNotices } from "@/apis/loaders/notice";
import { useUserStore } from "@/hooks/useUserStore";

const noticeEmployerLoader: LoaderFunction = async ({ params }) => {
  const user = useUserStore.getState().user;
  const { shopId, noticeId } = params as {
    shopId: string;
    noticeId: string;
  };

  const noticeInfo = await loadNotice({ shopId, noticeId });

  if (user?.shopId === shopId) {
    return { noticeInfo };
  }

  const recentNotices = loadRecentNotices(noticeId, user?.type);
  return { noticeInfo, recentNotices };
};

export default noticeEmployerLoader;
