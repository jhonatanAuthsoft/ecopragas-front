import { type StyleVariants, style } from "./separator.style";

interface SeparatorProps extends StyleVariants {}

export const Separator = (props: SeparatorProps) => {
  return <div className={style(props)} />;
};
