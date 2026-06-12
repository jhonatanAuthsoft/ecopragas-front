import type React from "react";
import { SchedulingCard, type SchedulingCardProps } from "@/atomic/obj.scheduling-card";

interface SchedulingListProps {
  items: SchedulingCardProps[];
  onItemClick?: (id: string) => void;
}

export const SchedulingList: React.FC<SchedulingListProps> = ({ items, onItemClick }) => {
  return (
    <div className="flex flex-col gap-sm w-full">
      {items.map((item) => (
        <SchedulingCard key={item.id} {...item} onClick={() => onItemClick?.(item.id)} />
      ))}
    </div>
  );
};
