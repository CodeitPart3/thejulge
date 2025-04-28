import { MouseEvent } from "react";

import Button from "@/components/Button";

interface EmptyStateCardProps {
  description?: string;
  buttonName: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function EmptyStateCard({
  description,
  buttonName,
  onClick,
}: EmptyStateCardProps) {
  return (
    <div className="flex flex-col items-center gap-6 w-full py-[3.75rem] border-[1px] border-gray-20 rounded-xl text-black">
      <p className="leading-[1.625rem]">{description}</p>
      <Button onClick={onClick} className="py-3.5 px-[6.875rem] cursor-pointer">
        {buttonName}
      </Button>
    </div>
  );
}

export default EmptyStateCard;
