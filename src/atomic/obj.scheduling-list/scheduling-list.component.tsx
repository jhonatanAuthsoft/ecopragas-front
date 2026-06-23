import type React from "react";
import {
  SchedulingCard,
  SchedulingCardClient,
  type SchedulingCardProps,
} from "@/atomic/obj.scheduling-card";
import { useAuthStore } from "@/store/auth";

interface SchedulingListProps {
  items: SchedulingCardProps[];
  onItemClick?: (id: string) => void;
}

export const SchedulingList: React.FC<SchedulingListProps> = ({ items, onItemClick }) => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col gap-sm w-full">
      {user?.perfil === "CLIENTE"
        ? items.map((item) => (
            <SchedulingCardClient key={item.id} {...item} onClick={() => onItemClick?.(item.id)} />
          ))
        : items.map((item) => (
            <SchedulingCard key={item.id} {...item} onClick={() => onItemClick?.(item.id)} />
          ))}
    </div>
  );
};
