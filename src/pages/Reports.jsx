import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download, Plus, FileText, Calendar, ChevronLeft, ChevronRight,
  Eye, Trash2, RefreshCcw, CheckCircle2, AlertTriangle, Settings2, Clock,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import StatCard from '../components/common/StatCard';
import Button from '../components/common/Button';
import ReportsSpendChart from '../components/charts/ReportsSpendChart';
import { monthlySpendTrend } from '../data/mockData';

const Reports = () => {
  const [period, setPeriod] = useState('Monthly');

  // Logic to handle Quarterly aggregation
  const getChartData = () => {
    if (period === 'Monthly') return monthlySpendTrend;
    
    // Aggregate by Quarters (Apr-Jun, Jul-Sep, Oct-Dec, Jan-Mar)
    const quarters = [
      { name: 'Q1', spend: monthlySpendTrend.slice(0, 3).reduce((acc, curr) => acc + curr.spend, 0) },
      { name: 'Q2', spend: monthlySpendTrend.slice(3, 6).reduce((acc, curr) => acc + curr.spend, 0) },
      { name: 'Q3', spend: monthlySpendTrend.slice(6, 9).reduce((acc, curr) => acc + curr.spend, 0) },
      { name: 'Q4', spend: monthlySpendTrend.slice(9, 12).reduce((acc, curr) => acc + curr.spend, 0) },
    ];
    return quarters;
  };

  const chartData = getChartData();

  const statCards = [
    { label: 'Total Spend', value: '₹4.2Cr', trend: '+12%', trendType: 'up', subtext: 'VS LAST MONTH', icon: 'Wallet' },
    { label: 'Budget Utilisation', value: '94.2%', trend: 'Stable', trendType: 'up', subtext: '72% of total allocated', icon: 'Activity' },
    { label: 'Avg. Approval', value: '1.4 Days', trend: '-18%', trendType: 'down', subtext: 'TARGET: 2.0 DAYS', icon: 'Clock' },
    { label: 'Expense Trend', value: '5.2%', trend: '+0.4%', trendType: 'up', subtext: 'VS LAST QTR', icon: 'PieChart' },
  ];

  const vendors = [
    { name: 'Amazon Web Services India', category: 'Cloud Infrastructure', amount: '₹1,42,500', trend: '+4.2% vs LW', trendType: 'up', initial: 'A', color: 'bg-orange-500' },
    { name: 'Zoho Corporation', category: 'CRM & SaaS Suite', amount: '₹89,200', trend: 'Stable', trendType: 'neutral', initial: 'Z', color: 'bg-blue-500' },
    { name: 'Microsoft India (O365)', category: 'Productivity Suite', amount: '₹64,000', trend: '+1.8% vs LW', trendType: 'up', initial: 'M', color: 'bg-indigo-500' },
  ];

  const compliance = [
    { dept: 'ENGINEERING', score: 98, status: 'success' },
    { dept: 'MARKETING', score: 82, status: 'warning' },
    { dept: 'SALES', score: 91, status: 'success' },
    { dept: 'FINANCE', score: 100, status: 'perfect' },
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
      generated: '12 Oct 2024', lastMod: 'Yesterday', status: 'PENDING', dept: 'Compliance',
    },
  ];

  const calendarEvents = [
    { month: 'OCT', day: '24', title: 'GST Q2 Filing Deadline', sub: 'GSTR-3B due – critical compliance action', color: 'bg-red-500' },
    { month: 'NOV', day: '02', title: 'Internal Audit – North Region', sub: 'Vendor compliance documentation review', color: 'bg-slate-800' },
    { month: 'NOV', day: '15', title: 'FY25 Budget Planning', sub: 'Kick-off with department heads & CFO', color: 'bg-slate-800' },
  ];

  return (
    <div className="section-spacing">
      {/* Page Header */}
      <PageHeader 
        title="Reports & Insights" 
        description="Operational financial performance and GST compliance metrics — FY 2024–25."
        actions={
          <>
            <Button variant="secondary" icon={Download}>PDF</Button>
            <Button variant="secondary" icon={Download}>CSV</Button>
            <Button icon={Plus}>New Report</Button>
          </>
        }
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <StatCard key={i} {...card} />
        ))}
      </div>

      {/* Chart + Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card 
          title="Monthly Spend Trend" 
          subtitle="FY 2024–25 Performance Overview (₹ Lakhs)"
          className="lg:col-span-2"
          headerAction={
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {['Monthly', 'Quarterly'].map((p) => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${period === p ? 'bg-white shadow-enterprise text-spendwise-primary' : 'text-spendwise-text-muted hover:text-spendwise-text-primary'}`}>
                  {p}
                </button>
              ))}
            </div>
          }
        >
          <ReportsSpendChart data={chartData} activeIndex={period === 'Monthly' ? 6 : 2} />
        </Card>

        {/* Financial Calendar */}
        <Card 
          title="Financial Calendar" 
          headerIcon={Calendar}
          footer={
            <Button variant="outline" className="w-full">View Full Schedule</Button>
          }
        >
          <div className="space-y-3">
            {calendarEvents.map((ev, i) => (
              <div key={i} className="flex gap-4 p-3.5 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                <div className={`${ev.color} text-white rounded-xl flex flex-col items-center justify-center w-12 h-12 shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                  <span className="text-[8px] font-black uppercase tracking-widest leading-none mb-1">{ev.month}</span>
                  <span className="text-lg font-black leading-none">{ev.day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-spendwise-text-primary group-hover:text-spendwise-primary transition-colors leading-snug">{ev.title}</p>
                  <p className="text-[10px] text-spendwise-text-muted font-bold mt-1 uppercase tracking-tight">{ev.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Spend Analysis */}
      <Card 
        title="Detailed Spend Analysis" 
        headerAction={
          <Button variant="outline" size="sm">View All Vendors</Button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Top Vendors */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-spendwise-text-muted mb-6">Top Vendors by Spend</p>
            <div className="space-y-4">
              {vendors.map((v) => (
                <div key={v.name} className="flex items-center gap-4 group hover:bg-slate-50 p-3 -mx-3 rounded-2xl transition-all cursor-pointer">
                  <div className={`w-12 h-12 ${v.color} rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-lg shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                    {v.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-spendwise-text-primary truncate">{v.name}</p>
                    <p className="text-[10px] text-spendwise-text-muted font-bold uppercase tracking-wide mt-0.5">{v.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-spendwise-text-primary font-outfit">{v.amount}</p>
                    <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${v.trendType === 'up' ? 'text-green-600' : v.trendType === 'down' ? 'text-red-600' : 'text-slate-400'}`}>
                      {v.trendType === 'up' && '↗ '}{v.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Score */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-spendwise-text-muted mb-6">GST Compliance Score by Dept</p>
            <div className="grid grid-cols-2 gap-4">
              {compliance.map((c) => (
                <div key={c.dept} className="border-2 border-slate-50 rounded-[24px] p-5 hover:border-spendwise-primary/20 hover:shadow-enterprise transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-[9px] font-black uppercase tracking-widest text-spendwise-text-muted">{c.dept}</p>
                    {c.status === 'success' && <CheckCircle2 size={16} className="text-green-500" />}
                    {c.status === 'warning' && <AlertTriangle size={16} className="text-amber-500" />}
                    {c.status === 'perfect' && <Settings2 size={16} className="text-blue-500" />}
                  </div>
                  <p className="text-2xl font-black text-spendwise-text-primary font-outfit mb-3">{c.score}%</p>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${c.score}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`h-full rounded-full ${c.status === 'warning' ? 'bg-amber-400' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]'}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Report Library */}
      <Card 
        title="Report Library" 
        noPadding
        headerAction={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All Departments</Button>
            <button className="flex items-center gap-2 text-xs font-bold text-spendwise-text-secondary border border-spendwise-border px-4 py-2 rounded-xl hover:bg-slate-50 transition-all active:scale-95">
              <RefreshCcw size={13} /> Refresh
            </button>
          </div>
        }
      >
        <DataTable
          headers={[
            { label: 'Report Name' },
            { label: 'Author' },
            { label: 'Generated' },
            { label: 'Last Modified' },
            { label: 'Status' },
            { label: 'Dept' },
            { label: 'Actions', align: 'right' },
          ]}
          data={reportRows}
          renderRow={(row) => (
            <>
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <row.icon size={18} className="text-spendwise-primary" />
                  </div>
                  <span className="text-sm font-black text-spendwise-text-primary group-hover:text-spendwise-primary transition-colors">{row.name}</span>
                </div>
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 ${row.author.color} rounded-xl flex items-center justify-center text-[10px] text-white font-black shadow-sm`}>{row.author.initials}</div>
                  <span className="text-xs font-bold text-spendwise-text-secondary">{row.author.name}</span>
                </div>
              </td>
              <td className="px-8 py-5 text-xs text-spendwise-text-secondary font-medium">{row.generated}</td>
              <td className="px-8 py-5 text-xs text-spendwise-text-muted font-medium">{row.lastMod}</td>
              <td className="px-8 py-5">
                <Badge status={row.status === 'APPROVED' ? 'Approved' : 'Pending'}>
                  {row.status}
                </Badge>
              </td>
              <td className="px-8 py-5">
                <span className="bg-slate-100 text-spendwise-text-secondary text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest">{row.dept}</span>
              </td>
              <td className="px-8 py-5 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button className="p-2.5 hover:bg-indigo-50 rounded-xl text-spendwise-text-muted hover:text-indigo-600 transition-all active:scale-90"><Eye size={16} /></button>
                  <button className="p-2.5 hover:bg-green-50 rounded-xl text-spendwise-text-muted hover:text-green-600 transition-all active:scale-90"><Download size={16} /></button>
                  <button className="p-2.5 hover:bg-red-50 rounded-xl text-spendwise-text-muted hover:text-red-500 transition-all active:scale-90"><Trash2 size={16} /></button>
                </div>
              </td>
            </>
          )}
        />
        
        {/* Pagination */}
        <div className="px-8 py-4 bg-slate-50/20 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted">Showing 2 of 24 reports</p>
          <div className="flex items-center gap-1">
            <button className="p-2.5 hover:bg-white rounded-xl text-spendwise-text-muted border border-transparent hover:border-slate-200 transition-all active:scale-95"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 bg-spendwise-primary text-white rounded-xl text-xs font-black shadow-lg">1</button>
            <button className="w-8 h-8 hover:bg-white rounded-xl text-xs font-black text-spendwise-text-muted border border-transparent hover:border-slate-200 transition-all">2</button>
            <button className="p-2.5 hover:bg-white rounded-xl text-spendwise-text-muted border border-transparent hover:border-slate-200 transition-all active:scale-95"><ChevronRight size={16} /></button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
