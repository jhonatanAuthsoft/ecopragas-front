import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-sm text-xxs! font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-primary-medium text-white",
        secondary: "border-transparent bg-brand-secondary-medium text-white",
        destructive: "border-transparent bg-feedback-error-medium text-white",
        outline: "text-foreground",
      },
      color: {
        blue: "bg-brand-secondary-light/20 text-brand-secondary-medium border border-brand-secondary-medium",
        orange:
          "bg-feedback-warning-light text-feedback-warning-dark border border-brand-accessory-orange",
        neutral: "bg-grayscale-light text-grayscale-dark border border-grayscale-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, color, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, color }), className)} {...props} />;
}

export { Badge, badgeVariants };
