interface ConfirmModalLayoutProps {
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModalLayout({
  message,
  onClose,
  onConfirm,
  confirmText = "예",
  cancelText = "아니오",
}: ConfirmModalLayoutProps) {
  return (
    <div className="w-[18.625rem] md:w-[18.625rem] bg-white rounded-lg p-6 text-center">
      <p className="text-gray-900 text-base md:text-lg font-normal mb-6">
        {message}
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="w-[7.5rem] h-[3rem] border border-red-500 text-red-500 rounded"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className="w-[7.5rem] h-[3rem] bg-red-500 text-white rounded"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
