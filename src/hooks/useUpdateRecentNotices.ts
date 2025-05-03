import { useEffect } from "react";

import { NoticeItem } from "../types";

import { PostData } from "@/components/Post/PostList";
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "@/utils/localStorage";

const RECENT_NOTICES = "recentNotices";

const updateLocalStorageRecentNotices = (candidateNotice: PostData) => {
  const storageValue: PostData[] = getLocalStorageValue(RECENT_NOTICES) ?? [];

  if (
    storageValue.length > 0 &&
    !storageValue.some(({ id }) => id === candidateNotice.id)
  ) {
    if (storageValue.length === 7) {
      storageValue.shift();
    }
    storageValue.push(candidateNotice);
  }
  setLocalStorageValue(RECENT_NOTICES, storageValue);
};

interface UseRecentNoticesParams {
  noticeInfo: NoticeItem;
  link: string;
}

const useUpdateRecentNotices = ({
  noticeInfo,
  link,
}: UseRecentNoticesParams) => {
  useEffect(() => {
    const { id, hourlyPay, startsAt, workhour, closed } = noticeInfo;
    const { name, imageUrl, address1, originalHourlyPay } =
      noticeInfo.shop!.item;

    const visitedNotice = {
      id,
      name,
      imageUrl,
      address1,
      originalHourlyPay,
      link,
      hourlyPay,
      startsAt,
      workhour,
      closed,
    };

    updateLocalStorageRecentNotices(visitedNotice);
  }, [noticeInfo, link]);
};

export default useUpdateRecentNotices;
