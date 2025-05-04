import { forwardRef, Ref, useState } from "react";

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
    const [readStatus, setReadStatus] = useState(read);

    const targetRef = useIntersection({
      callback: async ([entry]) => {
        if (entry.isIntersecting && userId && !read) {
          const result = await putAlert(userId, id);

          if (result.status === 200) {
            setReadStatus(result.data.items[0].item.read);
          }
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
            readStatus ? "bg-blue-20" : "bg-red-40",
          )}
        />
        <p className="text-sm">
          {shop.item.name}(
          {formatTimeRange(notice.item.startsAt, notice.item.workhour)}) 공고
          지원이{" "}
          <strong
            className={result === "accepted" ? "text-blue-20" : "text-red-40"}
          >
            {result === "accepted" ? "승인" : "거절"}
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
