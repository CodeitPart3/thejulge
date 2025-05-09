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
      originalHourlyPay: shop?.originalHourlyPay ?? 0,
      hourlyPay: notice.hourlyPay,
      startsAt: notice.startsAt,
      workhour: notice.workhour,
      closed: notice.closed,
      link: `/notice/${shop?.id}/${notice.id}/employee`,
    };
  });

  return (
    <div className="bg-red-10 h-[23.75rem] sm:h-[33.375rem] lg:h-[33.375rem] mx-auto">
      <div className="pl-[2rem] pt-[2rem]  sm:pt-[4rem] lg:pt-[4rem] pt-[1rem] w-[60.25rem] mx-auto font-bold text-[1.25rem] sm:text-[1.75rem] lg:text-[1.75rem] tracking-[-0.02em]  text-black p-4 pl-0">
        맞춤 공고
      </div>
      <PostListSlider posts={posts} />
    </div>
  );
}

export default CustomNoticeSection;
