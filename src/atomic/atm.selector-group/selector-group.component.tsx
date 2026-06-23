import { Button } from "@/atomic/atm.button/button.component";
import { cn } from "@/lib/utils";

export interface SelectorOption<T> {
  label: string;
  value: T;
}

interface SelectorGroupProps<T> {
  label: string;
  options: SelectorOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  className?: string;
  itemClassName?: string;
}

export const SelectorGroup = <T,>({
  label,
  options,
  value,
  onChange,
  className,
  itemClassName,
}: SelectorGroupProps<T>) => {
  return (
    <div className={cn("flex flex-col gap-xs", className)}>
      <p className="text-xs font-normal text-grayscale-x-dark">{label}</p>
      <div className="flex flex-wrap gap-sm">
        {options.map((option) => (
          <Button
            key={String(option.value)}
            type="button"
            onClick={() => onChange?.(option.value)}
            className={cn(
              "min-w-[77px] h-[40px] rounded-small border text-xs font-medium transition-all px-md",
              value === option.value
                ? "bg-brand-cta-dark text-white border-brand-cta-dark hover:bg-brand-cta-dark/90"
                : "bg-white text-grayscale-dark border-grayscale-light hover:border-brand-cta-dark hover:bg-brand-cta-dark hover:text-white",
              itemClassName,
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

SelectorGroup.displayName = "SelectorGroup";
