import { tv, type VariantProps } from "tailwind-variants";

export const typographyStyle = tv({
  slots: {
    base: "font-lato text-foreground",
    display: ["text-xl md:text-2xl font-heavy leading-snug"],
    h1: ["text-lg md:text-xl font-bold leading-snug"],
    h2: ["text-md md:text-lg font-bold leading-snug"],
    h3: ["text-sm md:text-md font-medium leading-snug"],
    h4: ["text-xs md:text-sm font-bold leading-snug"],
    body1: "text-sm font-medium leading-normal",
    body2: "text-xs font-medium leading-normal",
    link: "text-sm font-medium leading-normal text-primary hover:underline cursor-pointer",
    linkSmall: "text-xs font-medium leading-normal text-primary hover:underline cursor-pointer",
  },
});

type TypographyProps<T = Record<string, unknown>> = {
  children: React.ReactNode;
  className?: string;
} & T;

type Typography<T = Record<string, unknown>> = React.FC<TypographyProps<T>>;

const { display, h1, h2, h3, h4, body1, body2, link, linkSmall } = typographyStyle();

export const HDisplay: Typography = ({ className, children }) => (
  <h1 className={display({ className })}>{children}</h1>
);
export const H1: Typography = ({ className, children }) => (
  <h1 className={h1({ className })}>{children}</h1>
);
export const H2: Typography = ({ className, children }) => (
  <h2 className={h2({ className })}>{children}</h2>
);
export const H3: Typography = ({ className, children }) => (
  <h3 className={h3({ className })}>{children}</h3>
);
export const H4: Typography = ({ className, children }) => (
  <h4 className={h4({ className })}>{children}</h4>
);
export const Body1: Typography = ({ className, children }) => (
  <p className={body1({ className })}>{children}</p>
);
export const Body2: Typography = ({ className, children }) => (
  <p className={body2({ className })}>{children}</p>
);
export const Link: Typography<{ href?: string; onClick?: () => void }> = ({
  className,
  children,
  ...props
}) => (
  <a className={link({ className })} {...props}>
    {children}
  </a>
);
export const LinkSmall: Typography<{ href?: string; onClick?: () => void }> = ({
  className,
  children,
  ...props
}) => (
  <a className={linkSmall({ className })} {...props}>
    {children}
  </a>
);

export const inputStyle = tv({
  base: "text-xs font-medium text-foreground text-left leading-snug font-lato",
  variants: {
    type: {
      label: "block",
      value: "",
      caption: "block text-xxs! leading-tight text-muted-foreground",
    },
    status: {
      success: "text-feedback-success-medium",
      error: "text-destructive",
    },
    disabled: {
      true: "text-muted-foreground cursor-not-allowed",
    },
  },
});

type InputVariants = VariantProps<typeof inputStyle> & { htmlFor?: string };

export const InputLabel: Typography<InputVariants> = ({
  htmlFor,
  className,
  status,
  disabled,
  children,
}) => (
  <label className={inputStyle({ type: "label", status, disabled, className })} htmlFor={htmlFor}>
    {children}
  </label>
);

export const InputValue: Typography<InputVariants> = ({
  htmlFor,
  className,
  status,
  disabled,
  children,
}) => (
  <span className={inputStyle({ type: "value", status, disabled, className })}>{children}</span>
);

export const InputCaption: Typography<InputVariants> = ({
  htmlFor,
  className,
  status,
  disabled,
  children,
}) => (
  <span className={inputStyle({ type: "caption", status, disabled, className })}>{children}</span>
);
