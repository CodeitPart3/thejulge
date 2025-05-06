import { useEffect, useState } from "react";

import { getNotices } from "@/apis/services/noticeService";
import {
  ITEM_COUNT_PER_PAGE,
  CUSTOM_NOTICE_LIMIT,
} from "@/pages/NoticeListPage/constants";
import { useUserStore } from "@/store/useUserStore";
import type { NoticeWithoutUserApplication, SortKey } from "@/types/notice";

export default function useNoticeList(initialPage = 1) {
  const { address, isLoggedIn } = useUserStore();

  const [customNotices, setCustomNotices] = useState<
    NoticeWithoutUserApplication[]
  >([]);
  const [notices, setNotices] = useState<NoticeWithoutUserApplication[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortKey>("time");
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);

  const fetchNotices = async (currentPage: number, sort: SortKey) => {
    try {
      const offset = (currentPage - 1) * ITEM_COUNT_PER_PAGE;

      const res = await getNotices({
        offset,
        limit: ITEM_COUNT_PER_PAGE,
        sort,
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

  useEffect(() => {
    fetchNotices(page, selectedSort);
    fetchCustomNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedSort, isLoggedIn, address]);

  return {
    customNotices,
    notices,
    total,
    page,
    selectedSort,
    setPage,
    setSelectedSort,
  };
}
