import {
  forwardRef,
  ReactNode,
  ElementType,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/utils/className";

/* ---------- Util Type ---------- */
type ExclusiveKeys<A, B> = Exclude<keyof A, keyof B>;
type Strict<A, K extends PropertyKey> = Omit<A, K> & { [P in K]?: never };

/* ---------- Own Type ---------- */
interface CustomProps {
  label?: string;
  prefix?: ReactNode;
  postfix?: ReactNode;
  size?: keyof typeof sizeMap;
  fullWidth?: boolean;
  disabled?: boolean;
  validateMessage?: string;
  className?: string;
  wrapperClassName?: string;
}

/* ---------- Native Attrs ---------- */
type InputAttrs = ComponentPropsWithoutRef<"input">;
type TextareaAttrs = ComponentPropsWithoutRef<"textarea">;

type InputOnly = ExclusiveKeys<InputAttrs, TextareaAttrs>;
type TextareaOnly = ExclusiveKeys<TextareaAttrs, InputAttrs>;

type StrictInputAttrs = Strict<InputAttrs, TextareaOnly>;
type StrictTextareaAttrs = Strict<TextareaAttrs, InputOnly>;

type InputProps = Omit<StrictInputAttrs, keyof CustomProps> &
  CustomProps & { as?: "input" };

type TextareaProps = Omit<StrictTextareaAttrs, keyof CustomProps> &
  CustomProps & { as: "textarea" };

type TextFieldProps = InputProps | TextareaProps;
type TextFieldRef<P extends TextFieldProps> = P extends { as: "textarea" }
  ? ComponentPropsWithRef<"textarea">["ref"]
  : ComponentPropsWithRef<"input">["ref"];

const sizeMap = {
  lg: "py-4 px-5 text-[1rem]",
  sm: "p-2.5 text-sm",
} as const;

function TextFieldInner<T extends TextFieldProps>(
  {
    as,
    id,
    label,
    prefix,
    postfix,
    fullWidth,
    disabled,
    wrapperClassName,
    className,
    size = "lg",
    validateMessage,
    ...rest
  }: T,
  ref: TextFieldRef<T>,
) {
  const Component = (as ?? "input") as ElementType;

  const wrapperClassNames = cn(
    "flex w-fit gap-1.5 border rounded-[0.375rem] border-gray-30 focus-within:border-blue-20 placeholder:text-gray-40 ",
    sizeMap[size],
    fullWidth && "w-full",
    disabled && "bg-gray-20 text-gray-40",
    validateMessage && "focus-within:border-red-40",
    wrapperClassName,
  );

  const textElementClassNames = cn(
    "disabled:placeholder:text-gray-40 resize-none outline-none",
    fullWidth && "flex-1",
    className,
  );

  return (
    <div>
      {label && (
        <label htmlFor={id} className="inline-block mb-2 leading-[1.625rem]">
          {label}
        </label>
      )}

      <div className={wrapperClassNames}>
        {prefix}
        <Component
          id={id}
          ref={ref}
          disabled={disabled}
          className={textElementClassNames}
          {...rest}
        />
        {postfix}
      </div>

      {validateMessage && (
        <p className="m-2 text-sm text-red-40">{validateMessage}</p>
      )}
    </div>
  );
}

TextFieldInner.displayName = "TextField";

export const TextField = forwardRef(TextFieldInner) as <
  P extends TextFieldProps,
>(
  props: P & { ref?: TextFieldRef<P> },
) => ReactNode;

export default TextField;
