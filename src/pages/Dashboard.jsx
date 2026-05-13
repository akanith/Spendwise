import React, { useState, useEffect } from 'react';
import StatCard from '../components/common/StatCard';
import SpendTrendChart from '../components/charts/SpendTrendChart';
import CategoryDonutChart from '../components/charts/CategoryDonutChart';
import { api } from '../services/api';
import { ArrowRight, MoreHorizontal, ExternalLink, RefreshCcw } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';

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
      <EmptyState
        icon={RefreshCcw}
        variant="danger"
        title="Failed to load dashboard"
        description={error}
        actionLabel="Try Again"
        onAction={fetchData}
      />
    );
  }

  return (
    <div className="section-spacing">
      {/* Page Header */}
      <PageHeader 
        title="Dashboard" 
        description="Welcome back, Rajesh. Here's your FY 2024–25 financial overview." 
      />

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
        <Card 
          title="Monthly Spend Trend" 
          subtitle="FY 2024–25 Performance Overview"
          className="lg:col-span-2"
          headerAction={
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg bg-white shadow-enterprise text-spendwise-primary">Monthly</button>
              <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted hover:text-spendwise-text-primary transition-all">Quarterly</button>
            </div>
          }
        >
          <SpendTrendChart data={isLoading ? [] : monthlySpend} />
        </Card>

        {/* Spending Categories */}
        <Card 
          title="Spend Categories" 
          subtitle="Top expenses by department"
          footer={
            <div className="space-y-4">
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
          }
        >
          <CategoryDonutChart data={isLoading ? [] : null} />
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card 
          title="Recent Transactions" 
          className="xl:col-span-2"
          noPadding
          headerAction={
            <button className="text-[10px] font-black text-spendwise-primary uppercase tracking-widest flex items-center gap-2 group/btn">
              View All <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          }
        >
          <DataTable
            isLoading={isLoading}
            headers={[
              { label: 'Employee' },
              { label: 'Category' },
              { label: 'Amount', align: 'right' },
              { label: 'Date' },
              { label: 'Status' },
              { label: '' },
            ]}
            data={transactions}
            renderRow={(tx) => (
              <>
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
                  <span className="text-[11px] font-bold text-spendwise-text-secondary bg-slate-100 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                    {tx.category}
                  </span>
                </td>
                <td className="px-8 py-5 text-sm font-black text-spendwise-text-primary text-right font-outfit">₹{tx.amount}</td>
                <td className="px-8 py-5 text-xs text-spendwise-text-secondary font-medium">{tx.date}</td>
                <td className="px-8 py-5">
                  <Badge status={tx.status}>{tx.status}</Badge>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 hover:bg-slate-100 rounded-xl text-spendwise-text-muted transition-all active:scale-90">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </>
            )}
          />
        </Card>

        {/* Quick Widgets */}
        <div className="grid-spacing flex flex-col">
          <Card className="flex-1 !bg-indigo-50/30 border-dashed border-2 text-center p-4">
            <div className="flex flex-col items-center justify-center h-full py-6">
              <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-spendwise-text-muted shadow-lg group-hover:scale-110 transition-transform mb-6">
                <ExternalLink size={28} />
              </div>
              <h4 className="text-sm font-black text-spendwise-text-primary uppercase tracking-tight mb-2">All caught up!</h4>
              <p className="text-xs text-spendwise-text-muted mb-8 font-medium leading-relaxed">Your department expenses are on track. Submit a new GST-compliant expense when ready.</p>
              <Button className="w-full">Add Expense</Button>
            </div>
          </Card>

          <Card className="!bg-red-50/30 border-red-100 text-center p-4">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-red-500 mb-6 border border-red-100 shadow-sm">
                <span className="text-2xl font-black">!</span>
              </div>
              <h4 className="text-sm font-black text-spendwise-text-primary uppercase tracking-tight mb-2">TDS Sync Delayed</h4>
              <p className="text-xs text-spendwise-text-muted mb-8 font-medium leading-relaxed">Real-time TDS compliance data is out of sync.</p>
              <Button variant="danger" className="w-full">↻ Retry Connection</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
