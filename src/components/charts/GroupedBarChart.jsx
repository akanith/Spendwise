import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const GroupedBarChart = ({ data }) => {
  const chartData = [
    { name: 'Marketing', budget: 450, actual: 485 },
    { name: 'Engineering', budget: 850, actual: 584 },
    { name: 'HR', budget: 200, actual: 210 },
    { name: 'Sales', budget: 600, actual: 492 },
    { name: 'Operations', budget: 320, actual: 284 },
  ];

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            tickFormatter={(value) => `$${value}k`}
          />
          <Tooltip 
            cursor={{ fill: '#F8FAFC' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend 
            verticalAlign="bottom" 
            align="center" 
            iconType="circle"
            wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600, color: '#64748B' }}
          />
          <Bar dataKey="budget" name="Allocated Budget" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="actual" name="Actual Spend" fill="#C7D2FE" radius={[4, 4, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GroupedBarChart;
