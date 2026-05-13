import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DEFAULT_DATA = [
  { name: 'Travel', value: 42, color: '#4F46E5' },
  { name: 'Software', value: 28, color: '#818CF8' },
  { name: 'Payroll', value: 15, color: '#C7D2FE' },
  { name: 'Marketing', value: 10, color: '#E0E7FF' },
  { name: 'Other', value: 5, color: '#F1F5F9' },
];

const CategoryDonutChart = ({ data }) => {
  // Default fallback data if none provided
  const chartData = data || [
    { name: 'Travel & Stay', value: 38 },
    { name: 'Software/SaaS', value: 24 },
    { name: 'Vendor Payments', value: 18 },
    { name: 'Others', value: 20 },
  ];

  const COLORS = ['#4F46E5', '#818CF8', '#C7D2FE', '#E2E8F0'];

  return (
    <div className="h-[240px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={6}
            dataKey="value"
            animationDuration={1500}
            animationBegin={300}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="white"
                strokeWidth={2}
                className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              borderRadius: '16px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '12px 16px'
            }}
            itemStyle={{
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[10px] font-black text-spendwise-text-muted uppercase tracking-[0.2em] mb-1">Total</span>
        <span className="text-2xl font-black text-spendwise-text-primary font-outfit leading-none">100%</span>
      </div>
    </div>
  );
};

export default CategoryDonutChart;
