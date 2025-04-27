import React from "react";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "white";
type ButtonTextSize = "lg" | "md" | "sm";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  textSize?: ButtonTextSize;
  fullWidth?: boolean;
  disabled?: boolean;
}

const textSizeClassMap: Record<ButtonTextSize, string> = {
  lg: "text-base font-bold leading-5",
  md: "text-sm font-bold leading-none",
  sm: "text-xs font-normal leading-4",
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary: "bg-[#EA3C12] text-white hover:bg-[#ca3f2a] active:bg-[#aa3523]",
  white:
    "bg-white text-[#EA3C12] border border-[#EA3C12] hover:bg-[#fff5f3] active:bg-[#ffe5e0]",
};

const disabledClass = "bg-gray-40 text-white cursor-not-allowed";

export default function Button({
  variant = "primary",
  textSize = "md",
  fullWidth = false,
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "rounded-md";

  const mergedClasses = twMerge(
    clsx(
      baseClasses,
      textSizeClassMap[textSize],
      disabled ? disabledClass : variantClassMap[variant],
      fullWidth && "w-full",
      className,
    ),
  );

  return (
    <button className={mergedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
