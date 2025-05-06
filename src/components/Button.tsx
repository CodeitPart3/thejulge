import React, { forwardRef } from "react";

import { cn } from "@/utils/cn";

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
  primary:
    "bg-[#EA3C12] text-white hover:bg-[#ca3f2a] active:bg-[#aa3523] cursor-pointer",
  white:
    "bg-white text-[#EA3C12] border border-[#EA3C12] hover:bg-[#fff5f3] active:bg-[#ffe5e0] cursor-pointer",
};

const disabledClass = "bg-gray-40 text-white cursor-not-allowed";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      textSize = "md",
      fullWidth = false,
      disabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses = "rounded-md";

    const mergedClasses = cn(
      baseClasses,
      textSizeClassMap[textSize],
      disabled ? disabledClass : variantClassMap[variant],
      fullWidth && "w-full",
      className,
    );

    return (
      <button
        ref={ref}
        className={mergedClasses}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export default Button;
