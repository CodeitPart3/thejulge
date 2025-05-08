import Button from "../Button";

import { Check, Notice } from "@/assets/icon";
import { useModalStore } from "@/store/useModalStore";

interface ModalButton {
  label: string;
  style: "primary" | "white";
  onClick: () => void;
}

interface Props {
  type: "alert" | "message";
  iconType?: "check" | "warning" | "none";
  message: string;
  button: ModalButton;
}

const ICONS = {
  check: Check,
  warning: Notice,
};

export default function AlertModalLayout({
  type,
  iconType = "none",
  message,
  button,
}: Props) {
  const Icon = iconType !== "none" ? ICONS[iconType] : null;
  const { closeModal } = useModalStore();
  return (
    <div
      className={`
        bg-white rounded-lg text-center relative
        ${
          type === "message"
            ? "w-[20.625rem] h-[13.75rem] sm:w-[33.75rem] sm:h-[15.625rem]"
            : "w-[18.625rem] h-[11.5rem] sm:w-[19.625rem] sm:h-[11.5rem]"
        }
        p-6 flex flex-col justify-center items-center
      `}
      onClick={(e) => e.stopPropagation()}
    >
      {Icon && <Icon className="w-6 h-6 mb-3.5 mx-auto shrink-0" />}{" "}
      <p className="text-gray-900 text-base sm:text-lg mb-[1rem]">{message}</p>
      <div
        className={
          type === "message"
            ? "w-full absolute bottom-6 flex justify-center sm:justify-end sm:right-6 sm:bottom-6"
            : ""
        }
      >
        <div>
          <Button
            variant={type === "message" ? "primary" : "white"}
            onClick={() => {
              button.onClick?.();
              closeModal();
            }}
            textSize="md"
            className="w-[5rem] h-[2.375rem] cursor-pointer"
          >
            {button.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
