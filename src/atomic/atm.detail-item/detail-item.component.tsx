import { Body2, H4 } from "@/atomic/atm.typography";
import { cn } from "@/lib/utils";

interface DetailItemProps {
  className?: string;
  label: string;
  value: (string | number | React.ReactNode | undefined | null)[];
  valueClassName?: string;
}

export function DetailItem(props: DetailItemProps) {
  return (
    <div className={cn("flex flex-col gap-2xs w-full min-w-0", props.className)}>
      <H4 className="text-grayscale-dark">{props.label}</H4>
      <div className="flex gap-3xs">
        {props.value?.map((item, index) => {
          const key = `${props.label}-${item}-${index}`;

          return (
            <div key={key} className={cn("w-full", props.valueClassName)}>
              {typeof item === "object" ? item || "-" : <Body2>{item || "-"}</Body2>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
