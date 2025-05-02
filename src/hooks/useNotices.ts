import { DependencyList, useCallback, useEffect, useState } from "react";

import {
  GetNoticesParams,
  NoticeListResponseWithoutUserApplication,
} from "../types";

import { getNotices } from "@/apis/services/noticeService";

interface UseNoticesParams<T> {
  deps?: DependencyList;
  params?: GetNoticesParams;
  dataFormatCallback: (params: NoticeListResponseWithoutUserApplication) => T[];
}

function useNotices<T>({
  deps,
  params,
  dataFormatCallback,
}: UseNoticesParams<T>) {
  const dependencies = deps ?? [];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notices, setNotices] = useState<T[]>([]);

  const fetchNotices = useCallback(async () => {
    setIsLoading(true);
    const { data, status } = await getNotices(params);

    if (status === 200) {
      const nextNotices = dataFormatCallback(data);
      setNotices(nextNotices);
    }

    setIsLoading(false);
  }, [...dependencies]);

  useEffect(() => {
    fetchNotices();
  }, [...dependencies]);

  return { fetchNotices, isLoading, notices };
}

export default useNotices;
