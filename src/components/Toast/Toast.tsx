import { cn } from "@/utils/cn";

interface ToastProps {
  label: string;
  className?: string;
}

export default function Toast({ label, className }: ToastProps) {
  return (
    <div
      className={cn(
        "relative inline-block rounded-md bg-red-30 px-4 py-[10px] text-white body1-regular",
        className,
      )}
    >
      {label}
    </div>
  );
}
