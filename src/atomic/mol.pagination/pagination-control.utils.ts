export const PAGINATION_ELLIPSIS = "ellipsis" as const;

export type PaginationRangeItem = number | typeof PAGINATION_ELLIPSIS;

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
};

export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
): PaginationRangeItem[] => {
  if (totalPages <= 0) {
    return [];
  }

  const totalPageNumbers = siblingCount + 5;

  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, PAGINATION_ELLIPSIS, lastPageIndex];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);

    return [firstPageIndex, PAGINATION_ELLIPSIS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);

    return [firstPageIndex, PAGINATION_ELLIPSIS, ...middleRange, PAGINATION_ELLIPSIS, lastPageIndex];
  }

  return range(1, totalPages);
};
