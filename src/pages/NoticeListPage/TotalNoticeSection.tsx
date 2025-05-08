import { Dispatch, SetStateAction } from "react";

import { SORT_OPTIONS } from "../NoticeListPage/constants";

import Button from "@/components/Button";
import PostList from "@/components/Post/PostList";
import type { PostData } from "@/components/Post/PostList";
import Select from "@/components/Select";
import type { SortKey } from "@/types/notice";

interface TotalNoticeSectionProps {
  posts: PostData[];
  total: number;
  selectedSort: SortKey;
  setSelectedSort: Dispatch<SetStateAction<SortKey>>;
  page: number;
}

export default function TotalNoticeSection({
  posts,
  selectedSort,
  setSelectedSort,
}: TotalNoticeSectionProps) {
  const handleSortChange = (value: string) => {
    setSelectedSort(value as SortKey);
  };

  return (
    <section className="mt-10 lg:w-[60.25rem] sm:w-[42.375rem] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-[1.25rem] sm:text-[1.75rem] tracking-[-0.02em]  text-black p-4 pl-0">
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

      <PostList posts={posts} />
    </section>
  );
}
