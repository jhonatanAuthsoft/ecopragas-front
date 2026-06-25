import { tv, type VariantProps } from "tailwind-variants";

export const agendaEventCardStyle = tv({
  slots: {
    root: [
      "w-full rounded-xs border-l-[3px] flex flex-col text-left",
      "cursor-pointer transition-opacity hover:opacity-90",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-medium",
    ],
    accent: "leading-tight",
  },
  variants: {
    colorVariant: {
      orange: {
        root: "bg-feedback-warning-light border-l-brand-accessory-orange",
        accent: "text-feedback-warning-dark",
      },
      purple: {
        root: "bg-brand-accessory-purple/10 border-l-brand-accessory-purple",
        accent: "text-brand-accessory-purple",
      },
      green: {
        root: "bg-feedback-success-light border-l-brand-accessory-green",
        accent: "text-grayscale-x-dark",
      },
    },
    density: {
      default: {
        root: "p-xs gap-2xs",
      },
      compact: {
        root: "p-2xs gap-[2px]",
      },
    },
  },
  defaultVariants: {
    colorVariant: "orange",
    density: "default",
  },
});

export type AgendaEventCardStyleVariants = VariantProps<typeof agendaEventCardStyle>;
