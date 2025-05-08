import { ReactNode, useEffect, useState } from "react";

import { createPortal } from "react-dom";

interface ToastPortalProps {
  children: ReactNode;
}

export default function ToastPortal({ children }: ToastPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (typeof window === "undefined") return null;

  const el = document.getElementById("toast-root");
  if (!el || !mounted) return null;

  return createPortal(children, el);
}
