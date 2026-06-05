import { PestControlMan } from "@/assets/vectors/pest-control-man";
import { Body1, H2 } from "@/atomic/atm.typography";

interface EmptyPlaceholderProps {
  title: string;
  description: string;
}

export const EmptyPlaceholder = ({ title, description }: EmptyPlaceholderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-md">
      <PestControlMan />
      <div className="flex flex-col items-center justify-center gap-xs max-w-[500px] text-center">
        <H2>{title}</H2>
        <Body1 className="font-normal text-grayscale-dark">{description}</Body1>
      </div>
    </div>
  );
};
