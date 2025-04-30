import React from "react";

import NoticeIcon from "../assets/icon/notice.svg?react";

import CheckIcon from "@/assets/icon/check.svg?react";

interface ModalButton {
  label: string;
  style: "filledRed" | "outlinedRed"; // filledRed: 빨간색 배경 / outlinedRed: 빨간색 테두리
  onClick: () => void;
}

interface ModalProps {
  message: string;
  iconType?: "check" | "warning" | "none";
  buttons: ModalButton[];
  onClose: () => void;
}

// 아이콘 타입에 따른 매핑 객체
const iconConfig: Record<
  "check" | "warning",
  { component: React.FC<React.SVGProps<SVGSVGElement>> }
> = {
  check: {
    component: CheckIcon,
  },
  warning: {
    component: NoticeIcon,
  },
};

function Modal({ message, iconType = "none", buttons, onClose }: ModalProps) {
  const modalSize =
    iconType === "none"
      ? "w-[33.75rem] h-[15.625rem]"
      : "w-[18.625rem] h-[11.4375rem]";
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className={`bg-white p-5 rounded-lg text-center ${modalSize}`}
        onClick={(e) => e.stopPropagation()}
      >
        {iconType !== "none" && (
          <div className="mb-3 flex justify-center">
            {(() => {
              const { component: IconComponent } = iconConfig[iconType];
              return <IconComponent className={`w-6 h-6`} />;
            })()}
          </div>
        )}

        <p className="text-base mb-5">{message}</p>

        <div className="flex justify-center gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded ${
                button.style === "filledRed"
                  ? "bg-red-500 text-white"
                  : "bg-transparent border border-red-500 text-red-500"
              }`}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;
