import React from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends { id?: string }>({ data, columns, onRowClick }: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-glass-border bg-glass backdrop-blur-md">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-glass border-b border-glass-border text-content-muted">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 font-medium tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-content-muted">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr 
                key={item.id || idx} 
                className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-glass' : ''}`}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-content-muted">
                    {col.render ? col.render(item) : String((item as any)[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
