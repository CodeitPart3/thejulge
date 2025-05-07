import { useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import useNoticeList from "../../hooks/useNoticeList";

import CustomNoticeSection from "./CustomNoticeSection";

import NoticeSearchResultHeader from "@/components/NoticeSearchResultHeader";
import PageNation from "@/components/Pagination";
import PostList, { PostData } from "@/components/Post/PostList";
import { useUserStore } from "@/hooks/useUserStore";
import type { SortKey } from "@/types/notice";

export default function NoticeListPage() {
  const { user } = useUserStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const [selectedSort, setSelectedSort] = useState<SortKey>("time");

  const { isLoading, refetch, notices, total, customNotices } = useNoticeList(
    page,
    selectedSort,
  );

  const posts: PostData[] = useMemo(() => {
    return notices.map((notice) => {
      const shop = notice.shop?.item;
      return {
        id: notice.id,
        name: shop?.name ?? "",
        imageUrl: shop?.imageUrl ?? "",
        address1: shop?.address1 ?? "",
        description: shop?.description ?? "",
        originalHourlyPay: shop?.originalHourlyPay ?? 0,
        hourlyPay: notice.hourlyPay,
        startsAt: notice.startsAt,
        workhour: notice.workhour,
        closed: notice.closed,
        link: `/notice/${shop?.id}/${notice.id}/${
          user?.type === "employer" ? "employer" : "employee"
        }`,
      };
    });
  }, [notices, user?.type]);

  const handleSortChange = (value: string) => {
    setSelectedSort(value as SortKey);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const refetchFilteredNotices = () => {
    refetch();
  };

  return (
    <section className="w-full">
      {user?.type && customNotices.length > 0 && (
        <CustomNoticeSection customNotices={customNotices} />
      )}
      <div className="w-full mx-auto lg:max-w-[60.25rem] pt-12 px-8 pb-0">
        <NoticeSearchResultHeader
          page={page}
          selectedSort={selectedSort}
          onChangeSort={handleSortChange}
          refetch={refetchFilteredNotices}
        />

        <div className="min-h-[33.5rem] sm:min-h-[48.75rem] ">
          {isLoading && (
            <p className="text-center text-gray-400 pt-40 sm:pt-60">
              공고 불러오는 중
            </p>
          )}
          {!isLoading &&
            (posts.length > 0 ? (
              <PostList posts={posts} />
            ) : (
              <p className="text-center text-gray-400 pt-40 sm:pt-60">
                조건에 맞는 공고가 없어요.
              </p>
            ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 pb-[4rem]">
        <PageNation count={total} itemCountPerPage={7} />
      </div>
    </section>
  );
}
