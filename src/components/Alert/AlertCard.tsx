import { forwardRef, Ref } from "react";

import { putAlert } from "@/apis/services/alertService";
import useIntersection from "@/hooks/useIntersection";
import { AlertItem } from "@/types/alert";
import { cn } from "@/utils/cn";
import { formatTimeRange, getRelativeTimeFromNow } from "@/utils/datetime";

interface AlertCardProps {
  userId?: string;
  alert: AlertItem;
}

const AlertCard = forwardRef(
  ({ alert, userId }: AlertCardProps, ref: Ref<HTMLLIElement>) => {
    const { id, shop, notice, read, result, createdAt } = alert;

    const isAccepted = result === "accepted";

    const targetRef = useIntersection({
      callback: async ([entry]) => {
        if (entry.isIntersecting && userId && !read) {
          await putAlert(userId, id);
        }
      },
    });

    return (
      <li
        ref={ref}
        className="flex flex-col gap-1 py-3 px-3 bg-white border border-gray-20 rounded-[0.3125rem]"
      >
        <span
          className={cn(
            "inline-block my-1 w-[0.3125rem] h-[0.3125rem] rounded-full",
            isAccepted ? "bg-blue-20" : "bg-red-40",
          )}
        />
        <p className="text-sm">
          {shop.item.name}(
          {formatTimeRange(notice.item.startsAt, notice.item.workhour)}) 공고
          지원이{" "}
          <strong className={isAccepted ? "text-blue-20" : "text-red-40"}>
            {isAccepted ? "승인" : "거절"}
          </strong>
          되었어요.
        </p>
        <span ref={targetRef} className="text-xs text-gray-40">
          {getRelativeTimeFromNow(createdAt)}
        </span>
      </li>
    );
  },
);

export default AlertCard;
