import type { PostData } from "@/components/Post/PostList";
import PostListSlider from "@/components/Post/PostListSlider";
import type { NoticeWithoutUserApplication } from "@/types/notice";

interface CustomNoticeSectionProps {
  customNotices: NoticeWithoutUserApplication[];
}

function CustomNoticeSection({ customNotices }: CustomNoticeSectionProps) {
  if (customNotices.length === 0) return null;

  const posts: PostData[] = customNotices.map((notice) => {
    const shop = notice.shop?.item;

    return {
      id: notice.id,
      name: shop?.name ?? "이름 없음",
      imageUrl: shop?.imageUrl ?? "",
      address1: shop?.address1 ?? "",
      description: notice.description ?? "",
      originalHourlyPay: 0,
      hourlyPay: notice.hourlyPay,
      startsAt: notice.startsAt,
      workhour: notice.workhour,
      closed: notice.closed,
      link: `/notice/${shop?.id}/${notice.id}/employee`,
    };
  });

  return <PostListSlider posts={posts} />;
}

export default CustomNoticeSection;
