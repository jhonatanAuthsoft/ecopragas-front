import { tv, type VariantProps } from "tailwind-variants";

export const accountItemStyle = tv({
  slots: {
    wrapper: "shrink-0 border-t border-sidebar-border pt-2xs pb-lg",
    root: "flex w-full flex-col-reverse gap-xs",
    trigger: [
      "flex w-full cursor-pointer items-center gap-xs rounded-lg py-2xs",
      "transition-colors hover:bg-sidebar-accent/50",
    ],
    avatar:
      "flex size-[40px] shrink-0 items-center justify-center rounded-full bg-brand-accessory-green",
    avatarText: "text-white",
    username: "flex-1 truncate text-left text-grayscale-medium",
    chevron: "size-[20px] shrink-0 text-grayscale-dark transition-transform duration-200",
    expanded: "w-full",
    logoutButton:
      "group justify-start text-xs text-feedback-error-dark hover:bg-feedback-error-medium",
    logoutButtonIcon: "size-md text-feedback-error-medium group-hover:text-white",
  },
  variants: {
    isMinimized: {
      true: {
        wrapper: "px-xs",
        trigger: "justify-center",
        logoutButton: "px-2xs!",
      },
      false: {
        wrapper: "px-md",
        trigger: "px-xs",
      },
    },
    open: {
      true: {
        wrapper: "border-t-transparent",
        root: "rounded-small border border-grayscale-light p-xs",
        chevron: "rotate-180",
      },
    },
  },
});

export type AccountItemStyleVariants = VariantProps<typeof accountItemStyle>;
