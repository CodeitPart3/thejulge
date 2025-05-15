import { useEffect, useRef, useState } from "react";

import AlertCard from "./AlertCard";
import useAlerts from "./hooks/useAlerts";

import {
  Active as ActiveAlarmIcon,
  Close,
  Inactive as InactiveAlarmIcon,
} from "@/assets/icon";
import useIntersection from "@/hooks/useIntersection";
import useOutsideClick from "@/hooks/useOutsideClick";
import useRemoveTopPageScroll from "@/hooks/useRemoveTopPageScroll";

interface AlertProps {
  userId: string;
}

function Alert({ userId }: AlertProps) {
  const { isLoading, hasNext, hasAlarm, refetch, alerts, totalCount } =
    useAlerts({
      userId,
    });
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [hasUnreadAlarm, setHasUnreadAlarm] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const targetRef = useIntersection<HTMLDivElement>({
    callback: ([entry]) => {
      if (entry.isIntersecting && !isLoading && hasNext) {
        refetch();
      }
    },
  });

  const onToggleAlarm = () => {
    setShowDropdown((prev) => !prev);
  };

  useOutsideClick({
    refs: [wrapperRef, buttonRef],
    callback: () => setShowDropdown(false),
  });

  useRemoveTopPageScroll({
    observeDevices: ["mobile"],
    condition: showDropdown,
  });

  useEffect(() => {
    setHasUnreadAlarm(hasAlarm);
  }, [hasAlarm]);

  useEffect(() => {
    setHasUnreadAlarm(false);
  }, [showDropdown]);

  return (
    <div className="relative flex items-center justify-center">
      <button
        ref={buttonRef}
        className="cursor-pointer"
        onClick={onToggleAlarm}
      >
        {hasUnreadAlarm ? (
          <ActiveAlarmIcon className="h-6" />
        ) : (
          <InactiveAlarmIcon className="h-6" />
        )}
      </button>
      {showDropdown && (
        <div
          ref={wrapperRef}
          className="fixed sm:absolute inset-0 sm:inset-auto sm:top-8 sm:right-0 z-20 sm:w-[23rem] sm:h-[26.875rem] py-6 px-5 sm:rounded-[0.625rem] bg-red-10 border border-gray-30 text-left"
        >
          <p className="flex justify-between mb-4 text-left text-xl">
            알림 {totalCount}개
            <Close
              className="sm:hidden w-6 h-6 cursor-pointer"
              onClick={onToggleAlarm}
            />
          </p>
          <ul className="flex flex-col gap-2 h-[calc(100%-2.75rem)] sm:h-[20.625rem] font-normal overflow-y-auto">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} userId={userId} alert={alert} />
            ))}
            <div ref={targetRef} />
            {isLoading && "로딩 중 ..."}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Alert;
