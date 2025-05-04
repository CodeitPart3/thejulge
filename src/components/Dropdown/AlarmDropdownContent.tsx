import { useEffect } from "react";

import { useAlarmStore } from "@/store/useAlarmStore";

export default function AlarmDropdownContent({
  onClose,
}: {
  onClose: () => void;
}) {
  const { alarms, markAllAsRead } = useAlarmStore();

  useEffect(() => {
    markAllAsRead();
  }, [markAllAsRead]);

  return (
    <div className="flex flex-col gap-4 text-sm text-black">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">알림 {alarms.length}개</span>
        <button onClick={onClose}>✕</button>
      </div>

      {alarms.length === 0 ? (
        <div className="text-center text-gray-400 py-6">알림이 없습니다.</div>
      ) : (
        <ul className="flex flex-col gap-3 overflow-y-auto max-h-[20rem] pr-1">
          {alarms.map((alarm) => (
            <li
              key={alarm.id}
              className="border border-gray-200 bg-white p-3 rounded-md  w-full h-[6.5rem]"
              onClick={() => {
                onClose();
              }}
            >
              <div className="flex flex-col items-start gap-2 mb-1">
                <span
                  className={`w-2 h-2 mt-1 rounded-full ${alarm.status === "승인" ? "bg-blue-400" : "bg-red-400"}`}
                />
                <p className="text-sm leading-snug break-keep">
                  {alarm.message}{" "}
                  <span
                    className={`font-bold ${alarm.status === "승인" ? "text-blue-400" : "text-red-400"}`}
                  >
                    {alarm.status}
                  </span>
                  되었어요.
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-auto">{alarm.createdAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
