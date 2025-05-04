import useShopApplications from "../hooks/useShopApplications";

import NoticeApplicationTable from "./NoticeApplicationTable";

interface NoticeApplicationTableContainerProps {
  shopId: string;
  noticeId: string;
}

function NoticeApplicationTableContainer({
  shopId,
  noticeId,
}: NoticeApplicationTableContainerProps) {
  const {
    refetch: refetchShopApplications,
    shopApplications,
    totalCount,
  } = useShopApplications({
    shopId,
    noticeId,
  });

  return (
    <NoticeApplicationTable
      data={shopApplications}
      totalCount={totalCount}
      refetch={refetchShopApplications}
    />
  );
}

export default NoticeApplicationTableContainer;
