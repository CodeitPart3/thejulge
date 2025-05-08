import { getShopApplications } from "../services/applicationService";
import { getNotice } from "../services/noticeService";

import { PostData } from "@/components/Post/PostList";
import { UserType } from "@/types/user";
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

export const loadRecentNotices = (noticeId: string, userType?: UserType) => {
  const allRecentNotices =
    getLocalStorageValue<PostData[]>("recentNotices") ?? [];

  const recentNotices = allRecentNotices
    .filter(({ id }) => id !== noticeId)
    .map(({ link, ...restNoticeInfo }) => {
      const type = userType ?? "employee";
      const splittedLink = link.split("/");
      splittedLink[splittedLink.length - 1] = type;

      const updatedLink = splittedLink.join("/");
      return { link: updatedLink, ...restNoticeInfo };
    })
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
