import { create } from "zustand";

interface ToastItem {
  id: number;
  label: string;
  isVisible: boolean;
}

interface ToastState {
  toasts: ToastItem[];
  showToast: (label: string) => Promise<void>;
  removeToast: (id: number) => void;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  showToast: async (label) => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, label, isVisible: true }],
    }));

    await delay(1000);
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, isVisible: false } : toast,
      ),
    }));

    await delay(500);
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
