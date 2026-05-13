import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`skeleton ${className}`} />
  );
};

export const CardSkeleton = () => (
  <div className="enterprise-card h-40 flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <Skeleton className="w-16 h-6 rounded-lg" />
    </div>
    <div className="space-y-2">
      <Skeleton className="w-1/2 h-4" />
      <Skeleton className="w-3/4 h-8" />
    </div>
    <Skeleton className="w-1/3 h-3" />
  </div>
);

export const TableRowSkeleton = () => (
  <div className="flex items-center gap-6 px-8 py-5 border-b border-slate-50">
    <Skeleton className="w-8 h-8 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="w-1/4 h-4" />
      <Skeleton className="w-1/3 h-3" />
    </div>
    <Skeleton className="w-24 h-4" />
    <Skeleton className="w-16 h-6 rounded-full" />
  </div>
);

export default Skeleton;
