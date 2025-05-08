import { useNavigate } from "react-router-dom";

import Button from "../Button";

interface NoticeEmployerActionButtonProps {
  noticeId: string;
  isMyShop: boolean;
  isStartApplication: boolean;
  isPastNotice: boolean;
  isClosed: boolean;
}

function NoticeEmployerActionButton({
  noticeId,
  isMyShop,
  isStartApplication,
  isPastNotice,
  isClosed,
}: NoticeEmployerActionButtonProps) {
  let buttonText = "";
  let isDisabled = true;

  if (!isMyShop) {
    buttonText = "다른 가게의 공고 편집 불가";
  } else if (isPastNotice) {
    buttonText = "기간이 지난 공고입니다.";
  } else if (isClosed) {
    buttonText = "마감된 공고입니다.";
  } else if (isStartApplication) {
    buttonText = "이미 지원을 받은 공고입니다.";
  } else {
    buttonText = "공고 편집하기";
    isDisabled = false;
  }

  const navigate = useNavigate();

  const moveToEditNoticePage = () => {
    if (isMyShop && !isPastNotice && !isClosed && !isStartApplication) {
      navigate(`/notice/edit/${noticeId}`);
    }
  };

  return (
    <Button
      fullWidth
      variant="white"
      className={"py-[14px]"}
      onClick={moveToEditNoticePage}
      disabled={isDisabled}
    >
      {buttonText}
    </Button>
  );
}

export default NoticeEmployerActionButton;
