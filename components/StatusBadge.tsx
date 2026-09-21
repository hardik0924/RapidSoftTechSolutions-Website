'use client';

interface StatusBadgeProps {
  status: 'ACTIVE' | 'PAUSED' | 'EXPIRED';
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const colorClasses = {
    ACTIVE: 'bg-green-100 text-green-800',
    PAUSED: 'bg-yellow-100 text-yellow-800',
    EXPIRED: 'bg-red-100 text-red-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const capitalize = (str: string) => str.charAt(0) + str.slice(1).toLowerCase();

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${colorClasses[status]} ${sizeClasses[size]}`}
    >
      {capitalize(status)}
    </span>
  );
}
