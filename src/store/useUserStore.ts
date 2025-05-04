import { create } from "zustand";

export interface UserState {
  isLoggedIn: boolean;
  address: string;
  setIsLoggedIn: (value: boolean) => void;
  setAddress: (value: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  address: "",
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setAddress: (value) => set({ address: value }),
}));
