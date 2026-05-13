import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from 'recharts';
import {
  Plus, Download, Filter, MoreVertical, Sparkles, ArrowRight,
  ChevronRight, ChevronLeft, RefreshCcw, Wallet, Activity, PieChart as PieIcon, AlertTriangle,
} from 'lucide-react';
import { api } from '../services/api';
import { TableRowSkeleton } from '../components/common/Skeleton';

// INR-denominated chart data (in Lakhs for readability on axis)
const CHART_DATA = [
  { name: 'Marketing',   budget: 45,   actual: 48.5, overBudget: true  },
  { name: 'Engineering', budget: 85,   actual: 58.4, overBudget: false },
  { name: 'HR',          budget: 20,   actual: 21,   overBudget: false },
  { name: 'Sales',       budget: 60,   actual: 49.2, overBudget: false },
  { name: 'Operations',  budget: 32,   actual: 28.4, overBudget: false },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs">
        <p className="text-slate-400 text-[9px] uppercase tracking-widest mb-2">{label}</p>
        {payload.map((p) =>
          p.value ? (
            <p key={p.dataKey} className="font-bold">
              {p.name}: <span className="text-indigo-300">₹{p.value}L</span>
            </p>
          ) : null
        )}
      </div>
    );
  }
  return null;
};

const statCards = [
  { label: 'Total Allocated Budget', value: '₹2,50,00,000', badge: '4.2%',   badgeType: 'up',     sub: 'Vs. ₹2.4Cr last period',    icon: Wallet },
  { label: 'Current Spend',          value: '₹1,84,00,000', badge: 'Stable', badgeType: 'neutral', sub: '72% of total allocated',    icon: Activity },
  { label: 'Remaining Budget',       value: '₹70,00,000',   badge: '12%',    badgeType: 'down',    sub: 'For remaining 14 days',     icon: PieIcon },
  { label: 'Over-budget Depts',      value: '2',             badge: '+1 Dept',badgeType: 'danger',  sub: 'Marketing, Operations',     icon: AlertTriangle },
];

const deptColors = {
  Engineering: '#4F46E5',
  Operations:  '#B45309',
  Marketing:   '#B91C1C',
  Sales:       '#4F46E5',
};

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.getBudgetBreakdown();
      setBudgets(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center border border-red-100">
          <RefreshCcw size={32} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-spendwise-text-primary">Failed to load budgets</h3>
          <p className="text-sm text-spendwise-text-muted">{error}</p>
        </div>
        <button onClick={fetchData} className="bg-spendwise-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-spendwise-text-primary font-outfit tracking-tight">Budgets</h1>
          <p className="text-spendwise-text-secondary mt-1 text-sm font-medium">Monitor and control departmental spending across your organisation — FY 2024–25.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex bg-white border border-spendwise-border rounded-xl p-1 shadow-enterprise">
            <button className="px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg bg-spendwise-primary text-white shadow-sm">Monthly</button>
            <button className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted hover:text-spendwise-text-primary transition-colors">Quarterly</button>
          </div>
          <button className="flex items-center gap-2 bg-white border border-spendwise-border px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-spendwise-text-primary shadow-enterprise hover:bg-slate-50 transition-all interactive-button">
            <Download size={15} /> Export Report
          </button>
          <button className="flex items-center gap-2 bg-spendwise-primary px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all interactive-button">
            <Plus size={15} /> Create Budget
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div key={card.label} className="enterprise-card enterprise-card-hover !p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-spendwise-text-secondary">
                <card.icon size={18} />
              </div>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest flex items-center gap-1 ${
                card.badgeType === 'up'      ? 'text-green-700 bg-green-50 border border-green-100' :
                card.badgeType === 'down'    ? 'text-red-700 bg-red-50 border border-red-100' :
                card.badgeType === 'danger'  ? 'text-orange-700 bg-orange-50 border border-orange-100' :
                'text-slate-500 bg-slate-100 border border-slate-200'
              }`}>
                {card.badgeType === 'up' && '↗'}{card.badgeType === 'down' && '↘'}{card.badgeType === 'danger' && '+'} {card.badge}
              </span>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-spendwise-text-muted mb-1">{card.label}</p>
              <p className="text-2xl font-black text-spendwise-text-primary font-outfit">{card.value}</p>
            </div>
            <p className="text-[10px] font-medium text-spendwise-text-muted">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grouped Bar Chart */}
        <div className="lg:col-span-2 enterprise-card enterprise-card-hover">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-spendwise-text-primary font-outfit">Budget vs Actual by Department</h3>
              <p className="text-[10px] text-spendwise-text-muted mt-0.5 font-medium uppercase tracking-widest">Values in ₹ Lakhs (L)</p>
            </div>
            <button className="flex items-center gap-2 text-xs font-bold text-spendwise-text-secondary border border-spendwise-border px-4 py-2 rounded-xl hover:bg-slate-50 transition-all">
              All Departments <ChevronRight size={14} className="rotate-90" />
            </button>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 20 }} barCategoryGap="25%" barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} tickFormatter={(v) => `₹${v}L`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
                <Legend
                  verticalAlign="bottom" align="center"
                  wrapperStyle={{ paddingTop: '16px', fontSize: '11px', fontWeight: 700, color: '#64748B' }}
                  iconType="circle" iconSize={8}
                  formatter={(value) => <span style={{ color: '#475569', fontSize: '11px', fontWeight: 700 }}>{value}</span>}
                />
                <Bar dataKey="budget" name="Allocated Budget" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={22} />
                <Bar dataKey="actual" name="Actual Spend" radius={[4, 4, 0, 0]} barSize={22}>
                  {CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.overBudget ? '#DC2626' : '#C7D2FE'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-spendwise-primary rounded-3xl p-8 text-white flex flex-col relative overflow-hidden shadow-2xl shadow-indigo-200 group">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl" />

          <div className="flex items-center gap-3 mb-7 relative">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center border border-white/10">
              <Sparkles size={18} className="text-indigo-200" />
            </div>
            <h3 className="text-lg font-black font-outfit">AI Insights</h3>
          </div>

          <div className="space-y-4 relative flex-1">
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all cursor-pointer">
              <p className="text-xs font-medium text-indigo-100 leading-relaxed mb-3">
                Marketing expenses are projected to exceed budget by{' '}
                <span className="font-black text-white">₹3.5L this month</span> based on historical ad campaign cycles.
              </p>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-200 hover:text-white transition-colors">
                Take action <ArrowRight size={12} />
              </button>
            </div>

            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all cursor-pointer">
              <p className="text-xs font-medium text-indigo-100 leading-relaxed">
                Engineering cloud costs{' '}
                <span className="text-white font-black">decreased ₹8.2L</span>{' '}
                vs last quarter after AWS Reserved Instance optimisation.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all cursor-pointer">
              <p className="text-xs font-medium text-indigo-100 leading-relaxed">
                <span className="text-white font-black">GST Input Credit</span> of ₹2.4L is available for Q2. File before 20 Nov 2024.
              </p>
            </div>
          </div>

          <div className="mt-7 pt-5 border-t border-white/10 flex items-start gap-3 relative">
            <div className="w-2 h-2 rounded-full bg-indigo-300 animate-pulse mt-1 shrink-0 shadow-[0_0_8px_rgba(165,180,252,0.8)]" />
            <p className="text-[10px] text-indigo-300 font-medium leading-relaxed italic">
              Data sync delayed for Sales dept. TDS analytics for this segment may be stale.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Budget Breakdown */}
      <div className="enterprise-card !p-0 overflow-hidden shadow-xl shadow-slate-100">
        <div className="px-6 py-5 flex justify-between items-center border-b border-slate-50 bg-white">
          <h3 className="text-base font-bold text-spendwise-text-primary font-outfit">Detailed Budget Breakdown</h3>
          <div className="flex gap-2">
            <button className="p-2.5 hover:bg-slate-50 rounded-xl text-spendwise-text-muted transition-all border border-transparent hover:border-slate-200 interactive-button"><Filter size={16} /></button>
            <button className="p-2.5 hover:bg-slate-50 rounded-xl text-spendwise-text-muted transition-all interactive-button"><MoreVertical size={16} /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[9px] uppercase tracking-widest font-black text-spendwise-text-muted border-b border-slate-50">
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Allocated Budget</th>
                <th className="px-6 py-4">Actual Spend</th>
                <th className="px-6 py-4">Remaining</th>
                <th className="px-6 py-4">Utilization %</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50/80">
              {isLoading
                ? Array(4).fill(0).map((_, i) => (
                    <tr key={i}><td colSpan="6"><TableRowSkeleton /></td></tr>
                  ))
                : budgets.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-9 rounded-full" style={{ backgroundColor: deptColors[item.department] || '#94A3B8' }} />
                          <div>
                            <p className="text-sm font-bold text-spendwise-text-primary">{item.department}</p>
                            <p className="text-[9px] text-spendwise-text-muted font-bold uppercase tracking-widest">COST CENTER: {item.costCenter}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-black text-spendwise-text-primary font-mono">{item.allocated}</td>
                      <td className={`px-6 py-5 text-sm font-black font-mono ${item.status === 'Over Budget' ? 'text-red-600' : 'text-spendwise-text-secondary'}`}>
                        {item.actual}
                      </td>
                      <td className={`px-6 py-5 text-sm font-black font-mono ${item.remaining.startsWith('-') ? 'text-red-600' : 'text-spendwise-primary'}`}>
                        {item.remaining}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3 min-w-[140px]">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(item.utilization, 100)}%` }}
                              transition={{ duration: 1.2, ease: 'easeOut' }}
                              className="h-full rounded-full"
                              style={{
                                backgroundColor:
                                  item.utilization > 100 ? '#DC2626' :
                                  item.utilization > 85  ? '#D97706' : '#4F46E5',
                              }}
                            />
                          </div>
                          <span className="text-xs font-black text-spendwise-text-primary w-10 text-right">{item.utilization}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                          item.status === 'Healthy'     ? 'bg-green-50 text-green-700 border border-green-100' :
                          item.status === 'Warning'     ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/20 border-t border-slate-50 flex justify-between items-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-spendwise-text-muted">Showing 4 of 12 Departments</p>
          <div className="flex items-center gap-1">
            <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted transition-all interactive-button flex items-center gap-1">
              <ChevronLeft size={13} /> Prev
            </button>
            <button className="w-8 h-8 bg-spendwise-primary text-white rounded-lg text-xs font-black shadow-lg">1</button>
            <button className="w-8 h-8 hover:bg-white rounded-lg text-xs font-black text-spendwise-text-muted border border-transparent hover:border-slate-200 transition-all">2</button>
            <button className="w-8 h-8 hover:bg-white rounded-lg text-xs font-black text-spendwise-text-muted border border-transparent hover:border-slate-200 transition-all">3</button>
            <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted transition-all interactive-button flex items-center gap-1">
              Next <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budgets;
