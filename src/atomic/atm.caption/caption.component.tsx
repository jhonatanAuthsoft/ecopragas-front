import { type StyleVariants, style } from "./caption.style";

interface CaptionProps extends StyleVariants {
  className?: string;
  htmlFor?: string;
  children: React.ReactNode;
}

export function Caption({ status, className, htmlFor, children }: CaptionProps) {
  return (
    <label htmlFor={htmlFor} className={className}>
      <p className={style({ status })}>{children}</p>
    </label>
  );
}
