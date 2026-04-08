import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Loader2, Inbox } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface ColumnDef<T> {
  header: string | React.ReactNode;
  accessorKey?: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  emptyMessage?: string | React.ReactNode;
  className?: string;
  onRowClick?: (item: T) => void;
  rowClassName?: string | ((item: T) => string);
  tableClassName?: string;
  // Skeleton Props
  skeletonRowCount?: number;
  // Layout Props
  height?: string;
  // Pagination Props
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function DataTable<T>({
  data,
  columns,
  isLoading,
  emptyMessage = "No data found",
  className,
  onRowClick,
  rowClassName,
  tableClassName,
  skeletonRowCount = 5,
  height = "flex-1",
  currentPage,
  totalPages,
  onPageChange,
}: DataTableProps<T>) {

  const isFlexHeight = height === "flex-1";


  const renderPagination = () => {
    if (!totalPages || totalPages <= 1 || !currentPage || !onPageChange) return null;

    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis-1");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("ellipsis-2");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return (
      <div className="p-4 bg-[#FBFBFC]/50 border-t border-gray-50 shrink-0">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}
              />
            </PaginationItem>

            {pages.map((page, idx) => (
              <PaginationItem key={idx}>
                {typeof page === "string" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => onPageChange(page)}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  };

  const renderSkeleton = () => {
    return Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
      <TableRow key={`skeleton-${rowIndex}`} className="border-b border-gray-50 last:border-0 hover:bg-transparent">
        {columns.map((column, colIndex) => (
          <TableCell key={`skeleton-cell-${colIndex}`} className={cn("px-8 py-6", column.className)}>
            <Skeleton className="h-5 w-full bg-gray-100/50 rounded-md" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const renderEmpty = () => {
    return (
      <TableRow className="hover:bg-transparent">
        <TableCell
          colSpan={columns.length}
          className="px-8 text-center"
          style={{ height: isFlexHeight ? "100%" : `calc(${height} - 60px)` }}
        >
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            {typeof emptyMessage === "string" ? (
              <div className="flex flex-col items-center justify-center gap-5 max-w-[300px] mx-auto opacity-80">
                <div className="w-20 h-20 rounded-[32px] flex items-center justify-center text-gray-300">
                  <Inbox size={40} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-black text-gray-900 uppercase tracking-widest">
                    {emptyMessage}
                  </p>
                  <p className="text-[13px] font-bold text-gray-400/60 leading-relaxed italic">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-10">
                {emptyMessage}
              </div>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  };
  return (
    <div className={cn(
      "bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col",
      isFlexHeight && "flex-1 min-h-0",
      className
    )}>
      <div
        className="overflow-auto custom-scrollbar flex-1"
        style={{ height: isFlexHeight ? undefined : height }}
      >
        <Table className={cn("w-full text-left border-collapse min-w-[1000px]", tableClassName)}>
          <TableHeader className="sticky top-0 z-10 bg-[#FBFBFC]/50 backdrop-blur-md shadow-sm">
            <TableRow className="border-b border-gray-100 hover:bg-transparent">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={cn(
                    "py-5 text-[12px] font-black text-gray-400 uppercase tracking-widest",
                    column.headerClassName
                  )}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeleton()
            ) : data.length > 0 ? (
              data.map((item, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "border-b border-gray-50 last:border-0 hover:bg-[#F8F9FA]/80 transition-colors group",
                    onRowClick && "cursor-pointer",
                    typeof rowClassName === "function"
                      ? rowClassName(item)
                      : rowClassName
                  )}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={cn(" py-5", column.className)}
                    >
                      {column.cell
                        ? column.cell(item)
                        : column.accessorKey
                          ? (item[column.accessorKey as keyof T] as React.ReactNode)
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              renderEmpty()
            )}
          </TableBody>
        </Table>
      </div>
      {renderPagination()}
    </div>
  );


}


