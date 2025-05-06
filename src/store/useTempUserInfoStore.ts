import { create } from "zustand";

interface TempUserInfoState {
  address: string;
  setAddress: (address: string) => void;
}

export const useTempUserInfoStore = create<TempUserInfoState>((set) => ({
  address: "",
  setAddress: (address) => set({ address }),
}));
