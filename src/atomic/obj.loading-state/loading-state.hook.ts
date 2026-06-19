import { Children, isValidElement, useMemo } from "react";

export const useTypedChildren = (children: React.ReactNode) => {
  return useMemo(() => {
    let shimmer: React.ReactElement | null = null;
    let error: React.ReactElement | null = null;
    let noData: React.ReactElement | null = null;
    const data: React.ReactNode[] = [];

    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        const childType = child.type as { displayName?: string; name?: string };
        const componentName = childType.displayName ?? childType.name;

        switch (componentName) {
          case "StateShimmer":
            shimmer = child;
            break;
          case "StateError":
            error = child;
            break;
          case "StateNoData":
            noData = child;
            break;
          default:
            data.push(child);
        }
      } else {
        data.push(child);
      }
    });

    return { shimmer, error, noData, data };
  }, [children]);
};
