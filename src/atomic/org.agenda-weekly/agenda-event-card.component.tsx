import { Body2 } from "@/atomic/atm.typography";
import { cn } from "@/lib/utils";
import { agendaEventCardStyle } from "./agenda-event-card.style";
import type { AgendaEventCardProps } from "./agenda-weekly.types";
import { getTechnicianLabel, MAX_VISIBLE_AVATARS } from "./agenda-weekly.utils";

interface TechnicianAvatarsProps {
  tecnicos: string[];
  compact?: boolean;
}

function TechnicianAvatars({ tecnicos, compact }: TechnicianAvatarsProps) {
  const visibleTecnicos = tecnicos.slice(0, MAX_VISIBLE_AVATARS);
  const remainingCount = tecnicos.length - MAX_VISIBLE_AVATARS;
  const avatarSize = compact ? "size-[12px] text-[7px]" : "size-[14px] text-[8px]";

  return (
    <div className="flex items-center shrink-0">
      {visibleTecnicos.map((tecnico, index) => (
        <div
          key={tecnico}
          className={cn(
            "rounded-full bg-grayscale-medium border border-grayscale-white flex items-center justify-center font-medium text-grayscale-white",
            avatarSize,
            index > 0 && (compact ? "-ml-[5px]" : "-ml-[7px]"),
          )}
          title={tecnico}
        >
          {tecnico.charAt(0).toUpperCase()}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "rounded-full bg-grayscale-dark border border-grayscale-white flex items-center justify-center font-medium text-grayscale-white",
            avatarSize,
            "-ml-[7px]",
          )}
          title={`+${remainingCount} técnicos`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

export function AgendaEventCard({
  tipoServico,
  horario,
  tecnicos,
  colorVariant,
  density = "default",
  onClick,
  className,
}: AgendaEventCardProps) {
  const { root, accent } = agendaEventCardStyle({ colorVariant, density });
  const technicianLabel = getTechnicianLabel(tecnicos);
  const isCompact = density === "compact";

  return (
    <button type="button" onClick={onClick} className={root({ className })}>
      <div className={cn("flex flex-col w-full min-w-0", isCompact ? "gap-[2px]" : "gap-2xs")}>
        <Body2
          className={cn("text-grayscale-x-dark truncate leading-tight", isCompact && "text-xxs")}
        >
          {tipoServico}
        </Body2>
        <Body2 className={cn(accent(), isCompact && "text-xxs")}>{horario}</Body2>
      </div>
      <div
        className={cn("flex items-center min-w-0", isCompact ? "gap-[2px] mt-[2px]" : "gap-2xs")}
      >
        <TechnicianAvatars tecnicos={tecnicos} compact={isCompact} />
        <Body2 className={cn(accent(), "truncate", isCompact && "text-xxs")}>
          {technicianLabel}
        </Body2>
      </div>
    </button>
  );
}
