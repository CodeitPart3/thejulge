import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";
import { formatTimeRange, isPastDate } from "@/utils/datetime";
import IconTime from "@/assets/icon/time.svg?react";
import IconLocation from "@/assets/icon/location.svg?react";
import IconArrow from "@/assets/icon/arrow-up.svg?react";
import IconArrowBold from "@/assets/icon/arrow-up-bold.svg?react";

const getPayRateText = (
  hourlyPay: number,
  originalPay: number,
): {
  rawRate: number;
  displayRate: number;
  rateText: string;
} => {
  const rawRate = ((hourlyPay - originalPay) / originalPay) * 100;
  const displayRate = Math.min(Math.round(rawRate), 100);
  const rateText = `기존 시급보다 ${displayRate}%`;

  return { rawRate, displayRate, rateText };
};

interface PostListItemProps {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  closed: boolean;
  shop: {
    name: string;
    imageUrl: string;
    address1: string;
    originalHourlyPay: number;
    link: string;
  };
}

export default function PostListItem({
  hourlyPay,
  startsAt,
  workhour,
  closed,
  shop,
}: PostListItemProps) {
  const { name, address1, imageUrl, originalHourlyPay, link } = shop;

  const timeRange = formatTimeRange(startsAt, workhour);
  const isPast = isPastDate(startsAt, workhour);
  const isDimmed = closed || isPast;
  const { displayRate, rateText } = getPayRateText(
    hourlyPay,
    originalHourlyPay,
  );

  return (
    <Link to={link} className="no-underline text-inherit block">
      <article
        className={cn(
          "relative flex w-full flex-col rounded-xl border border-gray-20 bg-white p-3 shadow-md transition hover:shadow-lg md:p-4",
        )}
      >
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-[84px] overflow-hidden rounded-xl bg-cover bg-center md:h-40"
          />
          {isDimmed && (
            <h3 className="absolute inset-0 flex items-center justify-center rounded-md bg-black/70 text-sm text-gray-30 md:text-[28px]">
              {closed ? "마감 완료" : "지난 공고"}
            </h3>
          )}
        </div>

        <div className={cn(isDimmed && "opacity-20")}>
          <div className="mt-3 flex flex-col gap-2 md:mt-5">
            <h3 className="text-base md:text-xl">{name}</h3>
            <p className="flex items-start gap-[6px] text-xs font-normal text-gray-50 md:text-[14px] md:leading-[22px]">
              <IconTime className="h-4 w-4 md:h-5 md:w-5" />
              {timeRange}
            </p>
            <p className="flex items-start gap-[6px] text-xs font-normal text-gray-50 md:text-[14px] md:leading-[22px]">
              <IconLocation className="h-4 w-4 md:h-5 md:w-5" />
              {address1}
            </p>
          </div>

          <div className="mt-4 flex flex-col items-start md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg md:text-2xl">
              {hourlyPay.toLocaleString()}원
            </h2>

            {displayRate > 0 && (
              <span
                className={cn(
                  "mt-[5px] flex items-center gap-[2px] text-xs font-normal text-red-40 md:text-sm md:text-white md:px-3 md:py-2 md:rounded-[20px]",
                  displayRate >= 50
                    ? "md:bg-red-40"
                    : displayRate >= 25
                      ? "md:bg-red-30"
                      : "md:bg-red-20",
                )}
              >
                {rateText}
                <IconArrow className="hidden h-5 w-5 md:block" />
                <IconArrowBold className="h-4 w-4 md:hidden" />
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
