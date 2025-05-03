import { useLoaderData, useParams } from "react-router-dom";

import NoticeDetailInfo from "./components/NoticeDetailInfo";

import PostList from "@/components/Post/PostList";

export default function NoticeEmployeePage() {
  const { noticeInfo, recentNotices } = useLoaderData();
  const { shopId, noticeId } = useParams() as {
    shopId: string;
    noticeId: string;
  };

  return (
    <>
      <section>
        <div className="flex flex-col gap-3 md:gap-6 xl:w-[60.25rem] mx-auto px-3 md:px-8 py-10 md:py-[3.75rem]">
          <NoticeDetailInfo
            shopId={shopId}
            noticeId={noticeId}
            noticeInfo={noticeInfo}
          />
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-8 xl:w-[60.25rem] mx-auto mb-[3.75rem] px-3 md:px-8 py-10 md:py-[3.75rem]">
          <h2 className="text-[1.625rem] font-bold">최근에 본 공고</h2>
          <PostList posts={recentNotices} />
        </div>
      </section>
    </>
  );
}
