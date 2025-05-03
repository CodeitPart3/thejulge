import { LoaderFunction } from "react-router-dom";

import { loadNotice, loadRecentNotices } from "@/apis/loaders/notice";
import { useUserStore } from "@/hooks/useUserStore";

const noticeEmployerLoader: LoaderFunction = async ({ params }) => {
  const user = useUserStore.getState().user;
  const { shopId, noticeId } = params as {
    shopId: string;
    noticeId: string;
  };

  if (user?.shopId === shopId) {
    const [noticeInfo] = await Promise.all([loadNotice({ shopId, noticeId })]);

    return { noticeInfo };
  }

  const [noticeInfo] = await Promise.all([loadNotice({ shopId, noticeId })]);
  const recentNotices = loadRecentNotices(noticeId);

  return { noticeInfo, recentNotices };
};

export default noticeEmployerLoader;
