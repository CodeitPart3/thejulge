import {
  postApplication,
  putApplication,
} from "@/apis/services/applicationService";
import Button from "@/components/Button";
import PostCard from "@/components/Post/PostCard";
import { useToast } from "@/hooks/useToast";
import { useModalStore } from "@/store/useModalStore";
import { NoticeItem } from "@/types/notice";
import { cn } from "@/utils/cn";
import { isPastDate } from "@/utils/datetime";

interface NoticeDetailInfoProps {
  noticeInfo: NoticeItem;
  shopId: string;
  noticeId: string;
}

function NoticeDetailInfo({
  shopId,
  noticeId,
  noticeInfo,
}: NoticeDetailInfoProps) {
  const { openModal } = useModalStore();
  const { showToast } = useToast();

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
  } = noticeInfo.shop!.item;

  const applicationId = currentUserApplication?.item.id;
  const applicationStatus = currentUserApplication?.item.status;
  const isPast = isPastDate(startsAt, workhour);
  const isDisabledNotice = isPast || closed || applicationStatus === "canceled";

  const applyNotice = async () => {
    const result = await postApplication(shopId, noticeId);

    if (result.status === 201) {
      showToast("신청 완료!");
    }
  };

  const cancelApplication = () => {
    openModal({
      type: "confirm",
      confirmText: "취소하기",
      cancelText: "아니오",
      iconType: "warning",
      message: "신청을 취소하시겠어요?",
      onConfirm: async () => {
        const result = await putApplication(
          shopId,
          noticeId,
          applicationId ?? "",
          "canceled",
        );

        if (result.status === 200) {
          showToast("취소가 완료 되었습니다.");
        }
      },
    });
  };

  return (
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
              variant={applicationStatus === "pending" ? "white" : "primary"}
              onClick={
                applicationStatus === "pending"
                  ? cancelApplication
                  : applyNotice
              }
            >
              {applicationStatus === "pending" && "취소하기"}
              {applicationStatus === "accepted" && "승낙"}
              {applicationStatus === "rejected" && "지원 거절"}
              {applicationStatus === "canceled" &&
                "이미 취소한 지원 공고 입니다."}
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
  );
}

export default NoticeDetailInfo;
