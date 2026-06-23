import { Loader } from "lucide-react";
import { useTypedChildren } from "./loading-state.hook";
import { style } from "./loading-state.style";

interface LoadingStateProps {
  topMost?: boolean;
  enableActivityIndicator?: boolean;
  renderOnlyWhenData?: boolean;
  loading?: boolean;
  error?: boolean;
  data?: boolean;
  children?: React.ReactNode;
}

const StateShimmer: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
const StateError: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
const StateNoData: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;

export const LoadingState: React.FC<LoadingStateProps> & {
  Shimmer: typeof StateShimmer;
  Error: typeof StateError;
  NoData: typeof StateNoData;
} = ({
  topMost = false,
  enableActivityIndicator = true,
  renderOnlyWhenData = false,
  loading = false,
  error = false,
  data = true,
  children,
}) => {
  const { shimmer, error: errorChildren, noData, data: dataChildren } = useTypedChildren(children);

  const showError = error && !loading && !data;
  const showShimmer = !data && loading;
  const showNoData = !error && !data && !loading;
  const showData = !!data;
  const showLoadingSpinner = data && loading && enableActivityIndicator;

  const { wrapper, block, loading: loadingStyle } = style();

  return (
    <div className={wrapper()}>
      <div className={block({ visible: showError })}>{errorChildren}</div>
      <div className={block({ visible: showShimmer })}>{shimmer}</div>
      <div className={block({ visible: showNoData })}>{noData}</div>
      {renderOnlyWhenData ? (
        showData && <div className={block({ visible: showData })}>{dataChildren}</div>
      ) : (
        <div className={block({ visible: showData })}>{dataChildren}</div>
      )}
      <div className={loadingStyle({ visible: showLoadingSpinner, topMost })}>
        <Loader className="size-2xl" />
      </div>
    </div>
  );
};

LoadingState.Shimmer = StateShimmer;
LoadingState.Error = StateError;
LoadingState.NoData = StateNoData;

StateShimmer.displayName = "StateShimmer";
StateError.displayName = "StateError";
StateNoData.displayName = "StateNoData";
