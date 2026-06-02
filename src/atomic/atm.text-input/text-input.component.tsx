import { XCircle } from "lucide-react";
import { type ComponentProps, forwardRef } from "react";
import { Body1 } from "@/atomic/atm.typography/typography.component";
import { Separator } from "@/atomic/obj.separator";
import { cn } from "@/lib/utils";
import { type StyleVariants, style } from "./text-input.style";

export interface TextInputProps
  extends Omit<ComponentProps<"input">, "onChange" | "size">,
    StyleVariants {
  onChange?: (value: string) => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  invalid?: boolean;
  error?: string;
  label?: string;
  labelRightContent?: React.ReactNode;
  formatter?: (value: string) => string;
  hasClearButton?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    className,
    onChange,
    invalid,
    label,
    labelRightContent,
    variant,
    iconRight,
    iconLeft,
    formatter,
    error,
    hasClearButton,
    value,
    ...rest
  } = props;

  const {
    field,
    icon,
    label: labelStyle,
    wrapper,
  } = style({
    variant,
    hasError: !!invalid,
    hasLeftIcon: !!iconLeft,
    hasRightIcon: !!iconRight || hasClearButton,
    disabled: rest.disabled,
  });

  const clearButtonIsOpen = hasClearButton && !!value;

  return (
    <div className={wrapper()}>
      <div className="flex items-center justify-between gap-xs">
        {label && (
          <label htmlFor={rest.id} className="w-full">
            <p className={labelStyle()}>{label}</p>
          </label>
        )}
        {labelRightContent}
      </div>
      <Separator size="xs" />

      <div className={cn("relative", className)}>
        {iconLeft && <div className={icon({ hasRightIcon: false })}>{iconLeft}</div>}

        <input
          className={field()}
          ref={ref}
          placeholder=" "
          type="text"
          value={value ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            const next = formatter ? formatter(value) : value;
            onChange?.(next);
          }}
          autoComplete="off"
          {...rest}
        />

        {clearButtonIsOpen ? (
          <button
            type="button"
            className={icon({
              hasRightIcon: true,
              hasLeftIcon: false,
              className: "hidden peer-focus:block text-feedback-success-medium",
            })}
            onMouseDown={() => onChange?.("")}
          >
            <XCircle className="size-[20px] cursor-pointer" />
          </button>
        ) : (
          iconRight && <div className={icon({ hasLeftIcon: false })}>{iconRight}</div>
        )}
      </div>

      {invalid && error && (
        <>
          <Separator size="2xs" />
          <Body1 className="font-medium text-danger-500">{error}</Body1>
        </>
      )}
    </div>
  );
});

TextInput.displayName = "TextInput";
