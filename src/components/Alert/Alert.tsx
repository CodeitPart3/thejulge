import { useMemo, useRef, useState } from "react";

import AlertCard from "./AlertCard";
import useAlarm from "./hooks/useAlarm";

import {
  Active as ActiveAlarmIcon,
  Close,
  Inactive as InactiveAlarmIcon,
} from "@/assets/icon";
import useIntersection from "@/hooks/useIntersection";
import useOutsideClick from "@/hooks/useOutsideClick";

interface AlertProps {
  userId: string;
}

function Alert({ userId }: AlertProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoading, hasNext, refetch, alerts, totalCount } = useAlarm({
    userId,
  });

  const hasAlarm = useMemo(
    () => alerts.filter(({ read }) => !read).length > 0,
    [alerts],
  );
  const AlarmIcon = hasAlarm ? ActiveAlarmIcon : InactiveAlarmIcon;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onToggleAlarm = () => {
    setShowDropdown((prev) => !prev);
  };

  useOutsideClick({
    refs: [wrapperRef, buttonRef],
    callback: () => setShowDropdown(false),
  });

  const targetRef = useIntersection({
    callback: ([entry]) => {
      if (entry.isIntersecting && !isLoading && hasNext) {
        refetch();
      }
    },
  });

  return (
    <div className="relative flex items-center justify-center">
      <button
        ref={buttonRef}
        className="cursor-pointer"
        onClick={onToggleAlarm}
      >
        <AlarmIcon className="h-6" />
      </button>
      {showDropdown && (
        <div
          ref={wrapperRef}
          className="fixed sm:absolute inset-0 sm:inset-auto sm:top-8 sm:right-0 z-20 sm:w-[23rem] sm:h-[26.875rem] py-6 px-5 rounded-[0.625rem] bg-red-10 border border-gray-30 text-left"
        >
          <p className="flex justify-between mb-4 text-left text-xl">
            알림 {totalCount}개{" "}
            <Close
              className="md:hidden w-6 h-6 cursor-pointer"
              onClick={onToggleAlarm}
            />
          </p>
          <ul className="flex flex-col gap-2 h-[calc(100%-2.75rem)] sm:h-[20.625rem] font-normal overflow-y-auto">
            {alerts.map((alert, index) => (
              <AlertCard
                key={alert.id}
                ref={index === alerts.length - 1 ? targetRef : null}
                userId={userId}
                alert={alert}
              />
            ))}
            {isLoading && "로딩 중 ..."}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Alert;
