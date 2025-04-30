import AlertModalLayout from "./AlertModalLayout";
import ConfirmModalLayout from "./ConfirmModalLayout";

interface ModalButton {
  label: string;
  style: "primary" | "white"; // "primary" -> "filledRed", "white" -> "outlinedRed"
  onClick: () => void;
}

interface ModalProps {
  message: string;
  iconType?: "check" | "warning" | "none";
  buttons: ModalButton[];
  onClose: () => void;
}

export default function Modal({
  message = "",
  iconType = "none",
  buttons = [],
  onClose,
}: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70  flex justify-center items-center z-50"
      onClick={onClose}
    >
      {iconType === "none" ? (
        <AlertModalLayout
          message={message}
          buttons={buttons}
          onClose={onClose}
        />
      ) : (
        <ConfirmModalLayout
          iconType={iconType}
          message={message}
          buttons={buttons}
          onClose={onClose}
        />
      )}
    </div>
  );
}
