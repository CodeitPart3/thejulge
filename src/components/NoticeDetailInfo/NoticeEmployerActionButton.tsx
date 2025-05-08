import { useNavigate } from "react-router-dom";

import Button from "../Button";

interface NoticeEmployerActionButtonProps {
  noticeId: string;
  isMyShop: boolean;
  isStartApplication: boolean;
}

function NoticeEmployerActionButton({
  noticeId,
  isMyShop,
  isStartApplication,
}: NoticeEmployerActionButtonProps) {
  const navigate = useNavigate();

  const moveToEditNoticePage = () => {
    navigate(`/notice/edit/${noticeId}`);
  };

  return (
    <Button
      fullWidth
      variant="white"
      className={"py-[14px]"}
      onClick={moveToEditNoticePage}
      disabled={!isMyShop || isStartApplication}
    >
      {isMyShop && !isStartApplication
        ? "공고 편집하기"
        : "이미 지원이 시작된 공고입니다."}
      {!isMyShop && "다른 가게의 공고 편집 불가"}
    </Button>
  );
}

export default NoticeEmployerActionButton;
