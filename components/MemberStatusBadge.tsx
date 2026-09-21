import React from 'react';

interface MemberStatusBadgeProps {
  status: 'ACTIVE' | 'EXPIRED';
  className?: string;
}

export default function MemberStatusBadge({
  status,
  className = '',
}: MemberStatusBadgeProps) {
  const statusStyles = {
    ACTIVE: 'bg-green-100 text-green-700 border-green-300',
    EXPIRED: 'bg-red-100 text-red-700 border-red-300',
  };

  const statusIcons = {
    ACTIVE: '✅',
    EXPIRED: '❌',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
        statusStyles[status]
      } ${className}`}
    >
      <span>{statusIcons[status]}</span>
      <span>{status}</span>
    </span>
  );
}
