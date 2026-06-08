import type { IconProps } from "./types";

export const ArrowTrendingUpIcon = ({
  className,
  title = "Seta para cima de tendência",
}: IconProps) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path
        d="M2.25 17.9999L9 11.2499L13.3064 15.5564C14.5101 13.188 16.5042 11.2022 19.1203 10.0375L21.8609 8.81726M19.5802 14.7585L21.8609 8.81726L15.9196 6.53662"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
