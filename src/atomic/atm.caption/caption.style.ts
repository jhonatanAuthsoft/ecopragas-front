import { tv, type VariantProps } from "tailwind-variants";

export const style = tv({
  base: "font-medium text-grayscale-dark",
  variants: {
    status: {
      error: "text-feedback-error-dark",
      success: "text-feedback-success-dark",
      warning: "text-feedback-warning-dark",
    },
  },
});

export type StyleVariants = VariantProps<typeof style>;
