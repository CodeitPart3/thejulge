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
      {options.type === "alert" && (
        <AlertModalLayout
          message={options.message}
          onClose={handleClose}
          iconType={options.iconType ?? "none"}
          button={{
            label: "확인",
            style: "primary",
            onClick: handleClose,
          }}
        />
      )}

      {options.type === "confirm" && (
        <ConfirmModalLayout
          message={options.message}
          onClose={handleClose}
          onConfirm={() => {
            options.onConfirm?.();
            closeModal();
          }}
        />
      )}

      {options.type === "message" && (
        <AlertModalLayout
          message={options.message}
          onClose={handleClose}
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
