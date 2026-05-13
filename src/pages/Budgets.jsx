import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Download, Filter, MoreVertical, Sparkles, ArrowRight,
  ChevronRight, ChevronLeft, RefreshCcw, Wallet, Activity, PieChart as PieIcon, AlertTriangle,
} from 'lucide-react';
import { api } from '../services/api';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import StatCard from '../components/common/StatCard';
import Button from '../components/common/Button';
import GroupedBarChart from '../components/charts/GroupedBarChart';

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
      <EmptyState
        icon={RefreshCcw}
        variant="danger"
        title="Failed to load budgets"
        description={error}
        actionLabel="Try Again"
        onAction={fetchData}
      />
    );
  }

  const statCards = [
    { label: 'Total Allocated Budget', value: '₹2,50,00,000', trend: '4.2%', trendType: 'up', subtext: 'Vs. ₹2.4Cr last period', icon: 'Wallet' },
    { label: 'Current Spend', value: '₹1,84,00,000', trend: 'Stable', trendType: 'up', subtext: '72% of total allocated', icon: 'Activity' },
    { label: 'Remaining Budget', value: '₹70,00,000', trend: '12%', trendType: 'down', subtext: 'For remaining 14 days', icon: 'PieChart' },
    { label: 'Over-budget Depts', value: '2', trend: '+1 Dept', trendType: 'down', subtext: 'Marketing, Operations', icon: 'AlertCircle' },
  ];

  const deptColors = {
    Engineering: '#4F46E5',
    Operations:  '#B45309',
    Marketing:   '#B91C1C',
    Sales:       '#4F46E5',
  };

  return (
    <div className="section-spacing">
      {/* Page Header */}
      <PageHeader 
        title="Budgets" 
        description="Monitor and control departmental spending across your organisation — FY 2024–25."
        actions={
          <>
            <div className="flex bg-white border border-spendwise-border rounded-xl p-1 shadow-enterprise">
              <button className="px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg bg-spendwise-primary text-white shadow-sm">Monthly</button>
              <button className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted hover:text-spendwise-text-primary transition-colors">Quarterly</button>
            </div>
            <Button variant="secondary" icon={Download}>Export Report</Button>
            <Button icon={Plus}>Create Budget</Button>
          </>
        }
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <StatCard key={i} {...card} isLoading={isLoading} />
        ))}
      </div>

      {/* Chart + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grouped Bar Chart */}
        <Card 
          title="Budget vs Actual by Department" 
          subtitle="Values in ₹ Lakhs (L)"
          className="lg:col-span-2"
          headerAction={
            <button className="flex items-center gap-2 text-xs font-bold text-spendwise-text-secondary border border-spendwise-border px-4 py-2 rounded-xl hover:bg-slate-50 transition-all active:scale-95">
              All Departments <ChevronRight size={14} className="rotate-90" />
            </button>
          }
        >
          <GroupedBarChart />
        </Card>

        {/* AI Insights */}
        <div className="bg-spendwise-primary rounded-[32px] p-8 text-white flex flex-col relative overflow-hidden shadow-2xl shadow-indigo-200 group">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-xl" />

          <div className="flex items-center gap-3 mb-7 relative">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/10 backdrop-blur-sm">
              <Sparkles size={20} className="text-indigo-200" />
            </div>
            <h3 className="text-lg font-black font-outfit uppercase tracking-tight">AI Insights</h3>
          </div>

          <div className="space-y-4 relative flex-1">
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all cursor-pointer group/item">
              <p className="text-xs font-medium text-indigo-100 leading-relaxed mb-3">
                Marketing expenses are projected to exceed budget by{' '}
                <span className="font-black text-white">₹3.5L this month</span> based on historical ad campaign cycles.
              </p>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-200 group-hover/item:text-white transition-colors">
                Take action <ArrowRight size={12} className="group-hover/item:translate-x-1 transition-transform" />
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
            <div className="w-2 h-2 rounded-full bg-indigo-300 animate-pulse mt-1.5 shrink-0 shadow-[0_0_8px_rgba(165,180,252,0.8)]" />
            <p className="text-[10px] text-indigo-200 font-bold leading-relaxed italic">
              Data sync delayed for Sales dept. TDS analytics for this segment may be stale.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Budget Breakdown */}
      <Card 
        title="Detailed Budget Breakdown" 
        noPadding
        headerAction={
          <div className="flex gap-2">
            <button className="p-2.5 hover:bg-slate-50 rounded-xl text-spendwise-text-muted transition-all border border-transparent hover:border-slate-200 active:scale-90"><Filter size={16} /></button>
            <button className="p-2.5 hover:bg-slate-50 rounded-xl text-spendwise-text-muted transition-all active:scale-90"><MoreVertical size={16} /></button>
          </div>
        }
      >
        <DataTable
          isLoading={isLoading}
          headers={[
            { label: 'Department' },
            { label: 'Allocated Budget' },
            { label: 'Actual Spend' },
            { label: 'Remaining' },
            { label: 'Utilization %' },
            { label: 'Status' },
          ]}
          data={budgets}
          renderRow={(item) => (
            <>
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-9 rounded-full" style={{ backgroundColor: deptColors[item.department] || '#94A3B8' }} />
                  <div>
                    <p className="text-sm font-black text-spendwise-text-primary">{item.department}</p>
                    <p className="text-[9px] text-spendwise-text-muted font-black uppercase tracking-widest">COST CENTER: {item.costCenter}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5 text-sm font-black text-spendwise-text-primary font-outfit">{item.allocated}</td>
              <td className={`px-8 py-5 text-sm font-black font-outfit ${item.status === 'Over Budget' ? 'text-red-600' : 'text-spendwise-text-secondary'}`}>
                {item.actual}
              </td>
              <td className={`px-8 py-5 text-sm font-black font-outfit ${item.remaining.startsWith('-') ? 'text-red-600' : 'text-spendwise-primary'}`}>
                {item.remaining}
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center gap-3 min-w-[140px]">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(item.utilization, 100)}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="h-full rounded-full shadow-[0_0_8px_rgba(79,70,229,0.3)]"
                      style={{
                        backgroundColor:
                          item.utilization > 100 ? '#DC2626' :
                          item.utilization > 85  ? '#F59E0B' : '#4F46E5',
                      }}
                    />
                  </div>
                  <span className="text-xs font-black text-spendwise-text-primary w-10 text-right font-outfit">{item.utilization}%</span>
                </div>
              </td>
              <td className="px-8 py-5">
                <Badge status={item.status === 'Healthy' ? 'Approved' : item.status === 'Warning' ? 'Pending' : 'Rejected'}>
                  {item.status}
                </Badge>
              </td>
            </>
          )}
        />

        {/* Pagination */}
        <div className="px-8 py-4 bg-slate-50/20 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted">Showing 4 of 12 Departments</p>
          <div className="flex items-center gap-1">
            <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted transition-all active:scale-95 flex items-center gap-1">
              <ChevronLeft size={13} /> Prev
            </button>
            <button className="w-8 h-8 bg-spendwise-primary text-white rounded-xl text-xs font-black shadow-lg">1</button>
            <button className="w-8 h-8 hover:bg-white rounded-xl text-xs font-black text-spendwise-text-muted border border-transparent hover:border-slate-200 transition-all">2</button>
            <button className="w-8 h-8 hover:bg-white rounded-xl text-xs font-black text-spendwise-text-muted border border-transparent hover:border-slate-200 transition-all">3</button>
            <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted transition-all active:scale-95 flex items-center gap-1">
              Next <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Budgets;
