import { tv, type VariantProps } from "tailwind-variants";

export const style = tv({
  base: "size-full bg-linear-to-r from-neutral-200 via-white to-neutral-200 bg-size-[200%_100%]",
  variants: {
    rounded: {
      true: "rounded-md",
      false: "",
    },
  },
});

export type StyleVariants = VariantProps<typeof style>;
