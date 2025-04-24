import React from "react";

type ButtonVariant = "primary" | "white" | "disabled";
type ButtonTextSize = "lg" | "md" | "sm";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  textSize?: ButtonTextSize;
  fullWidth?: boolean;
}

const textSizeClassMap: Record<ButtonTextSize, string> = {
  lg: "text-base font-bold leading-5",
  md: "text-sm font-bold leading-none",
  sm: "text-xs font-normal leading-4",
};

export default function Button({
  variant = "primary",
  textSize = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "rounded-md";

  let variantClass = "";
  if (variant === "primary") {
    variantClass =
      "bg-[#EA3C12] text-white hover:bg-[#ca3f2a] active:bg-[#aa3523]";
  } else if (variant === "white") {
    variantClass =
      "bg-white text-[#EA3C12] border border-[#EA3C12] hover:bg-[#fff5f3] active:bg-[#ffe5e0]";
  } else if (variant === "disabled") {
    variantClass = "bg-gray-40 text-white cursor-not-allowed";
  }

  const fullWidthClass = fullWidth ? "w-full" : "";
  const textSizeClass = textSizeClassMap[textSize];

  const finalClassName = [
    baseClasses,
    variantClass,
    textSizeClass,
    fullWidthClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={finalClassName}
      disabled={variant === "disabled" || props.disabled}
      {...props}
    >
      {children}
    </button>
  );
}
