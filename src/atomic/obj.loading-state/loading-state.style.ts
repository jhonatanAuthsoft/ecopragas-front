import { tv } from "tailwind-variants";

export const style = tv({
  slots: {
    wrapper: "relative",
    block: "hidden",
    loading: "hidden absolute top-0 items-center justify-center w-full h-full bg-white/70",
  },
  variants: {
    visible: {
      true: {
        block: "block",
        loading: "flex",
      },
    },
    topMost: {
      true: {
        loading: "fixed",
      },
    },
  },
});
