// 현재 리스트 공고 페이지가 PR이 올라간 상태여서 TotalNoticeSection 파일을 수정하기 어려움.
// 그래서 임시로 복사본 만들어서 작업 진행 중.
// import { Dispatch, SetStateAction } from "react";

import Button from "@/components/Button";
import PostList from "@/components/Post/PostList";
import type { PostData } from "@/components/Post/PostList";
import Select from "@/components/Select";
import { SORT_OPTIONS } from "@/pages/NoticeSearchPage/constantsCopy";
import type { SortKey } from "@/types/notice";

interface TotalNoticeSectionProps {
  title?: string;
  notices: PostData[];
  selectedSort: SortKey;

  onChangeSort: (value: SortKey) => void;
  page: number;
}

export default function TotalNoticeSectionCopy({
  title = "전체 공고",
  notices,
  selectedSort,
  onChangeSort,
}: TotalNoticeSectionProps) {
  const handleSortChange = (value: string) => {
    onChangeSort(value as SortKey);
  };

  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-[1.25rem] md:text-[1.75rem] tracking-[-0.02em] mb-4 text-black p-4 pl-0">
          {title ? (
            <>
              <span className="text-[#FF5A5A]">{title}</span>에 대한 공고 목록
            </>
          ) : (
            "전체 공고"
          )}
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

      <PostList posts={notices} />
    </section>
  );
}
