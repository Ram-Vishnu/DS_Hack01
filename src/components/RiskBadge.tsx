import React from 'react';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  level: RiskLevel;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  const getStyles = () => {
    switch (level) {
      case 'HIGH':
        return 'bg-brand-red/10 text-brand-red border-brand-red/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
      case 'MEDIUM':
        return 'bg-brand-amber/10 text-brand-amber border-brand-amber/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'LOW':
        return 'bg-brand-emerald/10 text-brand-emerald border-brand-emerald/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      default:
        return 'bg-gray-500/10 text-content-muted border-gray-500/20';
    }
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border flex items-center justify-center max-w-fit ${getStyles()}`}>
      {level}
    </span>
  );
};
