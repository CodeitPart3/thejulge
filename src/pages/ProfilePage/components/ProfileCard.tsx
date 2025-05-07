import { MouseEvent } from "react";

import { Location, Phone } from "@/assets/icon";
import Button from "@/components/Button";
import { UserSummary } from "@/types/user";
import { cn } from "@/utils/cn";

interface ProfileCardProps extends UserSummary {
  onClick?: (e: MouseEvent) => void;
  className?: string;
}

function ProfileCard({
  name,
  phone,
  address,
  bio,
  className,
  onClick,
}: ProfileCardProps) {
  return (
    <div
      className={cn(
        "flex-1 p-5 md:p-8 bg-red-10 rounded-xl text-black",
        className,
      )}
    >
      <div className="flex mb-2 md:mb-3">
        <div className="flex-1">
          <span className="text-sm md:text-[1rem] inline-block font-bold leading-5 text-red-40">
            이름
          </span>
          <p className="font-bold text-2xl md:text-[1.75rem]">{name}</p>
        </div>
        <div>
          <Button
            variant="white"
            className="py-2.5 md:py-3.5 px-7 md:px-[3.5rem] cursor-pointer"
            onClick={onClick}
          >
            편집하기
          </Button>
        </div>
      </div>
      <div className="mb-2 md:mb-3 flex items-center gap-1.5 text-sm md:text-[1rem] text-gray-50">
        <Phone className="w-4 md:w-5 h-4 md:h-5" /> {phone}
      </div>
      <div className="mb-5 md:mb-7 flex items-center gap-1.5 text-sm md:text-[1rem] text-gray-50">
        <Location className="w-4 md:w-5 h-4 md:h-5" /> 선호 지역: {address}
      </div>
      <p
        className={cn("text-sm md:text-[1rem]", {
          "text-gray-30": !bio,
        })}
      >
        {bio ? bio : "(등록된 공고가 없습니다.)"}
      </p>
    </div>
  );
}

export default ProfileCard;
