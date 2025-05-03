import { useLoaderData, useParams } from "react-router-dom";

import NoticeDetailInfo from "../../components/NoticeDetailInfo";

export default function NoticeEmployerPage() {
  const { noticeInfo } = useLoaderData();
  const { shopId, noticeId } = useParams() as {
    shopId: string;
    noticeId: string;
  };

  return (
    <>
      <section>
        <div className="flex flex-col gap-3 md:gap-6 xl:w-[60.25rem] mx-auto px-3 md:px-8 py-10 md:py-[3.75rem]">
          <NoticeDetailInfo
            type={"employer"}
            shopId={shopId}
            noticeId={noticeId}
            noticeInfo={noticeInfo}
          />
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-8 xl:w-[60.25rem] mx-auto mb-[3.75rem] px-3 md:px-8 py-10 md:py-[3.75rem]">
          <h2 className="text-[1.625rem] font-bold">신청자 목록</h2>
        </div>
      </section>
    </>
  );
}
