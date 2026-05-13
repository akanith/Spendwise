import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const DEFAULT_DATA = [
  { name: 'Jan', spend: 35000 },
  { name: 'Feb', spend: 42000 },
  { name: 'Mar', spend: 38000 },
  { name: 'Apr', spend: 52000 },
  { name: 'May', spend: 68000 },
  { name: 'Jun', spend: 85000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold">
        <p className="text-slate-400 uppercase tracking-widest text-[9px] mb-1">{label}</p>
        <p className="text-white text-sm">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const SpendTrendChart = ({ data }) => {
  // Use provided data or fall back to defaults; never pass empty to recharts
  const chartData = data && data.length > 0 ? data : DEFAULT_DATA;

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
            dy={10}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
          <Bar dataKey="spend" radius={[6, 6, 0, 0]} barSize={52} isAnimationActive={true} animationDuration={800}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === chartData.length - 1 ? '#4F46E5' : '#818CF8'}
                fillOpacity={0.55 + index * 0.07}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendTrendChart;
