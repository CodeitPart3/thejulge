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

  const moveToEditNoticePage = () => {
    navigate(`/notice/edit/${noticeId}`);
  };

  return (
    <Button
      fullWidth
      variant="white"
      className={"py-[14px]"}
      onClick={moveToEditNoticePage}
      disabled={userShopId !== noticeShopId}
    >
      공고 편집하기
    </Button>
  );
}

export default NoticeEmployerActionButton;
