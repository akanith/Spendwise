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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-spendwise-text-primary text-white px-4 py-3 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm">
        <p className="text-spendwise-text-muted uppercase tracking-widest text-[9px] font-black mb-1">{label}</p>
        <div className="space-y-1">
          {payload.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-8">
              <span className="text-[10px] text-slate-300 font-bold uppercase">{item.name}:</span>
              <span className="text-sm font-black font-outfit">₹{item.value}k</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const GroupedBarChart = ({ data }) => {
  const chartData = data || [
    { name: 'Marketing', budget: 450, actual: 485 },
    { name: 'Engineering', budget: 850, actual: 584 },
    { name: 'HR', budget: 200, actual: 210 },
    { name: 'Sales', budget: 600, actual: 492 },
    { name: 'Operations', budget: 320, actual: 284 },
  ];

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
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
            tickFormatter={(value) => `₹${value}k`}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: '#F1F5F9', radius: 12 }}
          />
          <Legend 
            verticalAlign="bottom" 
            align="center" 
            iconType="circle"
            wrapperStyle={{ paddingTop: '30px', fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}
          />
          <Bar 
            dataKey="budget" 
            name="Allocated Budget" 
            fill="#4F46E5" 
            radius={[6, 6, 6, 6]} 
            barSize={24} 
            animationDuration={1500}
            animationBegin={300}
          />
          <Bar 
            dataKey="actual" 
            name="Actual Spend" 
            fill="#C7D2FE" 
            radius={[6, 6, 6, 6]} 
            barSize={24} 
            animationDuration={1500}
            animationBegin={500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GroupedBarChart;
