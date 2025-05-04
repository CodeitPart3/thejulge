import { useSearchParams } from "react-router-dom";

import useNoticeList from "../../hooks/useNoticeList";

import CustomNoticeSection from "./CustomNoticeSection";
import TotalNoticeSection from "./TotalNoticeSection";

import PageNation from "@/components/Pagination";
import { useUserStore } from "@/hooks/useUserStore";

export default function NoticeListPage() {
  const [searchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page") ?? "1");

  const {
    notices,
    total,
    selectedSort,
    setSelectedSort,
    customNotices,
    setPage,
  } = useNoticeList(pageFromUrl);

  const paginatedNotices = notices;
  const { isLoggedIn } = useUserStore();
  return (
    <section className="w-full space-y-16">
      {isLoggedIn && customNotices.length > 0 && (
        <CustomNoticeSection customNotices={customNotices} />
      )}

      <TotalNoticeSection
        notices={paginatedNotices}
        total={total}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        page={pageFromUrl}
        setPage={setPage}
      />

      <div className={"flex justify-center mt-8"}>
        <PageNation count={total} itemCountPerPage={7} />
      </div>
    </section>
  );
}
