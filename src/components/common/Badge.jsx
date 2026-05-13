import React from 'react';

const Badge = ({ children, status = 'neutral', className = '' }) => {
  const statusClasses = {
    approved: 'status-approved',
    success: 'status-approved',
    pending: 'status-pending',
    warning: 'status-pending',
    rejected: 'status-rejected',
    danger: 'status-rejected',
    neutral: 'bg-spendwise-status-neutral-bg text-spendwise-status-neutral-text border-spendwise-status-neutral-border',
  };

  return (
    <span className={`status-badge ${statusClasses[status.toLowerCase()] || statusClasses.neutral} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
