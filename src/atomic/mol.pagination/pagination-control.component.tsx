import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/atomic/mol.pagination/pagination.component";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const PaginationControl = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationControlProps) => {
  // Logic to show pages (simplified for 3 pages example as per request, but scalable)
  // For now we keep the visual structure requested: 1, 2, ..., Last Page
  // We can make this dynamic based on totalPages

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              disabled={currentPage <= 1} 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange?.(currentPage - 1);
              }}
            />
          </PaginationItem>
          
          <PaginationItem>
            <PaginationLink 
              href="#" 
              isActive={currentPage === 1}
              className={currentPage === 1 ? "bg-brand-primary-medium text-white hover:bg-brand-primary-dark hover:text-white" : ""}
              onClick={(e) => {
                e.preventDefault();
                onPageChange?.(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink 
                href="#"
                isActive={currentPage === 2}
                className={currentPage === 2 ? "bg-brand-primary-medium text-white hover:bg-brand-primary-dark hover:text-white" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange?.(2);
                }}
              >
                2
              </PaginationLink>
            </PaginationItem>
          )}

          {totalPages > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {totalPages > 2 && (
            <PaginationItem>
              <PaginationLink 
                href="#"
                isActive={currentPage === totalPages}
                className={currentPage === totalPages ? "bg-brand-primary-medium text-white hover:bg-brand-primary-dark hover:text-white" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange?.(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

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
