import { useEffect, useMemo, useRef, useState } from "react";

import { useLocation, useSearchParams } from "react-router-dom";

import Button from "@/components/Button";
import FilterDropdownContent from "@/components/Dropdown/FilterDropdownContent";
import Select from "@/components/Select";
import useOutsideClick from "@/hooks/useOutsideClick";
import useRemoveTopPageScroll from "@/hooks/useRemoveTopPageScroll";
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
  keyword,
  selectedSort,
  onChangeSort,
  refetch,
}: TotalNoticeSectionProps) {
  const { pathname } = useLocation();

  const [, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const {
    pathname: filterPathname,
    minPay,
    selectedAreas,
    startDate,
    reset,
  } = useFilterStore();

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

  useRemoveTopPageScroll({
    observeDevices: ["mobile"],
    condition: showFilter,
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

  useEffect(() => {
    if (pathname !== filterPathname) {
      reset();
    }
  }, [pathname, filterPathname, reset]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 ">
        <h2 className="font-bold text-[1.25rem] sm:text-[1.75rem] lg:text-[1.75rem] text-black">
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
                  "border border-gray-20 shadow-xl sm:rounded-[0.625rem] overflow-hidden",
                )}
              >
                <FilterDropdownContent
                  refetch={refetch}
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
