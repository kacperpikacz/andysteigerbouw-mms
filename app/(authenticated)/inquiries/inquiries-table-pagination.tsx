"use client";

import {Icon} from "@iconify/react";

interface InquiryTablePaginationProps {
    page: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

export function InquiryTablePagination({
                                           page,
                                           pageSize,
                                           totalItems,
                                           onPageChange,
                                           onPageSizeChange,
                                       }: InquiryTablePaginationProps) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalItems);

    return (
        <div className="flex items-center justify-between p-4 flex-wrap gap-3">
            {/* Per Page Selector */}
            <div className="text-base-content/80 hover:text-base-content flex gap-2 text-sm items-center">
                <span className="hidden sm:inline">Per page</span>
                <select
                    className="select select-md w-18"
                    aria-label="Per page"
                    value={pageSize}
                    onChange={(e) => {
                        onPageSizeChange(Number(e.target.value));
                    }}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            {/* Showing info */}
            <span className="text-base-content/80 hidden text-sm lg:inline">
        Showing{" "}
                <span className="text-base-content font-medium">
          {start} to {end}
        </span>{" "}
                of {totalItems} items
      </span>

            {/* Pagination buttons */}
            <div className="inline-flex items-center gap-1">
                <button
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                    className="btn btn-ghost btn-square"
                    aria-label="Prev"
                    disabled={page === 1}
                >
                    <Icon icon="lucide:chevron-left"/>

                </button>

                {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1;
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            className={`btn btn-square ${
                                pageNumber === page
                                    ? "btn-neutral"
                                    : "btn-ghost"
                            }`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                <button
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    className="btn btn-ghost btn-square"
                    aria-label="Next"
                    disabled={page === totalPages}
                >
                    <Icon icon="lucide:chevron-right"/>

                </button>
            </div>
        </div>

    );
}