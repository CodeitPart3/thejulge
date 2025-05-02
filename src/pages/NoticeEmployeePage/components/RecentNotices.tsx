import PostList, { PostData } from "@/components/Post/PostList";
import useNotices from "@/hooks/useNotices";

interface RecentNoticesProps {
  shopId: string;
  noticeId: string;
}

function RecentNotices({ shopId, noticeId }: RecentNoticesProps) {
  const { notices: recentNotices, isLoading: isLoadingRecentNotices } =
    useNotices<PostData>({
      dataFormatCallback: ({ items }) =>
        items.map(({ item }) => ({
          id: item.id,
          name: item.shop?.item.name ?? "",
          imageUrl: item.shop?.item.imageUrl ?? "",
          address1: item.shop?.item.address1 ?? "",
          originalHourlyPay: item.shop?.item.originalHourlyPay ?? 0,
          link: `/notice/${item.shop?.item.id}/${item.id}/employee`,
          hourlyPay: item.hourlyPay,
          startsAt: item.startsAt,
          workhour: item.workhour,
          closed: item.closed,
        })),
      params: { sort: "hour", limit: 6 },
      deps: [shopId, noticeId],
    });

  return isLoadingRecentNotices ? (
    <div>로딩 중...</div>
  ) : (
    <PostList posts={recentNotices} />
  );
}

export default RecentNotices;
