import { type StyleVariants, style } from "./shimmer.style";

export interface ShimmerProps extends StyleVariants {
  className?: string;
}

export function Shimmer(props: ShimmerProps) {
  const { className, rounded = true } = props;

  return (
    <div
      className={style({ rounded, className })}
      style={{
        animation: "shimmer 2s ease-in-out infinite",
      }}
    />
  );
}
