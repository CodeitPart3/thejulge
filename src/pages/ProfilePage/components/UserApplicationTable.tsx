import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { ApplicationItem, ApplicationStatus } from "@/types/application";
import { cn } from "@/utils/cn";
import { formatTimeRange } from "@/utils/datetime";

const MOCK_APPLICATION_DATA: ApplicationItem[] = [
  {
    id: "1",
    createdAt: "2025-04-29",
    status: "pending",
    shop: {
      item: {
        id: "2",
        name: "HS 과일주스",
        category: "한식",
        address1: "서울시 구로구",
        address2: "string",
        description: "string",
        imageUrl: "string",
        originalHourlyPay: 15000,
      },
      href: "http://www.naver.com",
    },
    user: {
      href: "http://www.naver.com",
      item: {
        id: "111",
        email: "string",
        type: "employee",
      },
    },
    notice: {
      item: {
        id: "1111",
        hourlyPay: 20000,
        description: "string",
        startsAt: "2025-05-01 13:00",
        workhour: 5,
        closed: false,
      },
      href: "http://www.naver.com",
    },
  },
  {
    id: "2",
    createdAt: "2025-04-29",
    status: "accepted",
    shop: {
      item: {
        id: "2",
        name: "써니 브런치 레스토랑",
        category: "한식",
        address1: "서울시 구로구",
        address2: "string",
        description: "string",
        imageUrl: "string",
        originalHourlyPay: 15000,
      },
      href: "http://www.naver.com",
    },
    user: {
      href: "http://www.naver.com",
      item: {
        id: "111",
        email: "string",
        type: "employee",
      },
    },
    notice: {
      item: {
        id: "1111",
        hourlyPay: 20000,
        description: "string",
        startsAt: "2025-05-02 22:00",
        workhour: 4,
        closed: false,
      },
      href: "http://www.naver.com",
    },
  },
];

function UserApplicationTable() {
  return (
    <Table
      data={MOCK_APPLICATION_DATA}
      headRow={() => (
        <Table.Tr>
          <Table.Th className="min-w-[10rem] max-w-[14.25rem]">가게</Table.Th>
          <Table.Th className="min-w-[18rem]">일자</Table.Th>
          <Table.Th className="min-w-[8.5rem] max-w-[12.5rem]">시급</Table.Th>
          <Table.Th className="min-w-[8.5rem] max-w-[14.75rem]">상태</Table.Th>
        </Table.Tr>
      )}
      bodyRow={({ id, notice, shop, status }) => (
        <Table.Tr
          key={id}
          className="text-sm md:text-[1rem]"
          showLastBottomBorder
        >
          <Table.Td>{shop.item.name}</Table.Td>
          <Table.Td>
            {formatTimeRange(notice.item.startsAt, notice.item.workhour)}
          </Table.Td>
          <Table.Td>
            {Intl.NumberFormat("ko-kr", { compactDisplay: "long" }).format(
              Number(notice.item.hourlyPay),
            )}
            원
          </Table.Td>
          <Table.Td>
            <Badge status={status} />
          </Table.Td>
        </Table.Tr>
      )}
      footerRow={() => (
        <Table.Tr className="flex justify-center">
          <Table.Td colSpan={3}>
            <Pagination count={100} limit={7} itemCountPerPage={5} />
          </Table.Td>
        </Table.Tr>
      )}
    />
  );
}

export default UserApplicationTable;

interface BadgeProps {
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

function Badge({ status }: BadgeProps) {
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
