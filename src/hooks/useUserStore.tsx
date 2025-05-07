import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  updateUser: (partial: Partial<User>) => void;
  setUserAndToken: (user: User, token: string) => void;
  updateShopId: (shopId: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      updateUser: (partial) => {
        const current = get();
        if (!current.user) return;
        set({
          user: { ...current.user, ...partial },
        });
      },

      setUserAndToken: (user, token) =>
        set({
          user,
          token,
          isLoggedIn: true,
        }),

      updateShopId: (shopId) => {
        const current = get();
        if (!current.user || !current.token) return;

        set({
          user: {
            ...current.user,
            shopId,
          },
        });
      },

      clearUser: () =>
        set({
          user: null,
          token: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
