import { useCallback, useEffect, useRef, useState } from "react";

import { getAlerts } from "@/apis/services/alertService";
import { AlertItem } from "@/types/alert";

interface UseAlarmParams {
  userId: string;
  offset?: number;
  limit?: number;
}

const useAlarm = ({ userId, offset = 10, limit = 10 }: UseAlarmParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [hasNext, setHasNext] = useState(false);

  const pageRef = useRef(1);

  const fetchAlerts = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedAlerts = await getAlerts(
        userId,
        (pageRef.current - 1) * offset,
        limit,
      );
      const nextAlerts = fetchedAlerts.data.items.map(({ item }) => item);

      setAlerts((prev) => [...prev, ...nextAlerts]);
      setHasNext(fetchedAlerts.data.hasNext);
      setTotalCount(fetchedAlerts.data.count);

      if (fetchedAlerts.data.hasNext) {
        pageRef.current += 1;
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId, offset, limit]);

  useEffect(() => {
    fetchAlerts();
  }, [userId, fetchAlerts]);

  return {
    refetch: fetchAlerts,
    hasNext,
    alerts,
    isLoading,
    totalCount,
  };
};

export default useAlarm;
