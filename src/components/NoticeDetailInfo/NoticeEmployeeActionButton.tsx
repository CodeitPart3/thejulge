import { useRevalidator } from "react-router-dom";

import Button from "../Button";

import {
  postApplication,
  putApplication,
} from "@/apis/services/applicationService";
import { APPLICATION_STATUS } from "@/constants/applicationStatus";
import { useToast } from "@/hooks/useToast";
import { useModalStore } from "@/store/useModalStore";
import { ApplicationStatus } from "@/types/application";
import { cn } from "@/utils/cn";

interface NoticeEmployeeActionButtonProps {
  shopId: string;
  noticeId: string;
  applicationId: string;
  applicationStatus?: ApplicationStatus;
  isDisabledNotice: boolean;
}

function NoticeEmployeeActionButton({
  shopId,
  noticeId,
  applicationId,
  applicationStatus,
  isDisabledNotice,
}: NoticeEmployeeActionButtonProps) {
  const { revalidate } = useRevalidator();
  const { openModal } = useModalStore();
  const { showToast } = useToast();

  const getApplicationButtonLabel = () => {
    switch (applicationStatus) {
      case APPLICATION_STATUS.PENDING:
        return "취소하기";
      case APPLICATION_STATUS.ACCEPTED:
        return "승낙";
      case APPLICATION_STATUS.REJECTED:
        return "거절된 공고입니다.";
      case APPLICATION_STATUS.CANCELED:
        return "이미 취소하신 공고 입니다.";
      default:
        return isDisabledNotice ? "신청 불가" : "지원하기";
    }
  };

  const applyNotice = async () => {
    const result = await postApplication(shopId, noticeId);

    if (result.status === 201) {
      revalidate();
      showToast("신청 완료!");
    }
  };

  const cancelApplication = () => {
    openModal({
      type: "confirm",
      confirmText: "취소하기",
      cancelText: "아니오",
      iconType: "warning",
      message: "신청을 취소하시겠어요?",
      onConfirm: async () => {
        const result = await putApplication(
          shopId,
          noticeId,
          applicationId,
          APPLICATION_STATUS.CANCELED,
        );

        if (result.status === 200) {
          showToast("취소가 완료 되었습니다.");
          revalidate();
        }
      },
    });
  };

  return (
    <Button
      fullWidth
      disabled={isDisabledNotice}
      variant={
        applicationStatus === APPLICATION_STATUS.PENDING ? "white" : "primary"
      }
      className={cn("py-[14px]", {
        "cursor-pointer": !isDisabledNotice,
      })}
      onClick={
        applicationStatus === APPLICATION_STATUS.PENDING
          ? cancelApplication
          : applyNotice
      }
    >
      {getApplicationButtonLabel()}
    </Button>
  );
}

export default NoticeEmployeeActionButton;
