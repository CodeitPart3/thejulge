import { Check, Notice } from "@/assets/icon";

const ICONS = {
  check: Check,
  warning: Notice,
};

interface ConfirmModalLayoutProps {
  iconType?: "check" | "warning" | "none";
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModalLayout({
  iconType = "none",
  message,
  onClose,
  onConfirm,
  confirmText = "예",
  cancelText = "아니오",
}: ConfirmModalLayoutProps) {
  const Icon = iconType !== "none" ? ICONS[iconType] : null;

  return (
    <div className="w-[18.625rem] sm:w-[18.625rem] h-[11.5rem] bg-white rounded-lg p-6 text-center flex flex-col justify-center items-center">
      {Icon && <Icon className="w-6 h-6 mb-3" />}

      <p className="text-gray-900 text-base sm:text-lg font-normal mb-6">
        {message}
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="w-[5rem] h-[2.375rem] border border-red-500 text-red-500 rounded-[6px] cursor-pointer"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className="w-[5rem] h-[2.375rem] bg-red-500 text-white rounded-[6px] cursor-pointer"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
