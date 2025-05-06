import { ChangeEvent, useMemo, useState } from "react";

import DatePicker from "react-datepicker";

import TextField from "../TextField";

import { Close, TagClose } from "@/assets/icon";
import Button from "@/components/Button";
import { useFilterStore } from "@/store/useFilterStore";
import { SeoulDistricts } from "@/types/common";
import { extractDigits, numberCommaFormatter } from "@/utils/number";

import "react-datepicker/dist/react-datepicker.css";

interface FilterDropdownContentProps {
  onClickApplyButton: () => void;
  onClose: () => void;
}

function FilterDropdownContent({
  onClose,
  onClickApplyButton,
}: FilterDropdownContentProps) {
  const {
    selectedAreas,
    startDate,
    minPay,
    setAreas,
    setStartDate,
    setMinPay,
    reset,
  } = useFilterStore();
  const [payFilter, setPayFilter] = useState(minPay);
  const [startDateFilter, setStartDateFilter] = useState(startDate);
  const [areasFilter, setAreasFilter] = useState<string[]>(selectedAreas);

  const sortedSeoulStricts = useMemo(
    () => [...SeoulDistricts].sort((a, b) => a.localeCompare(b)),
    [],
  );

  const toggleArea = (area: string) => {
    setAreasFilter((prev) =>
      prev?.includes(area)
        ? prev.filter((existedArea) => existedArea !== area)
        : [...(prev ?? []), area],
    );
  };

  const removeArea = (area: string) => {
    setAreasFilter((prev) => prev.filter((a) => a !== area));
  };

  const onSelectStartDate = (date: Date | null) => {
    setStartDateFilter(date);
  };

  const changePay = (e: ChangeEvent<HTMLInputElement>) => {
    const transformedNumber = extractDigits(e.target.value);
    const commaFormattedNumber = numberCommaFormatter(
      Number(transformedNumber),
    );
    setPayFilter(commaFormattedNumber);
  };

  const applyButtonHandler = () => {
    setMinPay(payFilter);
    setStartDate(startDateFilter);
    setAreas(areasFilter);
    onClickApplyButton();
  };

  const resetFilters = () => {
    reset();
    setPayFilter(null);
    setStartDateFilter(null);
    setAreasFilter([]);
  };

  return (
    <div className="flex flex-col w-full h-full sm:w-[24.375rem] text-black text-sm relative">
      <div className="pt-6 pb-20 sm:pt-6 px-5 overflow-y-auto">
        <div className="pb-6 flex justify-between items-center">
          <span className="text-xl font-bold">상세 필터</span>
          <button onClick={onClose} className="cursor-pointer">
            <Close />
          </button>
        </div>

        <div>
          <span className="inline-block text-base font-normal mb-2">위치</span>
          <div className="grid grid-cols-2 gap-2 h-[16.125rem] overflow-y-auto border border-gray-200 rounded-md p-2">
            {sortedSeoulStricts.map((area) => (
              <button
                key={area}
                onClick={() => toggleArea(area)}
                className={`px-2 py-1 rounded-md text-sm whitespace-nowrap cursor-pointer ${
                  areasFilter?.includes(area)
                    ? "bg-red-30 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          {areasFilter && areasFilter.length > 0 && (
            <div className="flex flex-wrap gap-[0.25rem] mt-4">
              {areasFilter.map((area) => (
                <span
                  key={area}
                  className="flex items-center justify-between gap-1.5 px-[0.625rem] py-[0.375rem] bg-red-10 text-primary text-[0.875rem] font-bold rounded-full"
                >
                  {area}
                  <button
                    className="cursor-pointer"
                    onClick={() => removeArea(area)}
                  >
                    <TagClose className="w-4 h-4 fill-primary" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="h-0.5 bg-gray-100 my-6" />

        <div>
          <div className="flex flex-col">
            <span className="inline-block text-base mb-2 leading-[1.625rem]">
              시작일
            </span>
            <DatePicker
              selected={startDateFilter}
              onChange={(date) => onSelectStartDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="선택"
              className="w-full border border-gray-30 focus-within:border-blue-20 rounded-[0.375rem] py-4 px-5 text-[1rem]"
            />
          </div>
        </div>

        <div className="h-0.5 bg-gray-100 my-6" />

        <div className="mb-10">
          <span className="inline-block text-base font-normal mb-2">금액</span>
          <div className="flex items-center gap-3">
            <div className="relative">
              <TextField.Input
                wrapperClassName="w-[10.625rem]"
                className="w-full"
                value={payFilter ?? ""}
                onChange={changePay}
                placeholder="입력"
                postfix={<span>원</span>}
              />
            </div>
            <span className="text-base text-black">이상부터</span>
          </div>
        </div>
      </div>

      <div className="absolute sm:static bottom-0 w-full flex justify-between gap-2 p-4 sm:pt-0 bg-white border-t-[1px] border-t-gray-20 sm:border-none">
        <Button
          onClick={resetFilters}
          variant="white"
          textSize="lg"
          className="py-3.5 px-[1.125rem]"
        >
          초기화
        </Button>
        <Button onClick={applyButtonHandler} textSize="lg" className="flex-1">
          적용하기
        </Button>
      </div>
    </div>
  );
}

export default FilterDropdownContent;
