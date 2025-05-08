import { useCallback, useMemo, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import EmptyStateCard from "@/components/EmptyStateCard";
import PostCard from "@/components/Post/PostCard";
import PostList from "@/components/Post/PostList";
import { ROUTES } from "@/constants/router";
import { useUserStore } from "@/hooks/useUserStore";
import { useShopData } from "@/pages/ShopPage/hooks/useShopData";
import { useModalStore } from "@/store/useModalStore";

export interface PostListItem {
  id: string;
  name: string;
  imageUrl: string;
  address1: string;
  originalHourlyPay: number;
  link: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  closed: boolean;
}

export default function ShopPage() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore();
  const { user } = useUserStore();

  const {
    shop,
    notices,
    isShopLoading,
    isNoticeLoading,
    loadingMore,
    hasNext,
    setOffset,
    LIMIT,
  } = useShopData();

  useEffect(() => {
    if (!user) {
      openModal({
        type: "alert",
        message: "로그인 후에 이용 가능한 기능입니다.",
        iconType: "warning",
        buttons: [
          {
            label: "확인",
            style: "white",
            onClick: () => {
              closeModal();
            },
          },
        ],
        onClose: () => {
          navigate(ROUTES.AUTH.SIGNIN);
        },
      });
    } else if (user.type === "employee") {
      openModal({
        type: "alert",
        message: "사장님 계정으로만 이용 가능한 기능입니다.",
        iconType: "warning",
        buttons: [
          {
            label: "확인",
            style: "white",
            onClick: () => {
              closeModal();
            },
          },
        ],
        onClose: () => {
          navigate(ROUTES.PROFILE.ROOT);
        },
      });
    }
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);

  const postListData: PostListItem[] = useMemo(() => {
    if (!shop || notices.length === 0) return [];

    return [...notices]
      .sort(
        (a, b) =>
          new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
      )
      .map((notice) => ({
        id: notice.id,
        name: shop.name,
        imageUrl: shop.imageUrl,
        address1: shop.address1,
        originalHourlyPay: shop.originalHourlyPay,
        link: `/notice/${shop.id}/${notice.id}/employer`,
        hourlyPay: notice.hourlyPay,
        startsAt: notice.startsAt,
        workhour: notice.workhour,
        closed: notice.closed,
      }));
  }, [shop, notices]);

  const lastNoticeRef = useCallback(
    (node: HTMLDivElement) => {
      if (loadingMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setOffset((prev) => prev + LIMIT);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasNext],
  );

  return (
    <>
      <section className="lg:w-[60.25rem] lg:mx-auto px-6 lg:px-[0px] py-[3.75rem]">
        <h1 className="text-[1.75rem] font-bold mb-6">내 가게</h1>
        {isShopLoading ? null : !shop ? (
          <EmptyStateCard
            description="내 가게를 소개하고 공고도 등록해 보세요."
            buttonName="가게 등록하기"
            onClick={() => navigate(ROUTES.SHOP.REGISTER)}
          />
        ) : (
          <PostCard
            {...shop}
            description={
              shop.description && shop.description.trim() !== ""
                ? shop.description
                : "등록된 가게 정보가 없습니다"
            }
            isShopInfo={true}
            backgroundColor="bg-red-10"
            buttons={
              <>
                <Button
                  variant="white"
                  fullWidth
                  className="py-[14px]"
                  onClick={() => navigate(ROUTES.SHOP.EDIT)}
                >
                  편집하기
                </Button>
                <Button
                  fullWidth
                  className="py-[14px]"
                  onClick={() => navigate(ROUTES.NOTICE.REGISTER)}
                >
                  공고 등록하기
                </Button>
              </>
            }
          />
        )}
      </section>

      {shop && (
        <section className="flex-1 bg-gray-5">
          <div className="lg:w-[60.25rem] mx-auto px-6 lg:px-[0px] pt-[3.75rem] pb-[7.5rem]">
            <h1 className="text-[1.75rem] font-bold mb-8">등록한 공고</h1>

            {isNoticeLoading ? null : notices.length === 0 ? (
              <EmptyStateCard
                description="공고를 등록해 보세요."
                buttonName="공고 등록하기"
                onClick={() => navigate(ROUTES.NOTICE.REGISTER)}
              />
            ) : (
              <div className="flex flex-col gap-4">
                <PostList posts={postListData} />
                <div ref={lastNoticeRef} />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
