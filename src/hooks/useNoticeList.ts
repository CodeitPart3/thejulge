import { useEffect, useState } from "react";

import { getNotices } from "@/apis/services/noticeService";
import { useUserStore } from "@/hooks/useUserStore";
import {
  ITEM_COUNT_PER_PAGE,
  CUSTOM_NOTICE_LIMIT,
} from "@/pages/NoticeListPage/constants";
import type { NoticeWithoutUserApplication, SortKey } from "@/types/notice";

export default function useNoticeList(page: number, selectedSort: SortKey) {
  const { user, isLoggedIn } = useUserStore();
  const address = user?.address;
  const [customNotices, setCustomNotices] = useState<
    NoticeWithoutUserApplication[]
  >([]);
  const [notices, setNotices] = useState<NoticeWithoutUserApplication[]>([]);
  const [total, setTotal] = useState(0);

  const fetchNotices = async () => {
    try {
      const offset = (page - 1) * ITEM_COUNT_PER_PAGE;
      const res = await getNotices({
        offset,
        limit: ITEM_COUNT_PER_PAGE,
        sort: selectedSort,
      });

      setNotices(res.data.items.map(({ item }) => item));
      setTotal(res.data.count);
    } catch (err) {
      console.error("전체 공고 조회 실패", err);
    }
  };

  const fetchCustomNotices = async () => {
    try {
      const res = await getNotices({
        address: isLoggedIn ? address : undefined,
        sort: "time",
        limit: CUSTOM_NOTICE_LIMIT,
      });

      setCustomNotices(res.data.items.map(({ item }) => item));
    } catch (err) {
      console.error("맞춤 공고 조회 실패", err);
    }
  };
  console.log("isLoggedIn:", isLoggedIn);
  console.log("address:", address);
  useEffect(() => {
    fetchNotices();
    if (isLoggedIn && address) {
      fetchCustomNotices();
    }
  }, [page, selectedSort, isLoggedIn, address]);

  return {
    customNotices,
    notices,
    total,
  };
}
