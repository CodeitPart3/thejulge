import { useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import useNoticeList from "../../hooks/useNoticeList";

import CustomNoticeSection from "./CustomNoticeSection";
import TotalNoticeSection from "./TotalNoticeSection";

import PageNation from "@/components/Pagination";
import { PostData } from "@/components/Post/PostList";
import { useUserStore } from "@/hooks/useUserStore";
import type { SortKey } from "@/types/notice";

export default function NoticeListPage() {
  const { user } = useUserStore();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const [selectedSort, setSelectedSort] = useState<SortKey>("time");

  const { notices, total, customNotices } = useNoticeList(page, selectedSort);

  const posts: PostData[] = useMemo(() => {
    return notices.map((notice) => {
      const shop = notice.shop?.item;
      return {
        id: notice.id,
        name: shop?.name ?? "",
        imageUrl: shop?.imageUrl ?? "",
        address1: shop?.address1 ?? "",
        description: shop?.description ?? "",
        originalHourlyPay: shop?.originalHourlyPay ?? 0,
        hourlyPay: notice.hourlyPay,
        startsAt: notice.startsAt,
        workhour: notice.workhour,
        closed: notice.closed,
        link: `/notice/${shop?.id}/${notice.id}/${
          user?.type === "employer" ? "employer" : "employee"
        }`,
      };
    });
  }, [notices, user?.type]);

  return (
    <section className="w-full space-y-16">
      {user?.type && customNotices.length > 0 && (
        <CustomNoticeSection customNotices={customNotices} />
      )}

      <TotalNoticeSection
        posts={posts}
        total={total}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        page={page}
      />

      <div className="flex justify-center mt-8">
        <PageNation count={total} itemCountPerPage={7} />
      </div>
    </section>
  );
}
