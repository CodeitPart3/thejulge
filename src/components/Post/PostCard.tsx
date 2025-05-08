import { Location, Time, ArrowUp } from "@/assets/icon";
import { cn } from "@/utils/cn";
import { formatTimeRange, isPastDate } from "@/utils/datetime";
import { getPayRateText } from "@/utils/payRate";

interface PostCardProps {
  name: string;
  imageUrl: string;
  address1: string;
  description: string;
  originalHourlyPay?: number;
  hourlyPay?: number;
  startsAt?: string;
  workhour?: number;
  isShopInfo?: boolean;
  backgroundColor?: string;
  buttons?: React.ReactNode;
  closed?: boolean;
}

export default function PostCard({
  name,
  imageUrl,
  address1,
  description,
  hourlyPay,
  originalHourlyPay,
  startsAt,
  workhour,
  isShopInfo = false,
  backgroundColor = "#ffffff",
  buttons = null,
  closed,
}: PostCardProps) {
  const { rateText } = getPayRateText(hourlyPay, originalHourlyPay);
  const isPast = isPastDate(startsAt ?? Date.now().toLocaleString());
  const isDimmed = closed || isPast;

  const timeRange =
    startsAt && workhour !== undefined
      ? formatTimeRange(startsAt, workhour)
      : "";

  return (
    <article
      className={cn(
        "grid p-5 sm:p-6 lg:grid-cols-[1fr_346px] lg:gap-[31px] rounded-2xl",
        backgroundColor,
        backgroundColor === "#ffffff" && "border border-gray-20 shadow-sm",
      )}
    >
      <div className="relative w-full overflow-hidden rounded-xl h-auto">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-[180px] object-cover sm:h-[360px] lg:h-full"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/default-image.png";
          }}
        />
        {isDimmed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black opacity-70">
            <p className="text-[1.75rem] text-gray-30 font-bold">
              {!closed && isPast && "지난 공고"}
              {closed && !isPast && "마감 완료"}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between mt-3 sm:mt-4 lg:h-auto">
        <div className="space-y-2 sm:space-y-3 flex-1">
          {!isShopInfo ? (
            <>
              <div className="flex flex-col gap-[2px]">
                <p className="mb-2 text-primary body2-bold sm:body1-bold">
                  시급
                </p>
                <div className="flex items-center gap-2">
                  <h2 className="text-[20px] font-bold sm:text-[28px]">
                    {hourlyPay?.toLocaleString()}원
                  </h2>
                  {!closed && (
                    <span className="inline-flex items-center gap-[2px] rounded-[20px] bg-primary px-3 py-1 text-[12px] font-normal leading-[16px] text-white sm:body2-bold">
                      {rateText}
                      <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-[6px] text-gray-50 body2-regular sm:body1-regular">
                <Time className="w-4 h-4 sm:w-5 sm:h-5" />
                {timeRange}
              </div>
            </>
          ) : (
            <p className="text-primary body2-bold sm:body1-bold">식당</p>
          )}
          {isShopInfo && <h2 className="text-[28px] font-bold">{name}</h2>}
          <div className="flex items-center gap-[6px] text-gray-50 body2-regular sm:body1-regular">
            <Location className="w-4 h-4 sm:w-5 sm:h-5" />
            {address1}
          </div>
          <p
            className={cn(
              "body2-regular sm:body1-regular break-words",
              description === "(등록된 가게 정보가 없습니다.)"
                ? "text-gray-40"
                : "text-black",
            )}
          >
            {description}
          </p>
        </div>
        {buttons && <div className="flex gap-2 mt-3">{buttons}</div>}
      </div>
    </article>
  );
}
