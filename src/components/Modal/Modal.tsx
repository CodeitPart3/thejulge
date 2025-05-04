import AlertModalLayout from "./AlertModalLayout";
import ConfirmModalLayout from "./ConfirmModalLayout";

import { useModalStore } from "@/store/useModalStore";

export default function Modal() {
  const { isOpen, options, closeModal } = useModalStore();

  if (!isOpen || !options) return null;

  const handleClose = () => {
    options.onClose?.();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      {options.type === "confirm" && (
        <ConfirmModalLayout
          message={options.message}
          onClose={handleClose}
          iconType={options.iconType ?? "none"}
          onConfirm={() => {
            options.onConfirm?.();
            closeModal();
          }}
          confirmText={options.confirmText ?? "예"}
          cancelText={options.cancelText ?? "아니오"}
        />
      )}
      {(options.type === "alert" || options.type === "message") && (
        <AlertModalLayout
          type={options.type}
          message={options.message}
          iconType={options.iconType ?? "none"}
          button={{
            label: "확인",
            style: "primary",
            onClick: handleClose,
          }}
        />
      )}
    </div>
  );
}
