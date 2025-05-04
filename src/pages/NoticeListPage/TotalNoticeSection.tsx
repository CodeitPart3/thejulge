import { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";

import { SORT_OPTIONS } from "../NoticeListPage/constants";

import Button from "@/components/Button";
import PostList from "@/components/Post/PostList";
import type { PostData } from "@/components/Post/PostList";
import Select from "@/components/Select";
import type { NoticeWithoutUserApplication, SortKey } from "@/types/notice";

interface TotalNoticeSectionProps {
  notices: NoticeWithoutUserApplication[];
  total: number;
  selectedSort: SortKey;
  setSelectedSort: Dispatch<SetStateAction<SortKey>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function TotalNoticeSection({
  notices,
  selectedSort,
  setSelectedSort,
  setPage,
}: TotalNoticeSectionProps) {
  const handleSortChange = (value: string) => {
    setSelectedSort(value as SortKey);
    setPage(1);
  };

  const posts: PostData[] = useMemo(
    () =>
      notices.map((notice) => {
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
          link: `/notices/${notice.id}`,
        };
      }),
    [notices],
  );

  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-[1.25rem] md:text-[1.75rem] tracking-[-0.02em] mb-4 text-black p-4 pl-0">
          전체 공고
        </h2>
        <div className="flex px-4 pr-0 gap-[0.625rem]">
          <Select
            options={SORT_OPTIONS}
            value={selectedSort}
            onValueChange={handleSortChange}
            size="sm"
          />
          <Button className="w-[5rem] bg-[#FF8D72] font-normal">
            상세 필터
          </Button>
        </div>
      </div>

      <section>
        <PostList posts={posts} />
      </section>
    </section>
  );
}
