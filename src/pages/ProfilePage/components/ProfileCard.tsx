import { MouseEvent } from "react";

import { Location, Phone } from "@/assets/icon";
import Button from "@/components/Button";
import { UserSummary } from "@/types/user";

interface ProfileCardProps extends UserSummary {
  onClick?: (e: MouseEvent) => void;
}

function ProfileCard({
  // id,
  name,
  phone,
  address,
  bio,
  onClick,
}: ProfileCardProps) {
  return (
    <div className="p-8 bg-red-10 rounded-xl text-black">
      <div className="flex mb-3">
        <div className="flex-1">
          <span className="inline-block font-bold leading-5 text-red-40">
            이름
          </span>
          <p className="font-bold text-[1.75rem]">{name}</p>
        </div>
        <div>
          <Button
            variant="white"
            className="py-3.5 px-[3.5rem] cursor-pointer"
            onClick={onClick}
          >
            편집하기
          </Button>
        </div>
      </div>
      <div className="mb-3 flex items-center gap-1.5 text-gray-50">
        <Phone /> {phone}
      </div>
      <div className="mb-7 flex items-center gap-1.5 text-gray-50">
        <Location /> 선호 지역: {address}
      </div>
      <p>{bio}</p>
    </div>
  );
}

export default ProfileCard;
