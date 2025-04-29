import { useToast } from "@/hooks/useToast";
import ToastPortal from "@/components/Toast/ToastPortal";
import Toast from "@/components/Toast/Toast";

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <ToastPortal>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`transition-opacity duration-500 ${
              toast.isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Toast label={toast.label} />
          </div>
        ))}
      </div>
    </ToastPortal>
  );
}
