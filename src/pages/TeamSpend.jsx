import React, { useState, useEffect } from 'react';
import StatCard from '../components/common/StatCard';
import { api } from '../services/api';
import {
  Filter, Search, MoreHorizontal, FileText, Download,
  Calendar, RefreshCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseINR } from '../utils/format';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';

const TeamSpend = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDept, setFilterDept] = useState('All Departments');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.getTeamExpenses({ dept: filterDept });
      setExpenses(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [filterDept]);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortConfig.key === 'amount') {
      const valA = parseINR(a.amount);
      const valB = parseINR(b.amount);
      return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
    }
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ?  1 : -1;
    return 0;
  });

  const filteredExpenses = sortedExpenses.filter(
    (tx) =>
      tx.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalReflected = filteredExpenses
    .reduce((sum, tx) => sum + parseINR(tx.amount), 0)
    .toLocaleString('en-IN');

  if (error) {
    return (
      <EmptyState
        icon={RefreshCcw}
        variant="danger"
        title="Failed to load transactions"
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
        title="Team Spend Log" 
        description="Real-time monitoring of all GST-tagged transactions across departments — FY 2024–25."
        actions={
          <>
            <Button variant="secondary" icon={Download}>Export CSV</Button>
            <Button icon={Calendar}>Custom Period</Button>
          </>
        }
      />

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Spend" value="₹6,42,800" trend="+12%" trendType="up" subtext="Current billing cycle" icon="Wallet" isLoading={isLoading} />
        <StatCard label="Pending Approval" value="18" trend="-4 items" trendType="up" subtext="Awaiting review" icon="Clock" isLoading={isLoading} />
        <StatCard label="TDS Violations" value="2" trend="+1 flag" trendType="down" subtext="Requires urgent attention" icon="AlertCircle" isLoading={isLoading} />
      </div>

      {/* Filter Bar */}
      <Card className="!p-4 shadow-xl shadow-slate-100/50" noPadding>
        <div className="flex flex-col md:flex-row gap-4 items-center p-4">
          <div className="flex-1 w-full relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spendwise-text-muted group-focus-within:text-spendwise-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by name, category, or amount..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:bg-white focus:border-spendwise-primary/10 transition-all outline-none"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative shrink-0 min-w-[200px]">
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="w-full bg-white border border-spendwise-border rounded-xl px-5 py-3 text-xs font-bold text-spendwise-text-primary appearance-none outline-none focus:ring-4 focus:ring-spendwise-primary/5 transition-all cursor-pointer shadow-enterprise"
              >
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Sales & Marketing</option>
                <option>Operations</option>
                <option>Finance</option>
              </select>
              <Filter size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-spendwise-text-muted pointer-events-none" />
            </div>
            <Button className="min-w-[140px]">Apply Filters</Button>
          </div>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card noPadding hoverEffect={false}>
        <DataTable
          isLoading={isLoading}
          headers={[
            { label: 'Employee' },
            { label: 'Category' },
            { label: 'Amount', align: 'right' },
            { label: 'Date' },
            { label: 'Payment Method' },
            { label: 'Status' },
            { label: 'Receipt', align: 'right' },
            { label: '' },
          ]}
          data={filteredExpenses}
          emptyMessage={
            <div className="flex flex-col items-center gap-4 py-10">
              <div className="p-6 bg-slate-50 rounded-3xl text-spendwise-text-muted"><Search size={32} /></div>
              <p className="text-sm font-bold uppercase tracking-widest italic">No transactions found</p>
              <Button variant="ghost" size="sm" onClick={() => { setFilterDept('All Departments'); setSearchQuery(''); }}>Reset Search</Button>
            </div>
          }
          renderRow={(tx) => (
            <>
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-xs font-black text-spendwise-text-secondary shadow-sm group-hover:scale-110 group-hover:border-spendwise-primary/30 transition-all">
                    {tx.employee.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-black text-spendwise-text-primary">{tx.employee.name}</p>
                    <p className="text-[10px] text-spendwise-text-muted font-bold uppercase tracking-tighter italic">{tx.employee.dept}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5">
                <span className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-secondary bg-white border border-slate-100 px-3 py-1.5 rounded-xl shadow-sm">
                  {tx.category}
                </span>
              </td>
              <td className="px-8 py-5 text-sm font-black text-spendwise-text-primary text-right font-outfit">₹{tx.amount}</td>
              <td className="px-8 py-5 text-[11px] text-spendwise-text-muted font-bold uppercase tracking-tight">{tx.date}</td>
              <td className="px-8 py-5">
                <span className="text-[10px] text-spendwise-text-secondary font-medium">{tx.paymentMethod}</span>
              </td>
              <td className="px-8 py-5">
                <Badge status={tx.status}>{tx.status}</Badge>
              </td>
              <td className="px-8 py-5 text-right">
                <button className="p-2.5 bg-slate-50 text-spendwise-text-muted rounded-xl hover:bg-spendwise-primary hover:text-white transition-all shadow-sm active:scale-95">
                  <FileText size={16} />
                </button>
              </td>
              <td className="px-8 py-5 text-right">
                <button className="p-2 hover:bg-slate-100 rounded-xl text-spendwise-text-muted transition-all active:scale-90">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </>
          )}
        />

        {/* Footer Metrics */}
        <div className="p-6 bg-slate-50/20 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-8 items-center">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-spendwise-text-muted mb-1">Items Found</p>
              <p className="text-sm font-black text-spendwise-text-primary">{filteredExpenses.length}</p>
            </div>
            <div className="w-px h-8 bg-slate-100 hidden sm:block" />
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-spendwise-text-muted mb-1">Total Reflected</p>
              <p className="text-sm font-black text-spendwise-text-primary">₹{totalReflected}</p>
            </div>
          </div>
          <Button variant="secondary" size="sm">Load More</Button>
        </div>
      </Card>
    </div>
  );
};

export default TeamSpend;
