import { create } from "zustand";

export type User = {
  id: string;
  email: string;
  type: "employer" | "employee";
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  shopId?: string;
};

interface UserState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  setUserAndToken: (user: User, token: string) => void;
  updateShopId: (shopId: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  setUserAndToken: (user, token) =>
    set(() => ({
      user,
      token,
      isLoggedIn: true,
    })),

  updateShopId: (shopId) => {
    const current = get();
    if (!current.user || !current.token) return;

    const updatedUser = {
      ...current.user,
      shopId,
    };

    set({
      user: updatedUser,
    });
  },

  clearUser: () =>
    set(() => ({
      user: null,
      token: null,
      isLoggedIn: false,
    })),
}));
