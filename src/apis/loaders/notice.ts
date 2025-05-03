import { getShopApplications } from "../services/applicationService";
import { getNotice } from "../services/noticeService";

import { PostData } from "@/components/Post/PostList";
import { getLocalStorageValue } from "@/utils/localStorage";

interface LoadNoticeParams {
  shopId: string;
  noticeId: string;
}

export const loadNotice = async ({ shopId, noticeId }: LoadNoticeParams) => {
  const noticeResult = await getNotice(shopId, noticeId);

  if (noticeResult.status === 200) {
    return noticeResult.data.item;
  }
};

const MAX_VISIBLE_RECENT_NOTICES = 6;

export const loadRecentNotices = async (noticeId: string) => {
  const allRecentNotices =
    getLocalStorageValue<PostData[]>("recentNotices") ?? [];

  const recentNotices = allRecentNotices
    .filter(({ id }) => id !== noticeId)
    .slice(0, MAX_VISIBLE_RECENT_NOTICES);

  return recentNotices;
};

interface LoadNoticeApplicationsParams {
  shopId: string;
  noticeId: string;
  offset?: number;
  limit?: number;
}

export const loadNoticeApplications = async ({
  shopId,
  noticeId,
  offset,
  limit,
}: LoadNoticeApplicationsParams) => {
  const noticeApplicationsResult = await getShopApplications(
    shopId,
    noticeId,
    offset,
    limit,
  );

  if (noticeApplicationsResult.status === 200) {
    return noticeApplicationsResult.data;
  }
};
