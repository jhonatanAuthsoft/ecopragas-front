import { forwardRef } from "react";
import { Textarea } from "@/atomic/atm.textarea/textarea.component";
import { cn } from "@/lib/utils";
import { Separator } from "../obj.separator";

export interface TextareaInputProps extends Omit<React.ComponentProps<"textarea">, "onChange"> {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  invalid?: boolean;
}

export const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>((props, ref) => {
  const { label, id, value, onChange, invalid, className, ...rest } = props;

  return (
    <div className={cn("space-y-2 w-full", className)}>
      {label && (
        <>
          <div className="flex items-center justify-between gap-xs">
            <label htmlFor={id} className="w-full">
              <p className="text-xs font-normal">{label}</p>
            </label>
          </div>
          <Separator size="xs" />
        </>
      )}
      <Textarea
        ref={ref}
        id={id}
        value={value ?? ""}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          "border-grayscale-light rounded-lg min-h-[100px] resize-none",
          invalid && "border-feedback-error-medium",
        )}
        {...rest}
      />
    </div>
  );
});

TextareaInput.displayName = "TextareaInput";
