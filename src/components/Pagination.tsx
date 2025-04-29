import { useSearchParams } from "react-router-dom";

import { ArrowLeft, ArrowRight } from "@/assets/icon";
import { cn } from "@/utils/cn";

interface PaginationProps {
  /** 전체 아이템 개수 */
  count: number;
  /** 한 페이지에 보여줄 아이템 개수 */
  itemCountPerPage: number;
  /** 노출할 페이지 버튼 개수 (기본 7) – 홀수를 권장 */
  limit?: number;
}

export default function Pagination({
  count,
  itemCountPerPage,
  limit = 7,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.max(1, Math.ceil(count / itemCountPerPage));

  // limit 이 전체 페이지보다 크면 전체 페이지 수만큼만 사용
  const visibleCount = Math.min(limit, totalPages);
  const half = Math.floor(visibleCount / 2);

  /**
   * start/end 계산 – currentPage 를 중앙(slot index = half)에 배치.
   * 가장 앞/뒤 구간에서는 남는 슬롯을 앞이나 뒤로 몰아넣어 빈칸이 생기지 않도록 보정합니다.
   */
  let start = currentPage - half;
  if (start < 1) start = 1;
  let end = start + visibleCount - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - visibleCount + 1);
  }

  const pages = Array.from({ length: visibleCount }, (_, i) => start + i);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    const next = new URLSearchParams(searchParams);
    next.set("page", String(page));
    setSearchParams(next, { replace: true });
  };

  const isTotalPagesMoreThanLimit = totalPages > limit;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <ul className="flex items-center md:gap-1 sm:gap-0.5 select-none text-black">
      {isTotalPagesMoreThanLimit && (
        <li className="flex items-center mr-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={isFirstPage}
            aria-label="이전 페이지"
            className="active:scale-95 transition-transform cursor-pointer disabled:cursor-default"
          >
            <ArrowLeft
              className={cn(
                "w-5 h-5",
                isFirstPage ? "fill-gray-40" : "fill-black",
              )}
            />
          </button>
        </li>
      )}

      {pages.map((page, idx) => {
        const isActive = page === currentPage;
        return (
          <li key={idx}>
            <button
              onClick={() => goToPage(page)}
              disabled={isActive}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "md:w-10 md:h-10 sm:w-8 sm:h-8 grid place-content-center rounded-sm md:text-sm sm:text-xs",
                "cursor-pointer disabled:cursor-default transition-colors duration-150 active:scale-95",
                isActive ? "bg-red-30 text-white" : "hover:bg-gray-100",
              )}
            >
              {page}
            </button>
          </li>
        );
      })}

      {isTotalPagesMoreThanLimit && !isLastPage && (
        <li className="flex items-center ml-4">
          <button
            onClick={() => goToPage(currentPage + 1)}
            aria-label="다음 페이지"
            className="active:scale-95 transition-transform cursor-pointer disabled:cursor-default"
          >
            <ArrowRight className={cn("w-5 h-5 fill-black")} />
          </button>
        </li>
      )}
    </ul>
  );
}
