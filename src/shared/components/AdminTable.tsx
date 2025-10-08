import { useState, Fragment, type ReactNode } from "react";

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
  emptyMessage = "No data found",
  keyExtractor,
  expandableContent,
  onRowClick
}: AdminTableProps<T>) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const getKey = (item: T): string => {
    if (typeof keyExtractor === 'function') {
      return keyExtractor(item);
    }
    return String((item as Record<string, unknown>)[keyExtractor as string]);
  };

  const getValue = (item: T, column: TableColumn<T>): ReactNode => {
    if (column.formatter) {
      return column.formatter(item);
    }
    const value = (item as Record<string, unknown>)[column.key as string];
    return String(value || '');
  };

  const handleRowClick = (item: T) => {
    const itemKey = getKey(item);
    
    if (expandableContent) {
      setExpandedRows(prev => {
        const newSet = new Set(prev);
        if (newSet.has(itemKey)) {
          newSet.delete(itemKey);
        } else {
          newSet.add(itemKey);
        }
        return newSet;
      });
    }
    
    if (onRowClick) {
      onRowClick(item);
    }
  };

  const isExpanded = (item: T): boolean => {
    return expandedRows.has(getKey(item));
  };

  return (
    <div className="bg-white/5 rounded-lg border border-blue-500/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-900/30">
            <tr>
              {expandableContent && (
                <th className="px-6 py-3 w-8">
                  {/* Expand/collapse column header */}
                </th>
              )}
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-700/30">
            {data.map((item) => {
              const itemKey = getKey(item);
              const expanded = isExpanded(item);
              
              return (
                <Fragment key={itemKey}>
                  <tr 
                    className={`hover:bg-blue-800/20 transition-colors ${
                      expandableContent ? 'cursor-pointer' : ''
                    } ${expanded ? 'bg-blue-800/10' : ''}`}
                    onClick={() => handleRowClick(item)}
                  >
                    {expandableContent && (
                      <td className="px-6 py-4 whitespace-nowrap w-8">
                        <div className="flex items-center justify-center">
                          <svg 
                            className={`w-4 h-4 text-blue-300 transition-transform duration-200 ${
                              expanded ? 'rotate-90' : ''
                            }`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </td>
                    )}
                    {columns.map((column, index) => (
                      <td 
                        key={index}
                        className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}
                      >
                        {getValue(item, column)}
                      </td>
                    ))}
                  </tr>
                  {expandableContent && expanded && (
                    <tr className="bg-blue-900/20">
                      <td 
                        colSpan={columns.length + 1} 
                        className="px-6 py-4 border-t border-blue-700/30"
                      >
                        <div className="pl-4">
                          {expandableContent(item)}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-blue-200">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AdminTable;