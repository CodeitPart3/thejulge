import {
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
} from "react";

import { cn } from "@/utils/cn";

interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  data: T[];
  headRow: () => ReactNode;
  bodyRow: (params: T) => ReactNode;
  footerRow?: () => ReactNode;
}

function Table<T>({
  data,
  className,
  headRow,
  bodyRow,
  footerRow,
  ...props
}: TableProps<T>) {
  return (
    <div className="rounded-lg border-[1px] border-gray-200 text-black overflow-hidden">
      {/* ───── 스크롤이 필요한 영역 ───── */}
      <div className="overflow-x-auto">
        <table
          className={cn(
            "table-fixed min-w-full text-left border-collapse",
            className,
          )}
          {...props}
        >
          <thead className="bg-red-50">{headRow()}</thead>
          <tbody className="bg-white">{data.map(bodyRow)}</tbody>
        </table>
      </div>

      {/* ──── 스크롤과 무관한 하단 영역 ───── */}
      {footerRow && (
        <table className="w-full border-collapse">
          <tbody>{footerRow()}</tbody>
        </table>
      )}
    </div>
  );
}

interface TrProps extends HTMLAttributes<HTMLTableRowElement> {
  showLastBottomBorder?: boolean;
}

function Tr({ children, className, showLastBottomBorder, ...props }: TrProps) {
  const tableRowClassName = cn(
    showLastBottomBorder ? "border-b-[1px]" : "not-last:border-b-[1px]",
    "border-gray-20",
    className,
  );

  return (
    <tr className={tableRowClassName} {...props}>
      {children}
    </tr>
  );
}

function Th({
  children,
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  const thClassName = cn(
    "px-3.5 py-3 text-sm font-normal",
    "first:sticky left-0 border-gray-20 z-10 bg-red-50",
    className,
  );

  return (
    <th className={thClassName} {...props}>
      {children}
    </th>
  );
}

interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  noSticky?: boolean;
}

function Td({ children, className, noSticky, ...props }: TdProps) {
  const tdClassName = cn(
    "px-3.5 py-3 break-words whitespace-normal",
    noSticky ? "" : "first:sticky left-0 z-10 bg-white first:whitespace-nowrap",
    className,
  );
  return (
    <td className={tdClassName} {...props}>
      {children}
    </td>
  );
}

Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;

export default Table;
