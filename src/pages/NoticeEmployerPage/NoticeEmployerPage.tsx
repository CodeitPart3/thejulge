import { useLoaderData, useParams } from "react-router-dom";

import NoticeDetailInfo from "../../components/NoticeDetailInfo/NoticeDetailInfo";

import NoticeApplicationTableContainer from "./components/NoticeApplicationTableContainer";

import PostList, { PostData } from "@/components/Post/PostList";
import useUpdateRecentNotices from "@/hooks/useUpdateRecentNotices";
import { useUserStore } from "@/hooks/useUserStore";
import { NoticeItem } from "@/types/notice";

export default function NoticeEmployerPage() {
  const { noticeInfo, recentNotices } = useLoaderData<{
    noticeInfo: NoticeItem;
    recentNotices: PostData[];
  }>();
  const { shopId, noticeId } = useParams() as {
    shopId: string;
    noticeId: string;
  };
  const { user } = useUserStore();

  const isMyShop = user?.shopId === shopId;

  useUpdateRecentNotices({
    noticeInfo,
    link: `/notice/${shopId}/${noticeId}/employer`,
  });

  return (
    <>
      <section>
        <div className="flex flex-col gap-3 sm:gap-6 lg:w-[64rem] mx-auto px-3 sm:px-8 py-10 sm:py-[3.75rem]">
          <NoticeDetailInfo
            shopId={shopId}
            noticeId={noticeId}
            noticeInfo={noticeInfo}
            user={user}
            isEmployerPage
          />
        </div>
      </section>

      <section className="bg-gray-5">
        <div className="flex flex-col gap-8 lg:w-[64rem] mx-auto px-3 sm:px-8 py-10 sm:py-15">
          <h2 className="text-[1.625rem] font-bold">
            {isMyShop ? "신청자 목록" : "최근에 본 공고"}
          </h2>
          {isMyShop && (
            <NoticeApplicationTableContainer
              shopId={shopId}
              noticeId={noticeId}
            />
          )}

          {!isMyShop &&
            (recentNotices.length > 0 ? (
              <PostList posts={recentNotices} />
            ) : (
              <div className="flex items-center justify-center w-full h-[20rem] text-black">
                최근에 본 공고가 없습니다.
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
