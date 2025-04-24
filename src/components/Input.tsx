import { InputHTMLAttributes, ReactNode } from "react";

const inputSizeMap: Record<"lg" | "sm", string> = {
  lg: "py-4 px-5",
  sm: "p-2.5",
};

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix" | "size"> {
  label?: string;
  prefix?: ReactNode;
  postfix?: ReactNode;
  fullWidth?: boolean;
  wrapperClassName?: string;
  size?: keyof typeof inputSizeMap;
  validateMessage?: string;
}

function Input({
  id,
  label,
  prefix,
  postfix,
  fullWidth,
  wrapperClassName,
  size = "lg",
  validateMessage,
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="leading-[1.625rem]">
          {label}
        </label>
      )}
      <div
        className={`w-fit border-[1px] rounded-[0.375rem] placeholder:text-gray-40 focus-within:border-blue-20
          ${inputSizeMap[size]} ${wrapperClassName} ${fullWidth && "w-full"}
          ${validateMessage ? "border-red-40" : "border-gray-30"}`}
      >
        {prefix}
        <input
          id={id}
          className={`outline-none ${fullWidth && "w-full"}`}
          {...props}
        />
        {postfix}
      </div>
      <p className="m-2 text-sm text-red-40">{validateMessage}</p>
    </div>
  );
}

export default Input;
