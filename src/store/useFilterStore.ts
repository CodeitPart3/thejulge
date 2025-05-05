import { create } from "zustand";

interface FilterState {
  selectedAreas: string[];
  startDate: string | null;
  minPay: number | null;
  setAreas: (areas: string[]) => void;
  setStartDate: (date: string) => void;
  setMinPay: (pay: number | null) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedAreas: [],
  startDate: null,
  minPay: null,

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
