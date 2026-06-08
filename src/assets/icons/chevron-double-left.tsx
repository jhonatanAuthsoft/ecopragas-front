import type { IconProps } from "./types";

export const ChevronDoubleLeftIcon = ({
  className,
  title = "Chevron duplo para esquerda",
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
        d="M18.75 4.5L11.25 12L18.75 19.5M12.75 4.5L5.25 12L12.75 19.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
