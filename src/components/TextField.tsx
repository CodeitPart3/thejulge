import {
  Ref,
  ReactNode,
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  PropsWithChildren,
} from "react";

import { cn } from "@/utils/cn";

const sizeMap = {
  lg: "py-4 px-5 text-[1rem]",
  sm: "p-2.5 text-sm",
} as const;

interface TextElementProps {
  id?: string;
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

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof TextElementProps
> &
  TextElementProps;

type TextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  keyof TextElementProps
> &
  TextElementProps;

function Field({
  id,
  label,
  validateMessage,
  children,
}: PropsWithChildren<
  Pick<TextElementProps, "id" | "label" | "validateMessage">
>) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="inline-block mb-2 leading-[1.625rem]">
          {label}
        </label>
      )}

      {children}

      {validateMessage && (
        <p className="m-2 text-sm text-red-40">{validateMessage}</p>
      )}
    </div>
  );
}

const Input = forwardRef(
  (
    {
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
    }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const wrapperClassNames = cn(
      "flex w-fit gap-1.5 border rounded-[0.375rem] border-gray-30 focus-within:border-blue-20 placeholder:text-gray-40 ",
      {
        "w-full": fullWidth,
        "bg-gray-20 text-gray-40": disabled,
        "focus-within:border-red-40": validateMessage,
      },
      sizeMap[size],
      wrapperClassName,
    );

    const textElementClassNames = cn(
      "disabled:placeholder:text-gray-40 resize-none outline-none",
      {
        "flex-1": fullWidth,
      },
      className,
    );

    return (
      <Field id={id} label={label} validateMessage={validateMessage}>
        <div className={wrapperClassNames}>
          {prefix}
          <input
            id={id}
            ref={ref}
            disabled={disabled}
            className={textElementClassNames}
            {...rest}
          />
          {postfix}
        </div>
      </Field>
    );
  },
);

const TextArea = forwardRef(
  (
    {
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
    }: TextAreaProps,
    ref: Ref<HTMLTextAreaElement>,
  ) => {
    const wrapperClassNames = cn(
      "flex w-fit gap-1.5 border rounded-[0.375rem] border-gray-30 focus-within:border-blue-20 placeholder:text-gray-40 ",
      {
        "w-full": fullWidth,
        "bg-gray-20 text-gray-40": disabled,
        "focus-within:border-red-40": validateMessage,
      },
      sizeMap[size],
      wrapperClassName,
    );

    const textElementClassNames = cn(
      "disabled:placeholder:text-gray-40 resize-none outline-none",
      {
        "flex-1": fullWidth,
      },
      className,
    );

    return (
      <Field id={id} label={label} validateMessage={validateMessage}>
        <div className={wrapperClassNames}>
          {prefix}
          <textarea
            id={id}
            ref={ref}
            disabled={disabled}
            className={textElementClassNames}
            {...rest}
          />
          {postfix}
        </div>
      </Field>
    );
  },
);

const TextField = {
  Input,
  TextArea,
};

export default TextField;
