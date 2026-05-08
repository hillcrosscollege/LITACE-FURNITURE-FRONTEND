"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { cn } from "@/lib/utils";

const App_Paginate = ({
  setPage,
  totalPages,
  page,
  paginateStyle,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  page: number;
  paginateStyle?: string;
}) => {
  const getPages = () => {
    const pages = [];

    const maxVisible = 5;

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (page <= 3) {
      start = 1;
      end = Math.min(5, totalPages);
    }

    if (page >= totalPages - 2) {
      start = Math.max(totalPages - 4, 1);
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return { pages, start, end };
  };

  const { pages, start, end } = getPages();

  return (
    <Pagination className={cn("mt-10", paginateStyle)}>
      <PaginationContent>
        {/* Prev */}
        <PaginationItem>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded disabled:opacity-50 cursor-pointer disabled:cursor-default"
          >
            ←
          </button>
        </PaginationItem>

        {/* First page */}
        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
            </PaginationItem>
            <span className="px-2">...</span>
          </>
        )}

        {/* Middle pages */}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => setPage(p)}
              className={cn(
                "rounded-md transition",
                page === p
                  ? "bg-primary text-white hover:bg-primary"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Last page */}
        {end < totalPages && (
          <>
            <span className="px-2">...</span>
            <PaginationItem>
              <PaginationLink onClick={() => setPage(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next */}
        <PaginationItem>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded disabled:opacity-50 cursor-pointer disabled:cursor-default"
          >
            →
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default App_Paginate;
