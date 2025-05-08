import { useEffect, useState } from "react";

import { AxiosError } from "axios";

import { getShopNotices } from "@/apis/services/noticeService";
import { getUser } from "@/apis/services/userService";
import { useUserStore } from "@/store/useUserStore";

export type ShopItem = {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
};

export type NoticeItem = {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
};

export function useShopData() {
  const { user, updateShopId } = useUserStore();

  const [shop, setShop] = useState<ShopItem | null>(null);
  const [notices, setNotices] = useState<NoticeItem[]>([]);

  const [isShopLoading, setIsShopLoading] = useState(true);
  const [isNoticeLoading, setIsNoticeLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const LIMIT = 6;

  useEffect(() => {
    const fetchUserAndShop = async () => {
      try {
        if (user && user.id) {
          const res = await getUser(user.id);
          const shopItem = res.data.item.shop?.item;
          if (shopItem) {
            setShop(shopItem);
            updateShopId(shopItem.id);
          } else {
            setShop(null);
          }
        }
      } catch (error: unknown) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.log(
          axiosError.response?.data?.message ?? "알 수 없는 에러 발생",
        );
        setShop(null);
      } finally {
        setIsShopLoading(false);
      }
    };

    fetchUserAndShop();
  }, [user?.id]);

  useEffect(() => {
    const fetchNotices = async () => {
      if (!hasNext || loadingMore || !shop) return;
      setLoadingMore(true);
      if (offset === 0) setIsNoticeLoading(true);

      try {
        const res = await getShopNotices(shop.id, offset, LIMIT);
        const noticeItems = res.data.items.map((wrapper) => wrapper.item);
        setNotices((prev) => [...prev, ...noticeItems]);
        setHasNext(res.data.hasNext);
      } catch (error: unknown) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.log(
          axiosError.response?.data?.message ?? "알 수 없는 에러 발생",
        );
        setNotices([]);
      } finally {
        setLoadingMore(false);
        setIsNoticeLoading(false);
      }
    };
    if (shop) fetchNotices();
  }, [offset, shop?.id]);

  return {
    user,
    shop,
    notices,
    isShopLoading,
    isNoticeLoading,
    loadingMore,
    hasNext,
    setOffset,
    offset,
    LIMIT,
  };
}
