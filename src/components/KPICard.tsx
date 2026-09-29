import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ElementType;
  subtitle?: string;
  isNegativeGood?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  trend, 
  icon: Icon,
  subtitle,
  isNegativeGood = false
}) => {
  const isPositive = trend > 0;
  const isFavorable = isNegativeGood ? !isPositive : isPositive;
  const trendColor = isFavorable ? 'text-brand-emerald' : 'text-brand-red';
  
  return (
    <div className="glass-panel p-6 relative overflow-hidden group">
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-sm font-medium text-content-muted">{title}</p>
          <h3 className="text-3xl font-bold text-content mt-1">{value}</h3>
          {subtitle && <p className="text-xs text-content-muted mt-1">{subtitle}</p>}
        </div>
        <div className="w-12 h-12 rounded-xl bg-glass border border-glass-border flex items-center justify-center backdrop-blur-md">
          <Icon className="w-6 h-6 text-brand-cyan" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 relative z-10">
        <div className={`flex items-center gap-1 text-sm font-medium ${trendColor} bg-${isFavorable ? 'brand-emerald' : 'brand-red'}/10 px-2 py-1 rounded-md`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(trend)}%</span>
        </div>
        <span className="text-xs text-content-muted">vs last period</span>
      </div>
    </div>
  );
};
