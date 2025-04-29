interface ToastProps {
  label: string;
  onClose?: () => void;
}

export default function Toast({ label, onClose }: ToastProps) {
  return (
    <div className="relative inline-block rounded-md bg-red-30 px-4 py-[10px] text-white body1-regular">
      {label}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-white text-xs"
        >
          ✕
        </button>
      )}
    </div>
  );
}
