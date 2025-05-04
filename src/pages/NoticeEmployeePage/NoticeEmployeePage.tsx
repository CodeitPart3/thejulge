import { useLoaderData, useParams } from "react-router-dom";

import NoticeDetailInfo from "../../components/NoticeDetailInfo/NoticeDetailInfo";

import PostList, { PostData } from "@/components/Post/PostList";
import useUpdateRecentNotices from "@/hooks/useUpdateRecentNotices";
import { NoticeItem } from "@/types/notice";

export default function NoticeEmployeePage() {
  const { noticeInfo, recentNotices } = useLoaderData<{
    noticeInfo: NoticeItem;
    recentNotices: PostData[];
  }>();
  const { shopId, noticeId } = useParams() as {
    shopId: string;
    noticeId: string;
  };

  useUpdateRecentNotices({
    noticeInfo,
    link: `/notice/${shopId}/${noticeId}/employee`,
  });

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

          {recentNotices.length > 0 ? (
            <PostList posts={recentNotices} />
          ) : (
            <div className="flex items-center justify-center w-full h-[20rem] text-black">
              최근에 본 공고가 없습니다.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
