import { DependencyList, useCallback, useEffect, useState } from "react";

import { NoticeItem } from "../types";

import { getNotice } from "@/apis/services/noticeService";

interface UseNoticeInfoParams {
  shopId: string;
  noticeId: string;
  deps?: DependencyList;
}

function useNoticeInfo({ shopId, noticeId, deps }: UseNoticeInfoParams) {
  const dependencies = deps ?? [];
  const [isLoading, setIsLoading] = useState(false);
  const [noticeInfo, setNoticeInfo] = useState<NoticeItem>();

  const fetchNoticeInfo = useCallback(async () => {
    setIsLoading(true);
    const result = await getNotice(shopId, noticeId);

    if (result.status === 200) {
      setNoticeInfo(result.data.item);
    }

    setIsLoading(false);
  }, [shopId, noticeId, ...dependencies]);

  useEffect(() => {
    fetchNoticeInfo();
  }, [shopId, noticeId, ...dependencies]);

  return { isLoading, noticeInfo };
}

export default useNoticeInfo;
