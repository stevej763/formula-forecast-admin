import { useState, Fragment, type ReactNode } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  formatter?: (item: T) => ReactNode;
  className?: string;
}

interface AdminTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  emptyMessage?: string;
  keyExtractor: ((item: T) => string) | keyof T;
  expandableContent?: (item: T) => ReactNode;
  onRowClick?: (item: T) => void;
}

const AdminTable = <T,>({
  data,
  columns,
  emptyMessage = "Nothing here yet",
  keyExtractor,
  expandableContent,
  onRowClick,
}: AdminTableProps<T>) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const getKey = (item: T): string => {
    if (typeof keyExtractor === "function") {
      return keyExtractor(item);
    }
    return String((item as Record<string, unknown>)[keyExtractor as string]);
  };

  const getValue = (item: T, column: TableColumn<T>): ReactNode => {
    if (column.formatter) {
      return column.formatter(item);
    }
    const value = (item as Record<string, unknown>)[column.key as string];
    return String(value || "");
  };

  const toggle = (item: T) => {
    const itemKey = getKey(item);
    if (expandableContent) {
      setExpandedRows((prev) => {
        const next = new Set(prev);
        if (next.has(itemKey)) {
          next.delete(itemKey);
        } else {
          next.add(itemKey);
        }
        return next;
      });
    }
    onRowClick?.(item);
  };

  if (data.length === 0) {
    return <p className="border-y border-graphite py-10 text-ash">{emptyMessage}</p>;
  }

  return (
    <div className="ff-scrollbar overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-graphite">
            {expandableContent && (
              <th className="w-8 py-3">
                <span className="sr-only">Details</span>
              </th>
            )}
            {columns.map((column, index) => (
              <th key={index} scope="col" className="py-3 pr-6 text-sm font-medium whitespace-nowrap text-ash">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const itemKey = getKey(item);
            const expanded = expandedRows.has(itemKey);
            const detailId = `detail-${itemKey}`;

            return (
              <Fragment key={itemKey}>
                <tr
                  className={`border-b border-graphite transition-colors ${
                    expandableContent ? "cursor-pointer hover:bg-carbon" : ""
                  } ${expanded ? "bg-carbon" : ""}`}
                  onClick={() => toggle(item)}
                >
                  {expandableContent && (
                    <td className="w-8 py-3.5">
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={detailId}
                        aria-label={expanded ? "Hide details" : "Show details"}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggle(item);
                        }}
                        className="-ml-1 flex rounded-sm p-0.5 text-ash hover:text-chalk"
                      >
                        <ChevronRightIcon
                          className={`h-5 w-5 transition-transform duration-150 ${expanded ? "rotate-90" : ""}`}
                        />
                      </button>
                    </td>
                  )}
                  {columns.map((column, index) => (
                    <td key={index} className={`py-3.5 pr-6 whitespace-nowrap ${column.className || ""}`}>
                      {getValue(item, column)}
                    </td>
                  ))}
                </tr>
                {expandableContent && expanded && (
                  <tr id={detailId} className="border-b border-graphite bg-carbon">
                    <td />
                    <td colSpan={columns.length} className="pt-1 pr-6 pb-6">
                      {expandableContent(item)}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
