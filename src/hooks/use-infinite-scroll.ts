import { type RefObject, useEffect, useRef } from "react";

interface UseInfiniteScrollParams {
  rootRef: RefObject<HTMLElement | null>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

export function useInfiniteScroll({
  rootRef,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: UseInfiniteScrollParams) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const sentinel = sentinelRef.current;

    if (!root || !sentinel || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { root, threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [rootRef, hasNextPage, isFetchingNextPage, onLoadMore]);

  return sentinelRef;
}
