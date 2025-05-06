// 현재 리스트 공고 페이지가 PR이 올라간 상태여서 TotalNoticeSection 파일을 수정하기 어려움.
// 그래서 임시로 복사본 만들어서 작업 진행 중.
// import { Dispatch, SetStateAction } from "react";

import { useMemo, useRef, useState } from "react";

import { useSearchParams } from "react-router-dom";

import Button from "@/components/Button";
import FilterDropdownContent from "@/components/Dropdown/FilterDropdownContent";
import Select from "@/components/Select";
import useOutsideClick from "@/hooks/useOutsideClick";
import { SORT_OPTIONS } from "@/pages/NoticeSearchPage/constantsCopy";
import { useFilterStore } from "@/store/useFilterStore";
import type { SortKey } from "@/types/notice";
import { cn } from "@/utils/cn";

interface TotalNoticeSectionProps {
  page: number;
  keyword?: string;
  selectedSort: SortKey;
  refetch: () => void;
  onChangeSort: (value: SortKey) => void;
}

export default function NoticeSearchResultHeader({
  keyword = "전체 공고",
  selectedSort,
  onChangeSort,
  refetch,
}: TotalNoticeSectionProps) {
  const [, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const { minPay, selectedAreas, startDate } = useFilterStore();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const totalFilterCount = useMemo(() => {
    const areaCount = selectedAreas.length;
    const payCount = minPay !== null && minPay !== "0" ? 1 : 0;
    const startDateCount = startDate !== null ? 1 : 0;
    return areaCount + payCount + startDateCount;
  }, [minPay, startDate, selectedAreas]);

  useOutsideClick({
    refs: [buttonRef, wrapperRef],
    callback: () => setShowFilter(false),
  });

  const handleSortChange = (value: string) => {
    onChangeSort(value as SortKey);
  };

  const toggleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const clickFilterConfirmHandler = () => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.set("page", "1");
      return nextParams;
    });
    refetch();
    setShowFilter(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <h2 className="font-bold text-[1.25rem] md:text-[1.75rem] text-black ">
          {keyword ? (
            <>
              <span className="text-primary">{keyword}</span>에 대한 공고 목록
            </>
          ) : (
            "전체 공고"
          )}
        </h2>
        <div className="flex gap-[0.625rem]">
          <Select
            size="sm"
            options={SORT_OPTIONS}
            value={selectedSort}
            onValueChange={handleSortChange}
          />
          <div className="relative">
            <Button
              ref={buttonRef}
              className="p-[0.8125rem] bg-red-30 font-normal"
              onClick={toggleShowFilter}
            >
              상세 필터{totalFilterCount > 0 && `(${totalFilterCount})`}
            </Button>
            {showFilter && (
              <div
                ref={wrapperRef}
                className={cn(
                  "fixed inset-0 sm:inset-auto sm:absolute sm:top-12 sm:right-0 z-10 bg-white",
                  "border border-gray-20 shadow-xl rounded-[0.625rem] overflow-hidden",
                )}
              >
                <FilterDropdownContent
                  onClickApplyButton={clickFilterConfirmHandler}
                  onClose={toggleShowFilter}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
