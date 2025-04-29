import Pagination from "@/components/Pagination";
import StatusBadge from "@/components/StatusBadge";
import Table from "@/components/Table";
import { ApplicationItem } from "@/types/application";
import { formatTimeRange } from "@/utils/datetime";
import { numberCommaFormatter } from "@/utils/number";

interface UserApplicationTableProps {
  data: ApplicationItem[];
  pageCount: number;
  pageLimit: number;
  itemCountPerPage?: number;
}

function UserApplicationTable({
  data,
  pageCount,
  pageLimit,
  itemCountPerPage = 5,
}: UserApplicationTableProps) {
  return (
    <Table
      data={data}
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
          <Table.Td>{numberCommaFormatter(notice.item.hourlyPay)}원</Table.Td>
          <Table.Td>
            <StatusBadge status={status} />
          </Table.Td>
        </Table.Tr>
      )}
      footerRow={() => (
        <Table.Tr className="flex justify-center">
          <Table.Td colSpan={3}>
            <Pagination
              count={pageCount}
              limit={pageLimit}
              itemCountPerPage={itemCountPerPage}
            />
          </Table.Td>
        </Table.Tr>
      )}
    />
  );
}

export default UserApplicationTable;
