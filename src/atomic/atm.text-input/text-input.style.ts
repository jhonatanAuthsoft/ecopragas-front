import { tv, type VariantProps } from "tailwind-variants";

export const style = tv({
  slots: {
    wrapper: "w-full",
    field: [
      "overflow-hidden rounded-small truncate transition duration-200",
      "w-full p-md text-xs text-grayscale-x-dark bg-grayscale-white",
      "placeholder:text-grayscale-medium",
      "border border-grayscale-light",
      "caret-grayscale-dark",
      "focus:border-feedback-success-medium focus:outline focus:outline-feedback-success-medium",
      "peer",
    ],
    icon: "absolute top-0 flex items-center justify-center h-full",
    label: "text-xs font-normal",
  },
  variants: {
    variant: {
      outlined: {
        field: "border border-feedback-success-medium bg-transparent",
      },
    },
    hasError: {
      true: {
        field: [
          "border-feedback-error-medium!",
          "caret-feedback-error-medium text-feedback-error-medium",
          "focus-within:ring-3 focus-within:ring-feedback-error-light",
        ],
        asterisk: "text-feedback-error-medium",
      },
    },
    hasLeftIcon: {
      true: {
        field: "pl-2xl",
        icon: "left-md",
      },
    },
    hasRightIcon: {
      true: {
        field: "pr-[40px]",
        icon: "right-md",
      },
    },
    disabled: {
      true: {
        wrapper: "opacity-50 pointer-events-none",
      },
    },
  },
  compoundVariants: [
    {
      hasRightIcon: true,
      hasLeftIcon: false,
      hasError: true,
      class: {
        icon: "text-feedback-error-medium!",
      },
    },
  ],
});

export type StyleVariants = VariantProps<typeof style>;
