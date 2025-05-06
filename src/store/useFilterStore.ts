import { create } from "zustand";

import { getUTCDateFromLocaleTime } from "@/utils/datetime";
import { extractDigits } from "@/utils/number";

interface FilterState {
  selectedAreas: string[];
  startDate: Date | null;
  minPay: string | null;
  getFilters: () => {
    address?: string[] | null;
    hourlyPayGte?: number;
    startsAtGte?: string;
  };
  setAreas: (areas: string[]) => void;
  setStartDate: (date: Date | null) => void;
  setMinPay: (pay: string | null) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  selectedAreas: [],
  startDate: null,
  minPay: null,

  getFilters: () => {
    const { selectedAreas, startDate, minPay } = get();
    const formattedDate = startDate
      ? getUTCDateFromLocaleTime(startDate)
      : undefined;
    const formattedMinPay = minPay ? Number(extractDigits(minPay)) : undefined;
    const formattedAreas =
      selectedAreas?.length === 0 || selectedAreas === null
        ? undefined
        : selectedAreas;

    return {
      address: formattedAreas,
      hourlyPayGte: formattedMinPay,
      startsAtGte: formattedDate,
    };
  },
  setAreas: (areas) => set({ selectedAreas: areas }),
  setStartDate: (date) => set({ startDate: date }),
  setMinPay: (pay) => set({ minPay: pay }),

  reset: () =>
    set({
      selectedAreas: [],
      startDate: null,
      minPay: null,
    }),
}));
