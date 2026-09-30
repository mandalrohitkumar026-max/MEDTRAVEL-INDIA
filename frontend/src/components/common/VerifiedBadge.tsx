import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  label?: string;
  type?: 'NABH' | 'JCI' | 'PARTNER' | 'HOTEL' | 'TRANSPORT';
  size?: 'sm' | 'md';
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ 
  label = 'Verified Partner', 
  type = 'PARTNER',
  size = 'md' 
}) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'JCI':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'NABH':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'HOTEL':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'TRANSPORT':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-teal-50 text-teal-700 border-teal-200';
    }
  };

  const isSmall = size === 'sm';

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium border rounded-full ${
        isSmall ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      } ${getBadgeStyle()}`}
      title="Verified through official hospital registration, government accreditation or authenticated partner verification"
    >
      <ShieldCheck className={isSmall ? 'w-3 h-3 text-emerald-600' : 'w-3.5 h-3.5 text-emerald-600'} />
      <span>{label}</span>
    </span>
  );
};
