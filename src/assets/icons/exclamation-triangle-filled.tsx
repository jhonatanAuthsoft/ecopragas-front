import type { IconProps } from "./types";

export const ExclamationTriangleFilledIcon = ({
  className,
  title = "Triângulo de esclamação preenchido",
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.40087 3.00327C10.5554 1.00216 13.4435 1.00216 14.598 3.00327L21.9523 15.7508C23.1062 17.7508 21.6627 20.2499 19.3538 20.2499H4.6451C2.33612 20.2499 0.892695 17.7508 2.04654 15.7508L9.40087 3.00327ZM11.9996 8.24988C12.4138 8.24988 12.7496 8.58566 12.7496 8.99988V12.7499C12.7496 13.1641 12.4138 13.4999 11.9996 13.4999C11.5854 13.4999 11.2496 13.1641 11.2496 12.7499V8.99988C11.2496 8.58566 11.5854 8.24988 11.9996 8.24988ZM11.9996 16.4999C12.4138 16.4999 12.7496 16.1641 12.7496 15.7499C12.7496 15.3357 12.4138 14.9999 11.9996 14.9999C11.5854 14.9999 11.2496 15.3357 11.2496 15.7499C11.2496 16.1641 11.5854 16.4999 11.9996 16.4999Z"
        fill="currentColor"
      />
    </svg>
  );
};
