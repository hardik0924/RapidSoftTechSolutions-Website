import React from 'react';

interface PlanBadgeProps {
  isActive: boolean;
  className?: string;
}

export default function PlanBadge({
  isActive,
  className = '',
}: PlanBadgeProps) {
  const badgeStyles = isActive
    ? 'bg-green-100 text-green-700 border-green-300'
    : 'bg-gray-100 text-gray-700 border-gray-300';

  const icon = isActive ? '✓' : '○';
  const label = isActive ? 'Active' : 'Inactive';

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${badgeStyles} ${className}`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
}
