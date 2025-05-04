import { useEffect, useRef, useState } from "react";

import { getAlerts } from "@/apis/services/alertService";
import { AlertItem } from "@/types/alert";

interface UseAlarmParams {
  userId: string;
  offset?: number;
  limit?: number;
}

const useAlarm = ({ userId, offset = 5, limit = 5 }: UseAlarmParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [hasNext, setHasNext] = useState(false);

  const hasFetched = useRef(false);
  const pageRef = useRef(1);

  const fetchAlerts = async () => {
    setIsLoading(true);

    try {
      const fetchedAlerts = await getAlerts(
        userId,
        (pageRef.current - 1) * offset,
        limit,
      );
      const nextAlerts = fetchedAlerts.data.items.map(({ item }) => item);

      console.log(fetchedAlerts);
      setAlerts((prev) => [...prev, ...nextAlerts]);
      setHasNext(fetchedAlerts.data.hasNext);
      setTotalCount(fetchedAlerts.data.count);

      if (fetchedAlerts.data.hasNext) {
        pageRef.current += 1;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchAlerts();
  }, [userId, offset, limit]);

  return {
    refetch: fetchAlerts,
    hasNext,
    alerts,
    isLoading,
    totalCount,
  };
};

export default useAlarm;
