import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-spendwise-text-primary text-white px-4 py-3 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm">
        <p className="text-spendwise-text-muted uppercase tracking-widest text-[9px] font-black mb-1">{label}</p>
        <p className="text-white text-base font-black font-outfit">₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const ReportsSpendChart = ({ data, activeIndex }) => (
  <div className="h-[280px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barCategoryGap="25%">
        <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F5F9" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748B', fontSize: 11, fontWeight: 700 }} 
          dy={15} 
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 600 }}
        />
        <Tooltip 
          content={<CustomTooltip />} 
          cursor={{ fill: '#F1F5F9', radius: 10 }} 
        />
        <Bar 
          dataKey="spend" 
          radius={[6, 6, 6, 6]} 
          animationDuration={1500}
          animationBegin={300}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === activeIndex ? '#4F46E5' : '#C7D2FE'}
              className="transition-all duration-300 hover:fill-opacity-80"
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default ReportsSpendChart;
