import { cn } from "@/utils/cn";
import { formatTimeRange } from "@/utils/datetime";
import IconLocation from "@/assets/icon/location.svg?react";
import IconTime from "@/assets/icon/time.svg?react";
import IconArrow from "@/assets/icon/arrow-up.svg?react";

const getPayRateText = (hourlyPay?: number, originalPay?: number): string => {
  if (hourlyPay === undefined || originalPay === undefined) {
    return "";
  }

  const rawRate = ((hourlyPay - originalPay) / originalPay) * 100;
  const displayRate = Math.min(Math.round(rawRate), 100);
  return `기존 시급보다 ${displayRate}%`;
};

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
  children?: React.ReactNode;
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
  children = null,
}: PostCardProps) {
  const rateText = getPayRateText(hourlyPay, originalHourlyPay);

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
      <div className="w-full overflow-hidden rounded-xl">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-[180px] object-cover md:h-[360px] lg:h-[308px]"
        />
      </div>
      <div className="flex flex-col justify-between mt-3 h-[251px] md:mt-4 md:h-[252px] lg:h-[292px]">
        <div className="space-y-2 md:space-y-3">
          {!isShopInfo ? (
            <>
              <div className="flex flex-col gap-[2px]">
                <p className="text-primary body2-bold md:body1-bold">시급</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-[20px] font-bold md:text-[28px]">
                    {hourlyPay?.toLocaleString()}원
                  </h2>
                  <span className="inline-flex items-center gap-[2px] rounded-[20px] bg-primary px-3 py-1 text-[12px] font-normal leading-[16px] text-white md:body2-bold">
                    {rateText}
                    <IconArrow className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-[6px] text-gray-50 body2-regular md:body1-regular">
                <IconTime className="w-4 h-4 md:w-5 md:h-5" />
                {timeRange}
              </div>
            </>
          ) : (
            <p className="text-primary body2-bold md:body1-bold">식당</p>
          )}
          {isShopInfo && <h2 className="text-[28px] font-bold">{name}</h2>}
          <div className="flex items-center gap-[6px] text-gray-50 body2-regular md:body1-regular">
            <IconLocation className="w-4 h-4 md:w-5 md:h-5" />
            {address1}
          </div>
          <p className="text-black body2-regular md:body1-regular">
            {description}
          </p>
        </div>
        {children && <div className="flex gap-2 mt-3">{children}</div>}
      </div>
    </article>
  );
}
