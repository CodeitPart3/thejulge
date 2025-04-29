import { ApplicationStatus } from "../types";

import { cn } from "@/utils/cn";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

const statusMap: {
  [key in ApplicationStatus]: { text: string; className: string };
} = {
  accepted: { text: "승인 완료", className: "bg-blue-10 text-blue-20" },
  pending: { text: "대기중", className: "bg-green-10 text-green-20" },
  canceled: { text: "취소", className: " bg-yellow-100 text-yellow-500" },
  rejected: { text: "거절", className: "bg-red-40 text-red-10" },
} as const;

function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block py-1.5 px-2.5 rounded-full text-xs md:text-sm font-bold",
        statusMap[status].className,
      )}
    >
      {statusMap[status].text}
    </span>
  );
}

export default ApplicationStatusBadge;
