import Button from "../Button";

import CheckIcon from "@/assets/icon/check.svg?react";
import NoticeIcon from "@/assets/icon/notice.svg?react";

interface ModalButton {
  label: string;
  style: "primary" | "white";
  onClick: () => void;
}

interface Props {
  iconType: "check" | "warning" | "none";
  message: string;
  buttons: ModalButton[];
  onClose: () => void;
}

const ICONS = {
  check: CheckIcon,
  warning: NoticeIcon,
};

export default function ConfirmModalLayout({
  iconType,
  message = "",
  buttons = [],
}: Props) {
  const Icon = iconType !== "none" ? ICONS[iconType] : null;

  return (
    <div
      className="bg-white p-7 rounded-lg text-center 
        w-[18.625rem] h-[11.5rem] flex flex-col justify-between items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-3 flex justify-center">
        {Icon && <Icon className="w-6 h-6" />}
      </div>

      <p className="text-base text-black font-normal mb-5">{message}</p>

      <div className="flex justify-center gap-3">
        {buttons.map((button, index) => (
          <Button
            key={index}
            onClick={button.onClick}
            variant={button.style === "primary" ? "primary" : "white"}
            textSize="sm"
            className="py-2 px-4 cursor-pointer"
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
