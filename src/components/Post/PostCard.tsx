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
  const isPast = isPastDate(
    startsAt ?? Date.now().toLocaleString(),
    workhour ?? 0,
  );
  const isDimmed = closed || isPast;

  const timeRange =
    startsAt && workhour !== undefined
      ? formatTimeRange(startsAt, workhour)
      : "";

  return (
    <article
      className={cn(
        "grid p-5 md:p-6 lg:grid-cols-[1fr_346px] lg:gap-[31px] rounded-2xl",
        backgroundColor,
        backgroundColor === "#ffffff" && "border border-gray-20 shadow-sm",
      )}
    >
      <div className="relative w-full overflow-hidden rounded-xl">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-[180px] object-cover md:h-[360px] lg:h-[308px]"
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
      <div className="flex flex-col justify-between mt-3 h-[251px] md:mt-4 md:h-[252px] lg:h-[292px]">
        <div className="space-y-2 md:space-y-3">
          {!isShopInfo ? (
            <>
              <div className="flex flex-col gap-[2px]">
                <p className="mb-2 text-primary body2-bold md:body1-bold">
                  시급
                </p>
                <div className="flex items-center gap-2">
                  <h2 className="text-[20px] font-bold md:text-[28px]">
                    {hourlyPay?.toLocaleString()}원
                  </h2>
                  {!closed && (
                    <span className="inline-flex items-center gap-[2px] rounded-[20px] bg-primary px-3 py-1 text-[12px] font-normal leading-[16px] text-white md:body2-bold">
                      {rateText}
                      <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-[6px] text-gray-50 sm:body2-regular md:body1-regular">
                <Time className="w-4 h-4 md:w-5 md:h-5" />
                {timeRange}
              </div>
            </>
          ) : (
            <p className="text-primary body2-bold md:body1-bold">식당</p>
          )}
          {isShopInfo && <h2 className="text-[28px] font-bold">{name}</h2>}
          <div className="flex items-center gap-[6px] text-gray-50 sm:body2-regular md:body1-regular">
            <Location className="w-4 h-4 md:w-5 md:h-5" />
            {address1}
          </div>
          <p className="text-black sm:body2-regular md:body1-regular">
            {description}
          </p>
        </div>
        {buttons && <div className="flex gap-2 mt-3">{buttons}</div>}
      </div>
    </article>
  );
}
