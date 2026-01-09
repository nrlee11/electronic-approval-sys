import React from "react";
import { DraftItem } from "../types";

interface DataTableProps {
  items: DraftItem[];
}

const DataTable: React.FC<DataTableProps> = ({ items }) => {
  const headers = ["기안양식", "기안제목", "상신일시", "결재자", "변경일시"];

  return (
    <div className="w-full">
      <table className="w-full border-t border-border">
        <thead>
          <tr className="bg-popover border-b border-border">
            {headers.map((header) => (
              <th
                key={header}
                className="py-3 px-4 text-xs font-medium text-muted-foreground text-center uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-border hover:bg-popover/50 transition-colors"
              >
                <td className="py-3 px-4 text-sm text-foreground text-center">
                  {item.type}
                </td>
                <td className="py-3 px-4 text-sm text-foreground">
                  {item.title}
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground text-center">
                  {item.submittedAt}
                </td>
                <td className="py-3 px-4 text-sm text-foreground text-center">
                  {item.approver}
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground text-center">
                  {item.updatedAt}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-32">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mb-4 text-primary bg-primary/20">
                    <span className="material-icons-outlined text-lg text-primary">
                      priority_high
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    조회 결과가 존재하지 않습니다.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="border-b border-border"></div>
    </div>
  );
};

export default DataTable;
