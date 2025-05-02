import ShopInfoPostCardSkeleton from "./ShopInfoPostCardSkeleton";

import {
  postApplication,
  putApplication,
} from "@/apis/services/applicationService";
import Button from "@/components/Button";
import PostCard from "@/components/Post/PostCard";
import useNoticeInfo from "@/hooks/useNoticeInfo";
import { cn } from "@/utils/cn";
import { isPastDate } from "@/utils/datetime";

interface NoticeDetailInfoProps {
  shopId: string;
  noticeId: string;
}

function NoticeDetailInfo({ shopId, noticeId }: NoticeDetailInfoProps) {
  const { noticeInfo, isLoading: isLoadingNoticeInfo } = useNoticeInfo({
    shopId,
    noticeId,
  });

  if (!noticeInfo?.shop || isLoadingNoticeInfo) {
    return <ShopInfoPostCardSkeleton />;
  }

  const {
    hourlyPay,
    startsAt,
    workhour,
    closed,
    description,
    currentUserApplication,
  } = noticeInfo;

  const {
    name,
    imageUrl,
    address1,
    originalHourlyPay,
    description: shopDescription,
  } = noticeInfo.shop.item;

  const applicationStatus = currentUserApplication?.item.status;
  const applicationId = currentUserApplication?.item.id;
  const isPast = isPastDate(startsAt, workhour);
  const isDisabledNotice = isPast || closed || applicationStatus === "canceled";

  const applyNotice = async () => {
    const result = await postApplication(shopId, noticeId);

    if (result.status === 201) {
      // Modal 병합 후 모달로 변경 예정
      alert("신청이 완료 되었습니다.");
    }
  };

  const cancelApplication = async () => {
    const result = await putApplication(
      shopId,
      noticeId,
      applicationId ?? "",
      "canceled",
    );

    if (result.status === 200) {
      // Modal 병합 후 모달로 변경 예정
      alert("취소가 완료 되었습니다.");
    }
  };

  return (
    <>
      {!isLoadingNoticeInfo && (
        <>
          <div className="flex flex-col gap-2 mb-1 md:mb-0">
            <span className="inline-block text-sm md:text-base text-primary font-bold leading-5">
              식당
            </span>
            <h2 className="text-xl md:text-[1.625rem] font-bold">{name}</h2>
          </div>
          {noticeInfo && (
            <PostCard
              name={name}
              imageUrl={imageUrl}
              address1={address1}
              description={shopDescription}
              hourlyPay={hourlyPay}
              originalHourlyPay={originalHourlyPay}
              startsAt={startsAt}
              workhour={workhour}
              closed={closed}
              buttons={
                <Button
                  disabled={isDisabledNotice}
                  className={cn("py-[14px]", {
                    "cursor-pointer": !isDisabledNotice,
                  })}
                  fullWidth
                  variant={
                    applicationStatus === "pending" ? "white" : "primary"
                  }
                  onClick={
                    applicationStatus === "pending"
                      ? cancelApplication
                      : applyNotice
                  }
                >
                  {applicationStatus === "pending" && "취소하기"}
                  {applicationStatus === "accepted" && "승낙"}
                  {applicationStatus === "rejected" && "지원 거절"}
                  {applicationStatus === "canceled" && "지원 취소"}
                  {!applicationStatus && isDisabledNotice && "신청 불가"}
                  {!applicationStatus && !closed && !isPast && "지원하기"}
                </Button>
              }
            />
          )}
          <div className="flex flex-col gap-3 p-8 bg-gray-10 text-black rounded-xl">
            <span className="font-bold leading-5">공고 설명</span>
            <p className="leading-[1.625rem]">{description}</p>
          </div>
        </>
      )}
    </>
  );
}

export default NoticeDetailInfo;
