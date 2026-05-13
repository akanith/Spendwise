import React, { useState } from 'react';
import {
  Download, Plus, FileText, Calendar, ChevronLeft, ChevronRight,
  Eye, Trash2, RefreshCcw, CheckCircle2, AlertTriangle, Settings2, Clock,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// ─── FY 2024-25 Monthly Spend (₹ in Lakhs) ───────────────────────────────────
const MONTHLY_DATA = [
  { name: 'Apr', spend: 8.4 },  { name: 'May', spend: 9.2 },
  { name: 'Jun', spend: 8.8 },  { name: 'Jul', spend: 10.5 },
  { name: 'Aug', spend: 12.4 }, { name: 'Sep', spend: 14.8 },
  { name: 'Oct', spend: 16.8 }, { name: 'Nov', spend: 15.2 },
  { name: 'Dec', spend: 13.8 }, { name: 'Jan', spend: 16.5 },
  { name: 'Feb', spend: 14.2 }, { name: 'Mar', spend: 12.45 },
];

const QUARTERLY_DATA = [
  { name: 'Q1 (Apr–Jun)', spend: 26.4 },
  { name: 'Q2 (Jul–Sep)', spend: 43.7 },
  { name: 'Q3 (Oct–Dec)', spend: 45.8 },
  { name: 'Q4 (Jan–Mar)', spend: 43.15 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold">
        <p className="text-slate-400 text-[9px] uppercase tracking-widest mb-1">{label}</p>
        <p>₹{payload[0].value}L</p>
      </div>
    );
  }
  return null;
};

// ─── Static data ──────────────────────────────────────────────────────────────
const statCards = [
  { label: 'Total Spend',       value: '₹4.2Cr',   badge: '+12%',   badgeType: 'up',      sub: 'VS LAST MONTH',  sparkline: [30,35,28,45,38,55,50] },
  { label: 'Budget Utilisation',value: '94.2%',    badge: 'STABLE', badgeType: 'neutral', sub: null,             progress: 94.2 },
  { label: 'Avg. Approval',     value: '1.4 Days', badge: '-18%',   badgeType: 'down',    sub: 'TARGET: 2.0 DAYS', icon: Clock },
  { label: 'Expense Trend',     value: '5.2%',     badge: '+0.4%',  badgeType: 'up',      sub: 'VS LAST QTR',   sparkline: [20,22,25,23,28,30,32] },
];

const vendors = [
  { name: 'Amazon Web Services India', category: 'Cloud Infrastructure', amount: '₹1,42,500', trend: '+4.2% vs LW', trendType: 'up',     initial: 'A', color: 'bg-orange-500' },
  { name: 'Zoho Corporation',          category: 'CRM & SaaS Suite',     amount: '₹89,200',  trend: 'Stable',       trendType: 'neutral', initial: 'Z', color: 'bg-blue-500'   },
  { name: 'Microsoft India (O365)',     category: 'Productivity Suite',   amount: '₹64,000',  trend: '+1.8% vs LW', trendType: 'up',     initial: 'M', color: 'bg-indigo-500' },
];

const compliance = [
  { dept: 'ENGINEERING', score: 98, status: 'success' },
  { dept: 'MARKETING',   score: 82, status: 'warning' },
  { dept: 'SALES',       score: 91, status: 'success' },
  { dept: 'FINANCE',     score: 100, status: 'perfect' },
];

const reportRows = [
  {
    id: 1, name: 'Q2 Spend Summary (FY25)', icon: FileText,
    author: { name: 'Rajesh Kumar', initials: 'RK', color: 'bg-blue-500' },
    generated: '14 Oct 2024', lastMod: '2 hours ago', status: 'APPROVED', dept: 'Finance',
  },
  {
    id: 2, name: 'Dept GST Audit Report', icon: FileText,
    author: { name: 'Sunita Rao', initials: 'SR', color: 'bg-red-500' },
    generated: '12 Oct 2024', lastMod: 'Yesterday',   status: 'PENDING',  dept: 'Compliance',
  },
];

const calendarEvents = [
  { month: 'OCT', day: '24', title: 'GST Q2 Filing Deadline', sub: 'GSTR-3B due – critical compliance action', color: 'bg-red-500' },
  { month: 'NOV', day: '02', title: 'Internal Audit – North Region', sub: 'Vendor compliance documentation review', color: 'bg-slate-800' },
  { month: 'NOV', day: '15', title: 'FY25 Budget Planning', sub: 'Kick-off with department heads & CFO', color: 'bg-slate-800' },
];

const MiniSparkline = ({ values, color = '#4F46E5' }) => (
  <svg width="60" height="32" viewBox="0 0 60 32">
    {values.map((v, i) => {
      const max = Math.max(...values);
      const h = Math.max(4, (v / max) * 28);
      const x = i * 9;
      return <rect key={i} x={x} y={32 - h} width={6} height={h} rx={2} fill={i === values.length - 1 ? color : `${color}60`} />;
    })}
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
const Reports = () => {
  const [period, setPeriod] = useState('Monthly');
  const chartData = period === 'Monthly' ? MONTHLY_DATA : QUARTERLY_DATA;
  const highlightIndex = period === 'Monthly' ? 6 : 2; // Oct / Q3

  return (
    <div className="space-y-6 pb-10">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-spendwise-text-primary font-outfit tracking-tight">Reports & Insights</h1>
          <p className="text-spendwise-text-secondary mt-1 text-sm font-medium">Operational financial performance and GST compliance metrics — FY 2024–25.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-spendwise-border px-4 py-2.5 rounded-xl text-xs font-bold text-spendwise-text-primary shadow-enterprise hover:bg-slate-50 transition-all interactive-button">
            <Download size={15} /> PDF
          </button>
          <button className="flex items-center gap-2 bg-white border border-spendwise-border px-4 py-2.5 rounded-xl text-xs font-bold text-spendwise-text-primary shadow-enterprise hover:bg-slate-50 transition-all interactive-button">
            <Download size={15} /> CSV
          </button>
          <button className="flex items-center gap-2 bg-spendwise-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all interactive-button">
            <Plus size={15} /> New Report
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div key={card.label} className="enterprise-card enterprise-card-hover !p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-bold uppercase tracking-widest text-spendwise-text-muted">{card.label}</p>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest flex items-center gap-1 ${
                card.badgeType === 'up'     ? 'text-green-700 bg-green-50 border border-green-100' :
                card.badgeType === 'down'   ? 'text-red-700 bg-red-50 border border-red-100' :
                'text-slate-500 bg-slate-100 border border-slate-200'
              }`}>
                {card.badgeType === 'up' && '↗'}{card.badgeType === 'down' && '↘'} {card.badge}
              </span>
            </div>
            <p className="text-2xl font-black text-spendwise-text-primary font-outfit">{card.value}</p>
            {card.progress !== undefined && (
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-spendwise-primary rounded-full" style={{ width: `${card.progress}%` }} />
              </div>
            )}
            {card.sparkline && (
              <div className="flex justify-end mt-1">
                <MiniSparkline values={card.sparkline} color={card.badgeType === 'down' ? '#EF4444' : '#4F46E5'} />
              </div>
            )}
            {card.icon && (
              <div className="flex justify-end">
                <div className="p-2 bg-orange-50 rounded-xl border border-orange-100">
                  <card.icon size={18} className="text-orange-500" />
                </div>
              </div>
            )}
            {card.sub && <p className="text-[9px] font-bold text-spendwise-text-muted uppercase tracking-widest">{card.sub}</p>}
          </div>
        ))}
      </div>

      {/* Chart + Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 enterprise-card enterprise-card-hover">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-spendwise-text-primary font-outfit">Monthly Spend Trend</h3>
              <p className="text-xs text-spendwise-text-muted mt-0.5">FY 2024–25 Performance Overview (₹ Lakhs)</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {['Monthly', 'Quarterly'].map((p) => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${period === p ? 'bg-white shadow-enterprise text-spendwise-primary' : 'text-spendwise-text-muted hover:text-spendwise-text-primary'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[260px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dy={8} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
                <Bar dataKey="spend" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={800}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={i === highlightIndex ? '#4F46E5' : '#C7D2FE'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Calendar */}
        <div className="enterprise-card enterprise-card-hover flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <Calendar size={18} className="text-spendwise-primary" />
            <h3 className="text-base font-bold text-spendwise-text-primary font-outfit">Financial Calendar</h3>
          </div>
          <div className="space-y-3 flex-1">
            {calendarEvents.map((ev, i) => (
              <div key={i} className="flex gap-4 p-3.5 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <div className={`${ev.color} text-white rounded-xl flex flex-col items-center justify-center w-12 h-12 shrink-0 shadow-sm`}>
                  <span className="text-[8px] font-black uppercase tracking-widest leading-none">{ev.month}</span>
                  <span className="text-lg font-black leading-none">{ev.day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-spendwise-text-primary group-hover:text-spendwise-primary transition-colors leading-snug">{ev.title}</p>
                  <p className="text-[10px] text-spendwise-text-muted font-medium mt-0.5 leading-snug">{ev.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-5 w-full py-3 border border-spendwise-border rounded-xl text-xs font-bold text-spendwise-text-secondary hover:bg-slate-50 hover:text-spendwise-primary transition-all">
            View Full Schedule
          </button>
        </div>
      </div>

      {/* Detailed Spend Analysis */}
      <div className="enterprise-card enterprise-card-hover">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-spendwise-text-primary font-outfit">Detailed Spend Analysis</h3>
          <button className="text-xs font-bold text-spendwise-text-secondary border border-spendwise-border px-4 py-2 rounded-xl hover:bg-slate-50 transition-all">
            View All Vendors
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Vendors */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-spendwise-text-muted mb-4">TOP VENDORS BY SPEND</p>
            <div className="space-y-4">
              {vendors.map((v) => (
                <div key={v.name} className="flex items-center gap-4 group hover:bg-slate-50 p-3 -mx-3 rounded-xl transition-colors">
                  <div className={`w-10 h-10 ${v.color} rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0 group-hover:scale-110 transition-transform`}>
                    {v.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-spendwise-text-primary">{v.name}</p>
                    <p className="text-[10px] text-spendwise-text-muted font-medium">{v.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-spendwise-text-primary font-mono">{v.amount}</p>
                    <p className={`text-[10px] font-bold ${v.trendType === 'up' ? 'text-green-600' : v.trendType === 'down' ? 'text-red-600' : 'text-slate-400'}`}>
                      {v.trendType === 'up' && '↗ '}{v.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Score */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-spendwise-text-muted mb-4">GST COMPLIANCE SCORE BY DEPT</p>
            <div className="grid grid-cols-2 gap-3">
              {compliance.map((c) => (
                <div key={c.dept} className="border border-spendwise-border rounded-2xl p-4 hover:shadow-card transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-spendwise-text-muted">{c.dept}</p>
                    {c.status === 'success' && <CheckCircle2 size={16} className="text-green-500" />}
                    {c.status === 'warning' && <AlertTriangle size={16} className="text-amber-500" />}
                    {c.status === 'perfect' && <Settings2 size={16} className="text-blue-500" />}
                  </div>
                  <p className="text-2xl font-black text-spendwise-text-primary">{c.score}%</p>
                  <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${c.status === 'warning' ? 'bg-amber-400' : 'bg-green-500'}`} style={{ width: `${c.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report Library */}
      <div className="enterprise-card !p-0 overflow-hidden shadow-xl shadow-slate-100">
        <div className="p-5 flex justify-between items-center border-b border-slate-50">
          <h3 className="text-base font-bold text-spendwise-text-primary font-outfit">Report Library</h3>
          <div className="flex gap-2">
            <button className="text-xs font-bold text-spendwise-text-secondary border border-spendwise-border px-4 py-2 rounded-xl hover:bg-slate-50 transition-all">All Departments</button>
            <button className="flex items-center gap-2 text-xs font-bold text-spendwise-text-secondary border border-spendwise-border px-4 py-2 rounded-xl hover:bg-slate-50 transition-all interactive-button">
              <RefreshCcw size={13} /> Refresh
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[9px] uppercase tracking-widest font-black text-spendwise-text-muted border-b border-slate-50">
                <th className="px-6 py-4">Report Name</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Generated</th>
                <th className="px-6 py-4">Last Modified</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Dept</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {reportRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center">
                        <row.icon size={15} className="text-blue-500" />
                      </div>
                      <span className="text-sm font-bold text-spendwise-text-primary group-hover:text-spendwise-primary transition-colors">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 ${row.author.color} rounded-full flex items-center justify-center text-[9px] text-white font-black`}>{row.author.initials}</div>
                      <span className="text-xs font-medium text-spendwise-text-secondary">{row.author.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-spendwise-text-secondary font-medium">{row.generated}</td>
                  <td className="px-6 py-4 text-xs text-spendwise-text-muted font-medium">{row.lastMod}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${row.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest">{row.dept}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 hover:bg-indigo-50 rounded-lg text-spendwise-text-muted hover:text-indigo-600 transition-all"><Eye size={15} /></button>
                      <button className="p-2 hover:bg-green-50 rounded-lg text-spendwise-text-muted hover:text-green-600 transition-all"><Download size={15} /></button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-spendwise-text-muted hover:text-red-500 transition-all"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/20 border-t border-slate-50 flex justify-between items-center">
          <p className="text-[10px] font-bold text-spendwise-text-muted uppercase tracking-widest">Showing 2 of 24 reports</p>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-white rounded-lg text-spendwise-text-muted border border-transparent hover:border-slate-200 transition-all"><ChevronLeft size={15} /></button>
            <button className="w-8 h-8 bg-spendwise-primary text-white rounded-lg text-xs font-black shadow-lg">1</button>
            <button className="w-8 h-8 hover:bg-white rounded-lg text-xs font-black text-spendwise-text-muted border border-transparent hover:border-slate-200 transition-all">2</button>
            <button className="p-2 hover:bg-white rounded-lg text-spendwise-text-muted border border-transparent hover:border-slate-200 transition-all"><ChevronRight size={15} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
