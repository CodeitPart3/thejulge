import { create } from "zustand";

export type ModalType = "alert" | "confirm" | "message";

export interface ModalButton {
  label: string;
  style: "primary" | "white";
  onClick: () => void;
}

export interface ModalOptions {
  type: "alert" | "confirm" | "message";
  message: string;
  iconType?: "check" | "warning" | "none";
  buttons?: ModalButton[];
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface ModalState {
  isOpen: boolean;
  options: ModalOptions | null;
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  options: null,
  openModal: (options) => set({ isOpen: true, options }),
  closeModal: () => set({ isOpen: false, options: null }),
}));
