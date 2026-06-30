import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/atomic/mol.pagination/pagination.component";
import {
  getPaginationRange,
  PAGINATION_ELLIPSIS,
} from "@/atomic/mol.pagination/pagination-control.utils";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

const ACTIVE_PAGE_CLASSNAME =
  "bg-brand-primary-medium text-white hover:bg-brand-primary-dark hover:text-white";

export const PaginationControl = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationControlProps) => {
  const pages = getPaginationRange(currentPage, totalPages);

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              disabled={currentPage <= 1}
              onClick={(event) => {
                event.preventDefault();
                if (currentPage > 1) onPageChange?.(currentPage - 1);
              }}
            />
          </PaginationItem>

          {pages.map((page, index) => (
            <PaginationItem key={page === PAGINATION_ELLIPSIS ? `ellipsis-${index}` : page}>
              {page === PAGINATION_ELLIPSIS ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  className={currentPage === page ? ACTIVE_PAGE_CLASSNAME : ""}
                  onClick={(event) => {
                    event.preventDefault();
                    onPageChange?.(page);
                  }}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              disabled={currentPage >= totalPages}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange?.(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
