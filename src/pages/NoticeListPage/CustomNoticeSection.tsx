import { useEffect, useState } from "react";

import { CUSTOM_NOTICE_LIMIT } from "../NoticeListPage/constants";

import { getNotices } from "@/apis/services/noticeService";
import type { PostData } from "@/components/Post/PostList";
import PostListSlider from "@/components/Post/PostListSlider";
import { useTempUserInfoStore } from "@/store/useTempUserInfoStore";
import type { NoticeWithoutUserApplication } from "@/types/notice";

interface CustomNoticeSectionProps {
  customNotices: NoticeWithoutUserApplication[];
}

function CustomNoticeSection({ customNotices }: CustomNoticeSectionProps) {
  const { address } = useTempUserInfoStore();
  const [customNoticeList, setCustomNoticeList] = useState<
    NoticeWithoutUserApplication[]
  >([]);

  useEffect(() => {
    if (!address) return;

    const fetchCustomNotices = async () => {
      try {
        const res = await getNotices({
          address,
          sort: "time",
          limit: CUSTOM_NOTICE_LIMIT,
        });

        const now = new Date();

        const filtered = res.data.items
          .map(({ item }) => item)
          .filter((notice) => {
            const isClosed = notice.closed === true;
            const isPast = new Date(notice.startsAt) < now;
            return !isClosed && !isPast;
          });

        setCustomNoticeList(filtered);
      } catch (err) {
        console.error("맞춤 공고 조회 실패", err);
      }
    };

    fetchCustomNotices();
  }, [address]);

  if (customNotices.length === 0) return null;

  const posts: PostData[] = customNoticeList.map((notice) => {
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
