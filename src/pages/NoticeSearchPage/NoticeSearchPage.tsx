import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { getNotices } from "@/apis/services/noticeService";
import Pagination from "@/components/Pagination";
import type { PostData } from "@/components/Post/PostList";
import PostList from "@/components/Post/PostList";
import { useUserStore } from "@/hooks/useUserStore";
import NoticeSearchResultHeader from "@/pages/NoticeSearchPage/NoticeSearchResultHeader";
import { useFilterStore } from "@/store/useFilterStore";
import type { SortKey } from "@/types/notice";

const ITEM_PER_PAGE = 6;

export default function NoticeSearchPage() {
  const user = useUserStore((state) => state.user);
  const userType = user?.type === "employer" ? "employer" : "employee";

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const page = Number(searchParams.get("page") ?? 1);

  const getFilters = useFilterStore((state) => state.getFilters);

  const [selectedSort, setSelectedSort] = useState<SortKey>("time");
  const [searchedPosts, setSearchedPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchNotices = async (page: number, sort: SortKey) => {
    setLoading(true);
    const { address, hourlyPayGte, startsAtGte } = getFilters();

    try {
      const offset = (page - 1) * ITEM_PER_PAGE;
      const res = await getNotices({
        offset,
        limit: ITEM_PER_PAGE,
        sort,
        keyword,
        address: address ?? undefined,
        hourlyPayGte: hourlyPayGte ?? undefined,
        startsAtGte: startsAtGte ?? undefined,
      });

      const items = res.data.items.map(({ item }) => {
        const shop = item.shop?.item;
        return {
          id: item.id,
          name: shop?.name ?? "",
          imageUrl: shop?.imageUrl ?? "",
          address1: shop?.address1 ?? "",
          description: shop?.description ?? "",
          originalHourlyPay: shop?.originalHourlyPay ?? 0,
          hourlyPay: item.hourlyPay,
          startsAt: item.startsAt,
          workhour: item.workhour,
          closed: item.closed,
          link: `/notice/${shop?.id}/${item.id}/${userType}`,
        };
      });

      setSearchedPosts(items);
      setTotal(res.data.count);
    } catch (err) {
      console.error("공고 전체 조회 실패", err);
      setSearchedPosts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices(page, selectedSort);
  }, [page, selectedSort, keyword]);

  const handleSortChange = (value: SortKey) => {
    setSelectedSort(value);
  };

  const refetchFilterNotices = () => {
    fetchNotices(page, selectedSort);
  };

  return (
    <section className="w-full px-4 pt-10 sm:pt-15 pb-15 sm:pb-[7.5rem]">
      <div className="max-w-[66.25rem] mx-auto flex flex-col">
        <NoticeSearchResultHeader
          page={page}
          keyword={keyword}
          selectedSort={selectedSort}
          onChangeSort={handleSortChange}
          refetch={refetchFilterNotices}
        />

        <div className="min-h-[33.5rem] sm:min-h-[48.75rem]">
          {loading && (
            <p className="text-center text-gray-400 pt-40 sm:pt-60">
              공고 불러오는 중
            </p>
          )}

          {!loading &&
            (searchedPosts.length > 0 ? (
              <PostList posts={searchedPosts} />
            ) : (
              <p className="text-center text-gray-400 pt-40 sm:pt-60">
                조건에 맞는 공고가 없어요.
              </p>
            ))}
        </div>

        <div className={"flex justify-center mt-8"}>
          <Pagination count={total} itemCountPerPage={ITEM_PER_PAGE} />
        </div>
      </div>
    </section>
  );
}
