import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { getUserApplications } from "@/apis/services/applicationService";
import { UserApplicationList } from "@/types/application";

interface UseUserApplicationsParams {
  offset?: number;
  limit?: number;
}

const useUserApplications = (params?: UseUserApplicationsParams) => {
  const { offset = 5, limit = 7 } = params ?? {};

  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [userApplications, setUserApplications] = useState<
    UserApplicationList[]
  >([]);
  const page = Number(searchParams.get("page")) || 1;

  const fetchUserApplication = async () => {
    setIsLoading(true);
    const userApplications = await getUserApplications(
      "42859259-b879-408c-8edd-bbaa3a79c674",
      (page - 1) * offset,
      limit,
    );

    const nextUserApplications = userApplications.data.items.map(
      ({ item }) => item,
    );

    setTotalCount(userApplications.data.count);
    setUserApplications(nextUserApplications);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserApplication();
  }, [page]);

  return { userApplications, isLoading, totalCount };
};

export default useUserApplications;
