import Button from "../Button";

import { Check, Notice } from "@/assets/icon";

interface ModalButton {
  label: string;
  style: "primary" | "white";
  onClick: () => void;
}

interface Props {
  iconType?: "check" | "warning" | "none";
  message: string;
  button: ModalButton;
  onClose: () => void;
}

const ICONS = {
  check: Check,
  warning: Notice,
};

export default function AlertModalLayout({
  iconType = "none",
  message,
  button,
  onClose,
}: Props) {
  const Icon = iconType !== "none" ? ICONS[iconType] : null;

  return (
    <div
      className="bg-white p-7 rounded-lg text-center w-[18.625rem] h-[11.5rem] flex flex-col justify-between items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {Icon && <Icon className="w-6 h-6 mb-3" />}
      <p className="text-base text-black font-normal mb-5">{message}</p>
      <Button
        variant={button.style}
        onClick={() => {
          button.onClick();
          onClose();
        }}
        textSize="sm"
        className="py-2 px-4 cursor-pointer"
      >
        {button.label}
      </Button>
    </div>
  );
}
