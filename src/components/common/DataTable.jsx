import React from 'react';
import { TableRowSkeleton } from './Skeleton';

const DataTable = ({ 
  headers, 
  data, 
  renderRow, 
  isLoading, 
  emptyMessage = "No data found.",
  loadingRows = 5 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest font-black text-spendwise-text-muted border-b border-slate-50">
            {headers.map((header, idx) => (
              <th 
                key={idx} 
                className={`px-8 py-5 font-black ${header.align === 'right' ? 'text-right' : ''}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {isLoading ? (
            Array(loadingRows).fill(0).map((_, i) => (
              <tr key={i}>
                <td colSpan={headers.length}>
                  <TableRowSkeleton />
                </td>
              </tr>
            ))
          ) : data.length > 0 ? (
            data.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                {renderRow(item, idx)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-8 py-12 text-center text-sm text-spendwise-text-muted font-medium">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
