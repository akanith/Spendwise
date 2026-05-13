import React, { useState, useEffect } from 'react';
import StatCard from '../components/common/StatCard';
import SpendTrendChart from '../components/charts/SpendTrendChart';
import CategoryDonutChart from '../components/charts/CategoryDonutChart';
import { api } from '../services/api';
import { TableRowSkeleton } from '../components/common/Skeleton';
import { ArrowRight, MoreHorizontal, ExternalLink, RefreshCcw } from 'lucide-react';
import { parseINR } from '../utils/format';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [monthlySpend, setMonthlySpend] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [statsRes, txRes, spendRes] = await Promise.all([
        api.getDashboardStats(),
        api.getRecentTransactions(),
        api.getMonthlySpend(),
      ]);
      setStats(statsRes.data);
      setTransactions(txRes.data);
      setMonthlySpend(spendRes.data);
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
          <h3 className="text-lg font-bold text-spendwise-text-primary">Failed to load dashboard</h3>
          <p className="text-sm text-spendwise-text-muted">{error}</p>
        </div>
        <button onClick={fetchData} className="bg-spendwise-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-spendwise-text-primary font-outfit tracking-tight">Dashboard</h1>
        <p className="text-spendwise-text-secondary mt-1 text-sm font-medium">
          Welcome back, Rajesh. Here's your FY 2024–25 financial overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array(4).fill(0).map((_, i) => <StatCard key={i} isLoading />)
          : stats.map((stat) => <StatCard key={stat.id} {...stat} />)
        }
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spend Trend */}
        <div className="lg:col-span-2 enterprise-card enterprise-card-hover group">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-spendwise-text-primary font-outfit">Monthly Spend Trend</h3>
              <p className="text-xs text-spendwise-text-muted mt-0.5 font-medium">FY 2024–25 Performance Overview</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg bg-white shadow-enterprise text-spendwise-primary">Monthly</button>
              <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted hover:text-spendwise-text-primary transition-all">Quarterly</button>
            </div>
          </div>
          <SpendTrendChart data={isLoading ? [] : monthlySpend} />
        </div>

        {/* Spending Categories */}
        <div className="enterprise-card enterprise-card-hover flex flex-col group">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-spendwise-text-primary font-outfit">Spend Categories</h3>
            <p className="text-xs text-spendwise-text-muted mt-0.5 font-medium">Top expenses by department</p>
          </div>
          <CategoryDonutChart data={isLoading ? [] : null} />
          <div className="mt-auto space-y-4 pt-6 border-t border-slate-50">
            {[
              { name: 'Travel & Stay',   value: 38, color: '#4F46E5' },
              { name: 'Software/SaaS',   value: 24, color: '#818CF8' },
              { name: 'Vendor Payments', value: 18, color: '#C7D2FE' },
            ].map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full ring-4 ring-slate-50" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-spendwise-text-secondary font-bold uppercase tracking-wider">{cat.name}</span>
                </div>
                <span className="text-sm font-black text-spendwise-text-primary">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="xl:col-span-2 enterprise-card overflow-hidden !p-0">
          <div className="p-6 flex justify-between items-center border-b border-slate-50">
            <h3 className="text-lg font-bold text-spendwise-text-primary font-outfit">Recent Transactions</h3>
            <button className="text-[10px] font-black text-spendwise-primary uppercase tracking-widest flex items-center gap-2 group/btn">
              View All <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest font-black text-spendwise-text-muted border-b border-slate-50">
                  <th className="px-8 py-5">Employee</th>
                  <th className="px-8 py-5">Category</th>
                  <th className="px-8 py-5 text-right">Amount</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading
                  ? Array(4).fill(0).map((_, i) => (
                      <tr key={i}><td colSpan="6"><TableRowSkeleton /></td></tr>
                    ))
                  : transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-xs font-black text-indigo-600 border border-indigo-100 shadow-sm group-hover:scale-110 transition-transform">
                              {tx.employee.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-black text-spendwise-text-primary">{tx.employee.name}</p>
                              <p className="text-[10px] text-spendwise-text-muted font-bold uppercase tracking-tighter">{tx.employee.dept}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-xs font-bold text-spendwise-text-secondary bg-slate-100 px-2 py-1 rounded-lg">
                            {tx.category}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-sm font-black text-spendwise-text-primary text-right font-mono">{tx.amount}</td>
                        <td className="px-8 py-5 text-xs text-spendwise-text-secondary font-medium">{tx.date}</td>
                        <td className="px-8 py-5">
                          <span className={`status-badge ${
                            tx.status === 'Approved' ? 'status-approved' :
                            tx.status === 'Pending'  ? 'status-pending'  : 'status-rejected'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="p-2 hover:bg-slate-100 rounded-xl text-spendwise-text-muted transition-all">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Widgets */}
        <div className="space-y-6">
          <div className="enterprise-card !bg-indigo-50/30 border-dashed border-2 flex flex-col items-center justify-center text-center p-10 group cursor-pointer">
            <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-spendwise-text-muted shadow-lg group-hover:scale-110 transition-transform mb-6">
              <ExternalLink size={28} />
            </div>
            <h4 className="text-sm font-black text-spendwise-text-primary uppercase tracking-tight mb-2">All caught up!</h4>
            <p className="text-xs text-spendwise-text-muted mb-8 font-medium leading-relaxed">Your department expenses are on track. Submit a new GST-compliant expense when ready.</p>
            <button className="w-full bg-spendwise-primary text-white py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]">
              Add Expense
            </button>
          </div>

          <div className="enterprise-card border-red-100 flex flex-col items-center justify-center text-center p-10">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-6 border border-red-100">
              <span className="text-2xl font-black">!</span>
            </div>
            <h4 className="text-sm font-black text-spendwise-text-primary uppercase tracking-tight mb-2">TDS Sync Delayed</h4>
            <p className="text-xs text-spendwise-text-muted mb-8 font-medium leading-relaxed">Real-time TDS compliance data is out of sync. Retry to refresh.</p>
            <button className="flex items-center justify-center gap-2 text-red-600 bg-red-50 hover:bg-red-100 w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all active:scale-[0.98]">
              <span>↻</span> Retry Connection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
