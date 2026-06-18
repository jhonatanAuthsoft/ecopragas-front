import { Eye, EyeOff } from "lucide-react";
import { type ComponentProps, forwardRef, useState } from "react";
import { type StyleVariants, style } from "@/atomic/atm.text-input/text-input.style";
import { Separator } from "@/atomic/obj.separator";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends Omit<ComponentProps<"input">, "onChange" | "size" | "type">,
    StyleVariants {
  onChange?: (value: string) => void;
  invalid?: boolean;
  error?: string;
  label?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const { className, onChange, invalid, label, variant, value, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  const {
    field,
    icon,
    label: labelStyle,
    wrapper,
  } = style({
    variant,
    hasError: !!invalid,
    hasRightIcon: true,
    disabled: rest.disabled,
  });

  return (
    <div className={wrapper()}>
      {label && (
        <>
          <label htmlFor={rest.id} className="w-full">
            <p className={labelStyle()}>{label}</p>
          </label>
          <Separator size="xs" />
        </>
      )}

      <div className={cn("relative", className)}>
        <input
          className={field()}
          ref={ref}
          placeholder=" "
          type={showPassword ? "text" : "password"}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          autoComplete="off"
          {...rest}
        />

        <button
          type="button"
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          onClick={() => setShowPassword((current) => !current)}
          className={icon({
            hasLeftIcon: false,
            className: "text-grayscale-medium hover:text-grayscale-dark cursor-pointer",
          })}
        >
          {showPassword ? <EyeOff className="size-[20px]" /> : <Eye className="size-[20px]" />}
        </button>
      </div>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
