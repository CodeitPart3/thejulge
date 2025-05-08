import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { getShopApplications } from "@/apis/services/applicationService";
import { ApplicationItem } from "@/types/application";
import { UserType } from "@/types/user";

interface UseShopApplicationsParams {
  type?: UserType;
  shopId: string;
  noticeId: string;
  offset?: number;
  limit?: number;
}

const useShopApplications = ({
  type,
  shopId,
  noticeId,
  offset = 5,
  limit = 5,
}: UseShopApplicationsParams) => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [shopApplications, setShopApplications] = useState<ApplicationItem[]>(
    [],
  );
  const page = Number(searchParams.get("page")) || 1;

  const fetchShopApplication = async () => {
    setIsLoading(true);
    const fetchedShopApplications = await getShopApplications(
      shopId,
      noticeId,
      (page - 1) * offset,
      limit,
    );

    const nextShopApplications = fetchedShopApplications.data.items.map(
      ({ item }) => item,
    );

    setTotalCount(fetchedShopApplications.data.count);
    setShopApplications(nextShopApplications);
    setIsLoading(false);
  };

  useEffect(() => {
    if (type === "employer") {
      fetchShopApplication();
    }
  }, [type, shopId, noticeId, offset, limit, page]);

  return {
    refetch: fetchShopApplication,
    shopApplications,
    isLoading,
    totalCount,
  };
};

export default useShopApplications;
