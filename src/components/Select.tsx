import {
  useState,
  useEffect,
  useRef,
  ReactNode,
  SelectHTMLAttributes,
  useMemo,
} from "react";

import { DropdownDown, DropdownUp } from "@/assets/icon";
import { cn } from "@/utils/cn";

const sizeMap = {
  lg: "py-4 px-5 text-[1rem]",
  sm: "p-2.5 text-sm",
} as const;

interface Option {
  label: string;
  value: string;
}

interface SelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLButtonElement>,
    "size" | "onChange" | "disabled"
  > {
  id?: string;
  label?: string;
  options: Option[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  size?: keyof typeof sizeMap;
  fullWidth?: boolean;
  className?: string;
  wrapperClassName?: string;
}

// 라벨과 입력 영역을 감싸는 공통 컴포넌트
function Field({
  id,
  label,
  children,
}: {
  id?: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="inline-block mb-2 leading-[1.625rem]">
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

function Select({
  id,
  label,
  options,
  value,
  onValueChange,
  placeholder = "선택",
  size = "lg",
  fullWidth,
  className,
  wrapperClassName,
  ...rest
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [buttonWidth, setButtonWidth] = useState<number>(0);

  const wrapperRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  const wrapperClassNames = cn(
    "relative",
    {
      "w-full": fullWidth,
    },
    wrapperClassName,
  );

  const buttonClassNames = cn(
    "flex items-center justify-between rounded-[0.375rem] cursor-pointer",
    {
      "w-full": fullWidth,
      "bg-white border border-gray-30": size === "lg",
      "bg-gray-10 font-bold": size === "sm",
    },
    value ? "text-black" : "text-gray-40",
    sizeMap[size],
    className,
  );

  const listClassNames = cn(
    "absolute top-full left-0 mt-1 border rounded-[0.375rem] bg-white border-gray-30 text-black shadow-lg z-10 max-h-48 overflow-y-auto",
  );

  const handleSelect = (selectedValue: string) => {
    onValueChange?.(selectedValue);
    setOpen(false);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !buttonRef.current?.contains(target) &&
        !wrapperRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 버튼 너비 측정 (드롭다운 너비 일치시키기 위함)
  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonWidth(rect.width);
    }
  }, [open, fullWidth, size, value]); // 버튼 사이즈가 변할 수 있는 경우

  return (
    <Field id={id} label={label}>
      <div className={wrapperClassNames}>
        <button
          id={id}
          type="button"
          ref={buttonRef}
          onClick={() => setOpen((prev) => !prev)}
          className={buttonClassNames}
          {...rest}
        >
          {selectedOption?.label || placeholder}
          {open ? (
            <DropdownUp className="ml-2" />
          ) : (
            <DropdownDown className="ml-2" />
          )}
        </button>

        {open && (
          <ul
            ref={wrapperRef}
            className={listClassNames}
            style={{
              width: buttonWidth,
            }}
          >
            {options.map((option) => (
              <li
                key={option.value}
                className="border-b border-gray-20 last:border-0"
              >
                <button
                  type="button"
                  className={cn(
                    "w-full text-center hover:bg-gray-10 cursor-pointer",
                    size === "sm"
                      ? "px-3 py-2 text-sm"
                      : "px-5 py-3 text-[1rem]",
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Field>
  );
}

export default Select;
