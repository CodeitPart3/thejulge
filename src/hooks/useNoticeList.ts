import { useEffect, useState } from "react";

import { getNotices } from "@/apis/services/noticeService";
import { useUserStore } from "@/hooks/useUserStore";
import {
  ITEM_COUNT_PER_PAGE,
  CUSTOM_NOTICE_LIMIT,
} from "@/pages/NoticeListPage/constants";
import { useFilterStore } from "@/store/useFilterStore";
import type { NoticeWithoutUserApplication, SortKey } from "@/types/notice";

export default function useNoticeList(page: number, selectedSort: SortKey) {
  const { user, isLoggedIn } = useUserStore();
  const address = user?.address;
  const [customNotices, setCustomNotices] = useState<
    NoticeWithoutUserApplication[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notices, setNotices] = useState<NoticeWithoutUserApplication[]>([]);
  const [total, setTotal] = useState(0);
  const getFilters = useFilterStore((state) => state.getFilters);

  const fetchNotices = async () => {
    setIsLoading(true);
    const { address, hourlyPayGte, startsAtGte } = getFilters();

    try {
      const offset = (page - 1) * ITEM_COUNT_PER_PAGE;
      const res = await getNotices({
        offset,
        limit: ITEM_COUNT_PER_PAGE,
        sort: selectedSort,
        address: address ?? undefined,
        hourlyPayGte: hourlyPayGte ?? undefined,
        startsAtGte: startsAtGte ?? undefined,
      });

      setNotices(res.data.items.map(({ item }) => item));
      setTotal(res.data.count);
    } catch (err) {
      console.error("전체 공고 조회 실패", err);
    } finally {
      setIsLoading(false);
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
    fetchNotices();
    if (isLoggedIn && address) {
      fetchCustomNotices();
    }
  }, [page, selectedSort, isLoggedIn, address]);

  return {
    isLoading,
    customNotices,
    notices,
    total,
    refetch: fetchNotices,
  };
}
