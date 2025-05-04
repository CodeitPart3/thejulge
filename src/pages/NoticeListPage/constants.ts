import type { SortKey } from "@/types/notice";

export const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "마감임박순", value: "time" },
  { label: "시급많은순", value: "pay" },
  { label: "시간적은순", value: "hour" },
  { label: "가나다순", value: "shop" },
];

export const ITEM_COUNT_PER_PAGE = 6;
export const CUSTOM_NOTICE_LIMIT = 3;

export const SLIDER_BREAKPOINTS = {
  "(min-width: 1024px)": {
    slides: { perView: 3, spacing: 24 },
  },
  "(min-width: 640px)": {
    slides: { perView: 2, spacing: 16 },
  },
  "(max-width: 639px)": {
    slides: { perView: 1.2, spacing: 12 },
  },
};
