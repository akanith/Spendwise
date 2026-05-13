import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle2, AlertCircle, Info, Clock } from 'lucide-react';

const notifications = [
  { id: 1, title: 'Budget Alert', msg: 'Marketing budget has reached 90%', type: 'warning', time: '2 mins ago' },
  { id: 2, title: 'Expense Approved', msg: 'Your AWS expense report was approved', type: 'success', time: '1 hour ago' },
  { id: 3, title: 'System Update', msg: 'Spendwise v2.4 is now live', type: 'info', time: '5 hours ago' },
];

const NotificationDropdown = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 mt-3 w-80 bg-white rounded-2xl border border-spendwise-border shadow-2xl z-[100] overflow-hidden"
    >
      <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
        <h4 className="text-sm font-bold text-spendwise-text-primary">Notifications</h4>
        <span className="text-[10px] font-bold text-spendwise-primary uppercase tracking-widest cursor-pointer hover:underline">Mark all read</span>
      </div>

      <div className="max-h-[350px] overflow-y-auto divide-y divide-slate-50">
        {notifications.map((n) => (
          <div key={n.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="flex gap-3">
              <div className={`
                p-2 rounded-xl shrink-0
                ${n.type === 'success' ? 'bg-green-50 text-green-600' : 
                  n.type === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}
              `}>
                {n.type === 'success' && <CheckCircle2 size={16} />}
                {n.type === 'warning' && <AlertCircle size={16} />}
                {n.type === 'info' && <Info size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-spendwise-text-primary group-hover:text-spendwise-primary transition-colors">{n.title}</h5>
                <p className="text-[11px] text-spendwise-text-secondary mt-0.5 line-clamp-2">{n.msg}</p>
                <div className="flex items-center gap-1 mt-2 text-[9px] font-bold text-spendwise-text-muted uppercase tracking-tighter">
                  <Clock size={10} />
                  {n.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-50 bg-slate-50/20 text-center">
        <button className="text-xs font-bold text-spendwise-text-secondary hover:text-spendwise-text-primary transition-colors">
          View all activity
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationDropdown;
