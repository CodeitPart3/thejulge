import { Link } from "react-router-dom";

import { Location, Time, ArrowUp, ArrowUpBold } from "@/assets/icon";
import { cn } from "@/utils/cn";
import { formatTimeRange, isPastDate } from "@/utils/datetime";
import { getPayRateText } from "@/utils/payRate";

interface PostProps {
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

export default function Post({
  name,
  imageUrl,
  address1,
  originalHourlyPay,
  link,
  hourlyPay,
  startsAt,
  workhour,
  closed,
}: PostProps) {
  const timeRange = formatTimeRange(startsAt, workhour);
  const isPast = isPastDate(startsAt);
  const isDimmed = closed || isPast;
  const { displayRate, rateText } = getPayRateText(
    hourlyPay,
    originalHourlyPay,
  );

  return (
    <Link to={link} className="no-underline text-inherit block">
      <article
        className={cn(
          "relative flex w-full flex-col rounded-xl border border-gray-20 bg-white p-3 shadow-md transition hover:shadow-lg sm:p-4",
        )}
      >
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-[84px] overflow-hidden rounded-xl object-cover sm:h-40"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/default-image.png";
            }}
          />
          {isDimmed && (
            <h3 className="absolute inset-0 flex items-center justify-center rounded-md bg-black/70 text-sm text-gray-30 sm:text-[28px]">
              {closed ? "마감 완료" : "지난 공고"}
            </h3>
          )}
        </div>

        <div className={cn(isDimmed && "opacity-20")}>
          <div className="mt-3 flex flex-col gap-2 sm:mt-5">
            <h3 className="text-base sm:text-xl">{name}</h3>
            <p className="flex items-start gap-[6px] text-xs font-normal text-gray-50 sm:text-[14px] sm:leading-[22px]">
              <Time className="h-4 w-4 sm:h-5 sm:w-5" />
              {timeRange}
            </p>
            <p className="flex items-start gap-[6px] text-xs font-normal text-gray-50 sm:text-[14px] sm:leading-[22px]">
              <Location className="h-4 w-4 sm:h-5 sm:w-5" />
              {address1}
            </p>
          </div>

          <div className="mt-4 flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg sm:text-2xl">
              {hourlyPay.toLocaleString()}원
            </h2>

            <span
              className={cn(
                "mt-[5px] flex items-center gap-[2px] text-xs font-normal text-red-40 sm:text-sm sm:text-white sm:px-3 sm:py-2 sm:rounded-[20px]",
                displayRate >= 50
                  ? "sm:bg-red-40"
                  : displayRate >= 25
                    ? "sm:bg-red-30"
                    : "sm:bg-red-20",
                displayRate > 0 ? "" : "opacity-0",
              )}
            >
              {rateText}
              <ArrowUp className="hidden h-5 w-5 sm:block" />
              <ArrowUpBold className="h-4 w-4 sm:hidden" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
