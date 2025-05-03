import { Navigate, useLoaderData, useParams } from "react-router-dom";

import NoticeDetailInfo from "../../components/NoticeDetailInfo";

import NoticeApplicationTable from "./components/NoticeApplicationTable";
import useShopApplications from "./hooks/useShopApplications";

import { useUserStore } from "@/hooks/useUserStore";
import { NoticeItem } from "@/types/notice";

const PAGE_LIMIT = 7;

export default function NoticeEmployerPage() {
  const { noticeInfo } = useLoaderData<{
    noticeInfo: NoticeItem;
  }>();
  const { shopId, noticeId } = useParams() as {
    shopId: string;
    noticeId: string;
  };
  const {
    refetch: refetchShopApplications,
    shopApplications,
    totalCount,
  } = useShopApplications({
    shopId,
    noticeId,
  });
  const { user } = useUserStore();

  if (user?.type !== "employer") {
    return <Navigate to={`/notice/${shopId}/${noticeId}/employee`} />;
  }

  return (
    <>
      <section>
        <div className="flex flex-col gap-3 md:gap-6 xl:w-[60.25rem] mx-auto px-3 md:px-8 py-10 md:py-[3.75rem]">
          <NoticeDetailInfo
            shopId={shopId}
            noticeId={noticeId}
            noticeInfo={noticeInfo}
            user={user}
          />
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-8 xl:w-[60.25rem] mx-auto mb-[3.75rem] px-3 md:px-8 py-10 md:py-[3.75rem]">
          <h2 className="text-[1.625rem] font-bold">신청자 목록</h2>
          <NoticeApplicationTable
            data={shopApplications}
            totalCount={totalCount}
            pageLimit={PAGE_LIMIT}
            refetch={refetchShopApplications}
          />
        </div>
      </section>
    </>
  );
}
