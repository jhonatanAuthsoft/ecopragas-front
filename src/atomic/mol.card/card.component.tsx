import * as React from "react";

import { Body2, H3, InputCaption } from "@/atomic/atm.typography";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-xs",
        "p-md rounded-lg text-card-foreground bg-card border border-grayscale-light hover:shadow-dropshadow transition-shadow",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-xs", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <H3 ref={ref} className={cn("text-2xl  leading-none tracking-tight", className)} {...props}>
      {children}
    </H3>
  ),
);
CardTitle.displayName = "CardTitle";

const CardTitleSecondary = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-xxs! text-grayscale-dark font-normal", className)} {...props}>
    {children}
  </h3>
));
CardTitleSecondary.displayName = "CardTitleSecondary";

const CardSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }) => (
  <Body2 className={cn("text-xxs! font-normal", className)} {...props}>
    {children}
  </Body2>
));
CardSubtitle.displayName = "CardSubtitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }) => (
  <InputCaption className={cn("text-grayscale-medium", className)} {...props}>
    {children}
  </InputCaption>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("w-full self-start flex flex-col gap-xs", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardTitleSecondary,
  CardSubtitle,
  CardDescription,
  CardContent,
};
