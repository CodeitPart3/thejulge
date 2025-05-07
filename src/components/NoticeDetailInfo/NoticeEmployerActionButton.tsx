import { useNavigate } from "react-router-dom";

import Button from "../Button";

interface NoticeEmployerActionButtonProps {
  userShopId?: string;
  noticeShopId: string;
  noticeId: string;
}

function NoticeEmployerActionButton({
  userShopId,
  noticeShopId,
  noticeId,
}: NoticeEmployerActionButtonProps) {
  const navigate = useNavigate();
  const isMyShop = userShopId === noticeShopId;

  const moveToEditNoticePage = () => {
    navigate(`/notice/edit/${noticeId}`);
  };

  return (
    <Button
      fullWidth
      variant="white"
      className={"py-[14px]"}
      onClick={moveToEditNoticePage}
      disabled={!isMyShop}
    >
      {isMyShop ? "공고 편집하기" : "다른 가게의 공고 편집 불가"}
    </Button>
  );
}

export default NoticeEmployerActionButton;
