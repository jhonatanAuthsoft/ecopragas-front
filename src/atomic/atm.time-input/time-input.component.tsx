import { forwardRef } from "react";
import { ClockIcon } from "@/assets/icons/clock";
import { TextInput, type TextInputProps } from "@/atomic/atm.text-input";
import { formatTime } from "@/utils/formatters";

export interface TimeInputProps extends Omit<TextInputProps, "type"> {}

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      formatter = formatTime,
      placeholder = "12:30",
      maxLength = 5,
      iconLeft = <ClockIcon className="size-lg text-grayscale-medium" />,
      ...props
    },
    ref,
  ) => (
    <TextInput
      ref={ref}
      {...props}
      type="text"
      inputMode="numeric"
      maxLength={maxLength}
      placeholder={placeholder}
      formatter={formatter}
      iconLeft={iconLeft}
    />
  ),
);

TimeInput.displayName = "TimeInput";
