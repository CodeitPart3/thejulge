import { putApplication } from "@/apis/services/applicationService";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import StatusBadge from "@/components/StatusBadge";
import Table from "@/components/Table";
import { useToast } from "@/hooks/useToast";
import { useModalStore } from "@/store/useModalStore";
import { ApplicationItem, ApplicationStatus } from "@/types/application";
import { cn } from "@/utils/cn";

const applicationStatusMessageMap: {
  [key in Exclude<ApplicationStatus, "pending" | "canceled">]: {
    inquiry: string;
    success: string;
    iconType: "check" | "warning";
  };
} = {
  accepted: {
    inquiry: "신청을 승인하시겠어요?",
    success: "승인 완료!",
    iconType: "check",
  },
  rejected: {
    inquiry: "신청을 거절하시겠어요?",
    success: "거절했어요.",
    iconType: "warning",
  },
};

interface NoticeApplicationChangeStatusParams {
  shopId: string;
  noticeId: string;
  applicationId: string;
  status: Exclude<ApplicationStatus, "pending" | "canceled">;
}

interface NoticeApplicationTableProps {
  data: ApplicationItem[];
  totalCount: number;
  itemCountPerPage?: number;
  pageLimit?: number;
  refetch: () => void;
}

function NoticeApplicationTable({
  data,
  totalCount,
  itemCountPerPage = 5,
  pageLimit = 5,
  refetch,
}: NoticeApplicationTableProps) {
  const { showToast } = useToast();
  const { openModal } = useModalStore();

  const changeApplicationStatus = async ({
    shopId,
    noticeId,
    applicationId,
    status,
  }: NoticeApplicationChangeStatusParams) => {
    const { iconType, inquiry, success } = applicationStatusMessageMap[status];

    openModal({
      type: "confirm",
      iconType: iconType,
      message: inquiry,
      onConfirm: async () => {
        const changeApplicationResult = await putApplication(
          shopId,
          noticeId,
          applicationId,
          status,
        );

        if (changeApplicationResult.status === 200) {
          showToast(success);
          refetch();
        }
      },
    });
  };
  return (
    <Table
      data={data}
      headRow={() => (
        <Table.Tr>
          <Table.Th className="min-w-[6rem] max-w-[14.25rem]">신청자</Table.Th>
          <Table.Th className="min-w-[20rem]">소개</Table.Th>
          <Table.Th className="min-w-[12rem] max-w-[14.25rem]">
            전화번호
          </Table.Th>
          <Table.Th className="min-w-[15rem] max-w-[14.25rem]">상태</Table.Th>
        </Table.Tr>
      )}
      bodyRow={({ id, status, user, shop, notice }) => (
        <Table.Tr key={id} showLastBottomBorder>
          <Table.Td>{user.item.name}</Table.Td>
          <Table.Td className={cn({ "text-gray-30": !user.item.bio })}>
            {user.item.bio ? user.item.bio : "(등록된 소개가 없습니다.)"}
          </Table.Td>
          <Table.Td>{user.item.phone}</Table.Td>
          <Table.Td>
            {status === "pending" ? (
              <div className="flex gap-3">
                <Button
                  variant="white"
                  className="py-2.5 px-3.5"
                  onClick={() =>
                    changeApplicationStatus({
                      shopId: shop.item.id,
                      noticeId: notice.item.id,
                      applicationId: id,
                      status: "rejected",
                    })
                  }
                >
                  거절하기
                </Button>
                <Button
                  variant="white"
                  className="py-2.5 px-3.5 border-blue-20 text-blue-20 hover:bg-blue-50 active:bg-blue-10"
                  onClick={() =>
                    changeApplicationStatus({
                      shopId: shop.item.id,
                      noticeId: notice.item.id,
                      applicationId: id,
                      status: "accepted",
                    })
                  }
                >
                  승인하기
                </Button>
              </div>
            ) : (
              <StatusBadge status={status} />
            )}
          </Table.Td>
        </Table.Tr>
      )}
      footerRow={() => (
        <Table.Tr className="flex justify-center">
          <Table.Td noSticky>
            <Pagination
              count={totalCount}
              itemCountPerPage={itemCountPerPage}
              limit={pageLimit}
            />
          </Table.Td>
        </Table.Tr>
      )}
    />
  );
}

export default NoticeApplicationTable;
