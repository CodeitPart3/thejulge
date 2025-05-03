import { useLoaderData, useParams } from "react-router-dom";

import NoticeDetailInfo from "../../components/NoticeDetailInfo";

import NoticeApplicationTableContainer from "./components/NoticeApplicationTableContainer";

import PostList, { PostData } from "@/components/Post/PostList";
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

  return (
    <>
      <section>
        <div className="flex flex-col gap-3 md:gap-6 xl:w-[60.25rem] mx-auto px-3 md:px-8 py-10 md:py-[3.75rem]">
          <NoticeDetailInfo
            shopId={shopId}
            noticeId={noticeId}
            noticeInfo={noticeInfo}
            user={user}
            isEmployerPage
          />
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-8 xl:w-[60.25rem] mx-auto mb-[3.75rem] px-3 md:px-8 py-10 md:py-[3.75rem]">
          <h2 className="text-[1.625rem] font-bold">
            {isMyShop ? "신청자 목록" : "최근에 본 공고"}
          </h2>
          {isMyShop ? (
            <NoticeApplicationTableContainer
              shopId={shopId}
              noticeId={noticeId}
            />
          ) : (
            <PostList posts={recentNotices} />
          )}
        </div>
      </section>
    </>
  );
}
