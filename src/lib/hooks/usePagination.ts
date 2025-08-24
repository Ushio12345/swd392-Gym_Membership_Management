import { useState, useMemo } from "react";

type UsePaginationProps<T> = {
  items: T[];
  itemsPerPage?: number;
};

export default function usePagination<T>({
  items,
  itemsPerPage = 4,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, currentPage, itemsPerPage]);

  const handlePageClick = (_e: unknown, newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const nextPage = () => handlePageClick(null, currentPage + 1);
  const prevPage = () => handlePageClick(null, currentPage - 1);

  return {
    currentItems,
    currentPage,
    totalPages,
    handlePageClick,
    nextPage,
    prevPage,
  };
}
