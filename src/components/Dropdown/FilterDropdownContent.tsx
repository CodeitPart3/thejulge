import Button from "@/components/Button";
import { useFilterStore } from "@/store/useFilterStore";
import { SeoulDistricts } from "@/types/common";

function FilterDropdownContent({ onClose }: { onClose: () => void }) {
  const {
    selectedAreas,
    startDate,
    minPay,
    setAreas,
    setStartDate,
    setMinPay,
    reset,
  } = useFilterStore();

  const toggleArea = (area: string) => {
    const updated = selectedAreas.includes(area)
      ? selectedAreas.filter((a) => a !== area)
      : [...selectedAreas, area];
    setAreas(updated);
  };

  return (
    <div className="flex flex-col text-black text-sm h-full relative pb-[4.5rem]">
      <div className="pb-4 flex justify-between items-center">
        <span className="text-xl font-bold">상세 필터</span>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="">
        <p className="text-base font-normal mb-2">위치</p>
        <div className="grid grid-cols-2 gap-2 h-[16.125rem] overflow-y-auto border border-gray-200 rounded-md p-2">
          {SeoulDistricts.map((area) => (
            <button
              key={area}
              onClick={() => toggleArea(area)}
              className={`px-2 py-1 rounded-md text-sm whitespace-nowrap ${
                selectedAreas.includes(area)
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {area}
            </button>
          ))}
        </div>

        {selectedAreas.length > 0 && (
          <div className="flex flex-wrap gap-[0.25rem] mt-4">
            {selectedAreas.map((area) => (
              <span
                key={area}
                className="w-[7.5rem] h-[1.875rem] px-[0.625rem] py-[0.375rem] bg-red-10 text-primary text-[0.875rem] font-bold rounded-[1.25rem] flex items-center justify-between"
              >
                {area}
                <button
                  className="ml-1"
                  onClick={() =>
                    setAreas(selectedAreas.filter((a) => a !== area))
                  }
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="h-[0.125rem] bg-gray-100 my-6" />

      <div className="">
        <p className="text-base font-normal mb-2">시작일</p>
        <input
          type="date"
          value={startDate ?? ""}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full h-[3.625rem] border border-gray-300 rounded-md px-4 text-base text-black placeholder:text-gray-400 bg-white"
          placeholder="입력"
        />
      </div>

      <div className="h-[0.125rem] bg-gray-100 my-6" />

      <div className="">
        <p className="text-base font-normal mb-2">금액</p>
        <div className="flex items-center gap-2 w-[15rem]">
          <div className="relative">
            <input
              type="text"
              value={minPay ?? ""}
              onChange={(e) => setMinPay(Number(e.target.value))}
              className="w-[10.5rem] h-[3.625rem] border border-gray-300 rounded-md px-4 pr-[2.5rem] text-base text-black placeholder:text-gray-400"
              placeholder="입력"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base text-black">
              원
            </span>
          </div>
          <span className="text-base text-black">이상부터</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 flex justify-between">
        <Button
          onClick={reset}
          variant="white"
          textSize="lg"
          className="w-[5.125rem] h-[3rem]"
        >
          초기화
        </Button>
        <Button
          onClick={onClose}
          textSize="lg"
          className="w-[16.25rem] h-[3rem]"
        >
          적용하기
        </Button>
      </div>
    </div>
  );
}

export default FilterDropdownContent;
