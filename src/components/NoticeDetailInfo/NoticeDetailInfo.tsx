import NoticeEmployeeActionButton from "./NoticeEmployeeActionButton";
import NoticeEmployerActionButton from "./NoticeEmployerActionButton";

import PostCard from "@/components/Post/PostCard";
import { APPLICATION_STATUS } from "@/constants/applicationStatus";
import { User } from "@/hooks/useUserStore";
import { NoticeItem } from "@/types/notice";
import { cn } from "@/utils/cn";
import { isPastDate } from "@/utils/datetime";

interface NoticeDetailInfoCardProps {
  noticeInfo: NoticeItem;
  shopId: string;
  noticeId: string;
  user?: User | null;
  isEmployerPage?: boolean;
}

function NoticeDetailInfoCard({
  shopId,
  noticeId,
  noticeInfo,
  user,
  isEmployerPage,
}: NoticeDetailInfoCardProps) {
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

  const applicationId = currentUserApplication?.item.id ?? "";
  const applicationStatus = currentUserApplication?.item.status;
  const isPast = isPastDate(startsAt, workhour);
  const isDisabledNotice =
    isPast ||
    closed ||
    applicationStatus === APPLICATION_STATUS.CANCELED ||
    applicationStatus === APPLICATION_STATUS.REJECTED;

  return (
    <>
      <div className="flex flex-col gap-2 mb-1 sm:mb-0">
        <span className="inline-block text-sm sm:text-base text-primary font-bold leading-5">
          식당
        </span>
        <h2 className="text-xl sm:text-[1.625rem] font-bold">{name}</h2>
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
            isEmployerPage ? (
              <NoticeEmployerActionButton
                userShopId={user?.shopId}
                noticeShopId={shopId}
                noticeId={noticeId}
              />
            ) : (
              <NoticeEmployeeActionButton
                shopId={shopId}
                noticeId={noticeId}
                applicationId={applicationId}
                applicationStatus={applicationStatus}
                isDisabledNotice={isDisabledNotice}
              />
            )
          }
        />
      )}
      <div className="flex flex-col gap-3 p-8 bg-gray-10 text-black rounded-xl">
        <span className="font-bold leading-5">공고 설명</span>
        <p
          className={cn("leading-[1.625rem]", { "text-gray-30": !description })}
        >
          {description ? description : "(등록된 공고 설명이 없습니다.)"}
        </p>
      </div>
    </>
  );
}

export default NoticeDetailInfoCard;
