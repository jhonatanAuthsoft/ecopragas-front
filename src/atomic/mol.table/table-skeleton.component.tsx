import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table.component";

interface TableSkeletonProps {
  columns?: readonly (string | null)[];
  columnCount?: number;
  rowCount?: number;
  className?: string;
  skeletonClassName?: string;
}

const createKeys = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => `${prefix}-${index}`);

export const TableSkeleton = ({
  columns,
  columnCount = 5,
  rowCount = 5,
  className,
  skeletonClassName = "h-[26px] w-full",
}: TableSkeletonProps) => {
  const totalColumns = columns?.length ?? columnCount;
  const rowKeys = createKeys("row", rowCount);
  const cellKeys = createKeys("cell", totalColumns);

  const renderHeader = () => {
    if (columns) {
      return columns.map((label, index) => (
        <TableHead key={`header-${label ?? "empty"}-${index}`}>{label}</TableHead>
      ));
    }

    return cellKeys.map((cellKey) => (
      <TableHead key={`header-${cellKey}`}>
        <Skeleton className={skeletonClassName} />
      </TableHead>
    ));
  };

  return (
    <div className={cn("rounded-xs border border-border p-lg", className)}>
      <Table>
        <TableHeader>
          <TableRow>{renderHeader()}</TableRow>
        </TableHeader>
        <TableBody>
          {rowKeys.map((rowKey) => (
            <TableRow key={rowKey}>
              {cellKeys.map((cellKey) => (
                <TableCell key={`${rowKey}-${cellKey}`}>
                  <Skeleton className={skeletonClassName} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
