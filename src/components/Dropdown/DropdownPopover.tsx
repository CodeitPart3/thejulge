import React, { useCallback, useEffect, useRef, useState } from "react";

import clsx from "clsx";
import ReactDOM from "react-dom";

import useOutsideClick from "@/hooks/useOutsideClick";

interface DropdownPopoverProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  align?: "left" | "right";
  variant?: "filter" | "alarm";
  children: React.ReactNode;
}

const DropdownPopover = ({
  anchorRef,
  onClose,
  align = "left",
  variant = "filter",
  children,
}: DropdownPopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // 위치 계산 함수
  const calculatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const isMobile = window.innerWidth < 768;
    const POPUP_WIDTH = variant === "alarm" ? 368 : 390;

    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();

    if (isMobile) {
      setPosition({ top: 0, left: 0 });
    } else {
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left:
          align === "right"
            ? rect.right + window.scrollX - POPUP_WIDTH
            : rect.left + window.scrollX,
      });
    }
  }, [anchorRef, align, variant]);

  // 창 크기 변경 대응
  useEffect(() => {
    calculatePosition();
    window.addEventListener("resize", calculatePosition);
    return () => {
      window.removeEventListener("resize", calculatePosition);
    };
  }, [calculatePosition]);

  useOutsideClick({
    refs: [popoverRef, anchorRef],
    callback: () => {
      onClose();
    },
  });

  const isFilter = variant === "filter";

  const sizeClass = isFilter
    ? "md:w-[24.375rem] md:h-[52.75rem]"
    : "md:w-[23rem] md:h-[26.25rem]";

  const colorClass = isFilter
    ? "bg-white border-gray-200"
    : "bg-red-50 border-gray-300";

  const popoverClass = clsx(
    "z-[9999]",
    "rounded-2xl p-6 pr-5 pb-6 pl-5",
    "shadow-[0px_2px_8px_0px_#78748640]",
    "border fixed md:absolute w-full h-full left-0 top-0",
    colorClass,
    sizeClass,
  );

  return ReactDOM.createPortal(
    <div
      ref={popoverRef}
      className={popoverClass}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};

export default DropdownPopover;
