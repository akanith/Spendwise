import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DEFAULT_DATA = [
  { name: 'Travel', value: 42, color: '#4F46E5' },
  { name: 'Software', value: 28, color: '#818CF8' },
  { name: 'Payroll', value: 15, color: '#C7D2FE' },
  { name: 'Marketing', value: 10, color: '#E0E7FF' },
  { name: 'Other', value: 5, color: '#F1F5F9' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold">
        <p className="text-slate-400 text-[9px] uppercase tracking-widest mb-1">{payload[0].name}</p>
        <p>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const CategoryDonutChart = ({ data }) => {
  const chartData = data && data.length > 0 ? data : DEFAULT_DATA;

  return (
    <div className="h-[220px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            isAnimationActive={true}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-black text-spendwise-text-primary">$124k</span>
        <span className="text-[10px] text-spendwise-text-muted uppercase tracking-widest font-bold">Total</span>
      </div>
    </div>
  );
};

export default CategoryDonutChart;
