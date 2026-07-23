"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/app/components/ui/pagination";
import type { PaginationMeta } from "@/types/university";

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = Array.from(pages).filter(p => p >= 1 && p <= total).sort((a, b) => a - b);

  const withEllipsis: (number | "ellipsis")[] = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) withEllipsis.push("ellipsis");
    withEllipsis.push(page);
  });
  return withEllipsis;
}

export function Pagination({ meta }: { meta: PaginationMeta }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentPage, totalPages, hasNextPage, hasPreviousPage } = meta;
  if (totalPages <= 1) return null;

  const hrefForPage = (page: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("page", String(page));
    return `/universities?${next.toString()}`;
  };

  const navigate = (e: React.MouseEvent, page: number) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // let the browser handle open-in-new-tab
    e.preventDefault();
    router.push(hrefForPage(page));
  };

  return (
    <PaginationRoot className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={hrefForPage(currentPage - 1)}
            aria-disabled={!hasPreviousPage}
            className={!hasPreviousPage ? "pointer-events-none opacity-50" : ""}
            onClick={e => hasPreviousPage && navigate(e, currentPage - 1)}
          />
        </PaginationItem>
        {getPageNumbers(currentPage, totalPages).map((page, i) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={hrefForPage(page)}
                isActive={page === currentPage}
                onClick={e => navigate(e, page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href={hrefForPage(currentPage + 1)}
            aria-disabled={!hasNextPage}
            className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
            onClick={e => hasNextPage && navigate(e, currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
