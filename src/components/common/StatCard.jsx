import React from 'react';
import * as LucideIcons from 'lucide-react';
import KPICounter from './KPICounter';
import { CardSkeleton } from './Skeleton';

const StatCard = ({ label, value, trend, trendType, subtext, icon, isLoading }) => {
  if (isLoading) return <CardSkeleton />;

  const Icon = LucideIcons[icon] || LucideIcons.Circle;

  // Detect ₹ prefix for Indian Rupee
  const isRupee   = String(value).startsWith('₹');
  const isPercent = String(value).endsWith('%');

  const renderValue = () => {
    if (isRupee) {
      // Remove ₹ and any commas, pass raw number for animation
      const raw = String(value).replace(/[₹,]/g, '');
      return <KPICounter value={raw} prefix="₹" />;
    }
    if (isPercent) {
      return <KPICounter value={String(value).slice(0, -1)} suffix="%" />;
    }
    return <KPICounter value={String(value)} />;
  };

  return (
    <div className="enterprise-card enterprise-card-hover flex flex-col gap-4 group">
      <div className="flex justify-between items-start">
        <div className="p-2.5 bg-spendwise-primary/5 text-spendwise-primary rounded-xl border border-spendwise-primary/10 group-hover:bg-spendwise-primary group-hover:text-white transition-all duration-300">
          <Icon size={22} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${
            trendType === 'up'
              ? 'text-green-600 bg-green-50 border border-green-100'
              : 'text-red-600 bg-red-50 border border-red-100'
          }`}>
            {trendType === 'up' ? '↗' : '↘'} {trend}
          </div>
        )}
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-spendwise-text-secondary mb-1">{label}</p>
        <h3 className="text-2xl font-black text-spendwise-text-primary font-outfit">
          {renderValue()}
        </h3>
      </div>

      <div className="pt-2 border-t border-slate-50">
        <p className="text-[10px] font-bold text-spendwise-text-muted uppercase tracking-tighter">{subtext}</p>
      </div>
    </div>
  );
};

export default StatCard;
