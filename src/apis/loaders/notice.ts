import { getNotice, getNotices } from "../services/noticeService";

interface LoadNoticeParams {
  shopId: string;
  noticeId: string;
}

export const loadNotice = async ({ shopId, noticeId }: LoadNoticeParams) => {
  const noticeResult = await getNotice(shopId, noticeId);

  if (noticeResult.status === 200) {
    return noticeResult.data.item;
  }
};

export const loadRecentNotices = async () => {
  const recentNoticesResult = await getNotices({ sort: "hour", limit: 6 });

  if (recentNoticesResult.status === 200) {
    const recentNotices = recentNoticesResult.data.items.map(({ item }) => ({
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
    }));

    return recentNotices;
  }
};
