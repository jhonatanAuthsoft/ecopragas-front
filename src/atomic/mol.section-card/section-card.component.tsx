import { H2 } from "@/atomic/atm.typography";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

export function SectionCard({ className, title, children }: SectionCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-md p-lg bg-white rounded-medium shadow-sm border border-grayscale-light",
        className,
      )}
    >
      <H2>{title}</H2>
      {children}
    </div>
  );
}
