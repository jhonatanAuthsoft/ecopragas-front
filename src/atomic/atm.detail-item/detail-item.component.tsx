import { Body2, H4 } from "@/atomic/atm.typography";
import { cn } from "@/lib/utils";

interface DetailItemProps {
  className?: string;
  label: string;
  value: (string | number | React.ReactNode | undefined | null)[];
  valueClassName?: string;
}

export function DetailItem(props: DetailItemProps) {
  const isObject = props.value?.some((item) => item != null && typeof item === "object");

  return (
    <div className={cn("flex flex-col gap-2xs w-full min-w-0", props.className)}>
      <H4 className="text-grayscale-dark">{props.label}</H4>
      <div className={cn("w-full flex gap-3xs", props.valueClassName)}>
        {isObject ? (
          props.value.map((item, index) => {
            const key = `${props.label}-${index}`;

            return (
              <div key={key} className="w-full">
                {typeof item === "object" ? item || "-" : <Body2>{item ?? "-"}</Body2>}
              </div>
            );
          })
        ) : (
          <Body2>
            {props.value?.filter((item) => item != null && item !== "").join("; ") || "-"}
          </Body2>
        )}
      </div>
    </div>
  );
}
