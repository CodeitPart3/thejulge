import { create } from "zustand";

interface ToastItem {
  id: number;
  label: string;
  isVisible: boolean;
}

interface ToastState {
  toasts: ToastItem[];
  showToast: (label: string) => void;
  removeToast: (id: number) => void;
}

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  showToast: (label) => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, label, isVisible: true }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.map((toast) =>
          toast.id === id ? { ...toast, isVisible: false } : toast,
        ),
      }));

      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
      }, 500);
    }, 1000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
