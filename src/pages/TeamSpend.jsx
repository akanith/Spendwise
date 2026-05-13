import React, { useState, useEffect } from 'react';
import StatCard from '../components/common/StatCard';
import { api } from '../services/api';
import { TableRowSkeleton } from '../components/common/Skeleton';
import {
  Filter, Search, MoreHorizontal, FileText, Download,
  Calendar, RefreshCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseINR } from '../utils/format';

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

  // Total reflected in INR format
  const totalReflected = filteredExpenses
    .reduce((sum, tx) => sum + parseINR(tx.amount), 0)
    .toLocaleString('en-IN');

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center border border-red-100"><RefreshCcw size={32} /></div>
        <div>
          <h3 className="text-lg font-bold text-spendwise-text-primary">Failed to load transactions</h3>
          <p className="text-sm text-spendwise-text-muted">{error}</p>
        </div>
        <button onClick={fetchData} className="bg-spendwise-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">Try Again</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-spendwise-text-primary font-outfit tracking-tight">Team Spend Log</h1>
          <p className="text-spendwise-text-secondary mt-1 text-sm font-medium">Real-time monitoring of all GST-tagged transactions across departments — FY 2024–25.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 bg-white border border-spendwise-border px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-spendwise-text-primary shadow-enterprise hover:bg-slate-50 transition-all interactive-button">
            <Download size={16} /> Export CSV
          </button>
          <button className="flex items-center gap-2 bg-spendwise-primary px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all interactive-button">
            <Calendar size={16} /> Custom Period
          </button>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Spend" value="₹6,42,800" trend="+12%" trendType="up" subtext="Current billing cycle" icon="Wallet" isLoading={isLoading} />
        <StatCard label="Pending Approval" value="18" trend="-4 items" trendType="up" subtext="Awaiting review" icon="Clock" isLoading={isLoading} />
        <StatCard label="TDS Violations" value="2" trend="+1 flag" trendType="down" subtext="Requires urgent attention" icon="AlertCircle" isLoading={isLoading} />
      </div>

      {/* Filter Bar */}
      <div className="enterprise-card !p-4 flex flex-col md:flex-row gap-4 items-center bg-white shadow-xl shadow-slate-100/50">
        <div className="flex-1 w-full relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spendwise-text-muted" />
          <input
            type="text"
            placeholder="Search by name, category, or amount..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50/50 border border-transparent rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:bg-white focus:border-spendwise-primary/10 transition-all outline-none"
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
              <option>Sales &amp; Marketing</option>
              <option>Operations</option>
              <option>Finance</option>
            </select>
            <Filter size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-spendwise-text-muted pointer-events-none" />
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg interactive-button">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="enterprise-card !p-0 overflow-hidden shadow-2xl shadow-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest font-black text-spendwise-text-muted border-b border-slate-50">
                <th className="px-8 py-5 cursor-pointer hover:text-spendwise-primary transition-colors" onClick={() => handleSort('employee')}>
                  Employee {sortConfig.key === 'employee' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5 cursor-pointer hover:text-spendwise-primary transition-colors text-right" onClick={() => handleSort('amount')}>
                  Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-5 cursor-pointer hover:text-spendwise-primary transition-colors" onClick={() => handleSort('date')}>
                  Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-5">Payment Method</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Receipt</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array(6).fill(0).map((_, i) => (
                    <tr key={i}><td colSpan="8"><TableRowSkeleton /></td></tr>
                  ))
                ) : filteredExpenses.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-spendwise-text-muted">
                        <div className="p-4 bg-slate-50 rounded-3xl"><Search size={32} /></div>
                        <p className="text-sm font-bold uppercase tracking-widest italic">No transactions found for your criteria</p>
                        <button onClick={() => { setFilterDept('All Departments'); setSearchQuery(''); }} className="text-xs font-black text-spendwise-primary underline underline-offset-4 uppercase tracking-[0.2em]">Reset Search</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredExpenses.map((tx) => (
                    <motion.tr layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
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
                      <td className="px-8 py-5 text-sm font-black text-spendwise-text-primary text-right font-mono">{tx.amount}</td>
                      <td className="px-8 py-5 text-[11px] text-spendwise-text-muted font-bold uppercase tracking-tight">{tx.date}</td>
                      <td className="px-8 py-5">
                        <span className="text-[10px] text-spendwise-text-secondary font-medium">{tx.paymentMethod}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`status-badge !rounded-xl !px-3 !py-1 !text-[9px] !font-black !uppercase !tracking-[0.1em] ${
                          tx.status === 'Approved' ? 'status-approved' :
                          tx.status === 'Pending'  ? 'status-pending'  : 'status-rejected'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2.5 bg-slate-50 text-spendwise-text-muted rounded-xl hover:bg-spendwise-primary hover:text-white transition-all shadow-sm">
                          <FileText size={16} />
                        </button>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 hover:bg-slate-100 rounded-xl text-spendwise-text-muted transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

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
          <button className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted interactive-button">Load More</button>
        </div>
      </div>
    </div>
  );
};

export default TeamSpend;
