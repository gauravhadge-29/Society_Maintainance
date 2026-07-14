import React from 'react';

const STATUS_CONFIG = {
  'open':        { label: 'Open',        bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200', dot: 'bg-amber-500' },
  'in-progress': { label: 'In Progress', bg: 'bg-sky-50',    text: 'text-sky-700',    border: 'border-sky-200',   dot: 'bg-sky-500'   },
  'resolved':    { label: 'Resolved',    bg: 'bg-emerald-50',text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
};

export default function StatusBadge({ status, size = 'sm' }) {
  const config = STATUS_CONFIG[status] || { label: status, bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-500' };

  const sizeClasses = size === 'lg'
    ? 'px-3 py-1.5 text-xs gap-2'
    : 'px-2 py-1 text-[11px] gap-1.5';

  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

export function getStatusColor(status) {
  return STATUS_CONFIG[status] || STATUS_CONFIG['open'];
}
