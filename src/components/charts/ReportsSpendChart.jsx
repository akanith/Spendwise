import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MONTHLY_DATA = [
  { name: 'Jan', spend: 28000 },
  { name: 'Feb', spend: 32000 },
  { name: 'Mar', spend: 29000 },
  { name: 'Apr', spend: 35000 },
  { name: 'May', spend: 38000 },
  { name: 'Jun', spend: 42000 },
  { name: 'Jul', spend: 68000 },
  { name: 'Aug', spend: 52000 },
  { name: 'Sep', spend: 48000 },
  { name: 'Oct', spend: 55000 },
  { name: 'Nov', spend: 44000 },
  { name: 'Dec', spend: 38000 },
];

const QUARTERLY_DATA = [
  { name: 'Q1', spend: 89000 },
  { name: 'Q2', spend: 115000 },
  { name: 'Q3', spend: 168000 },
  { name: 'Q4', spend: 137000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold">
        <p className="text-slate-400 text-[9px] uppercase tracking-widest mb-1">{label}</p>
        <p>${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const ReportsSpendChart = ({ data, activeIndex }) => (
  <div className="h-[260px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dy={10} />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
        <Bar dataKey="spend" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={800}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === activeIndex ? '#4F46E5' : '#C7D2FE'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default ReportsSpendChart;
