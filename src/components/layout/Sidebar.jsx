import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  PieChart, 
  FileBarChart, 
  Settings,
  Menu,
  ChevronLeft
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'add-expense', label: 'Add Expenses', icon: PlusCircle, path: '/add-expense' },
  { id: 'team-spend', label: 'Team Spend', icon: Users, path: '/team-spend' },
  { id: 'budgets', label: 'Budgets', icon: PieChart, path: '/budgets' },
  { id: 'reports', label: 'Reports', icon: FileBarChart, path: '/reports' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '88px' : '256px');
  }, [isCollapsed]);

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 88 : 256 }}
      className="h-screen bg-white border-r border-spendwise-border flex flex-col fixed left-0 top-0 z-50 overflow-hidden"
    >
      {/* Logo Section */}
      <div className={`p-6 mb-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-spendwise-primary rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-black text-spendwise-primary font-outfit tracking-tighter"
            >
              Spendwise
            </motion.span>
          )}
        </div>
        
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 hover:bg-slate-50 rounded-lg text-spendwise-text-muted transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {isCollapsed && (
        <button 
          onClick={() => setIsCollapsed(false)}
          className="mx-auto mb-6 p-2 hover:bg-slate-50 rounded-xl text-spendwise-primary transition-colors"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            title={isCollapsed ? item.label : ''}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group
              ${isActive 
                ? 'bg-spendwise-primary text-white shadow-xl shadow-indigo-100' 
                : 'text-spendwise-text-secondary hover:bg-slate-50 hover:text-spendwise-text-primary'}
            `}
          >
            <item.icon size={22} className="shrink-0" />
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-sm"
              >
                {item.label}
              </motion.span>
            )}
            
            {/* Active Glow */}
            <AnimatePresence>
              {isCollapsed && (
                <div className="absolute left-0 w-1 h-6 bg-spendwise-primary rounded-r-full hidden group-[.active]:block" />
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Profile Footer */}
      <div className="p-4 mt-auto">
        <div className={`
          bg-slate-50 border border-spendwise-border rounded-2xl transition-all duration-300
          ${isCollapsed ? 'p-2 flex flex-col items-center gap-4' : 'p-4 flex items-center gap-3'}
        `}>
          <div className="w-10 h-10 rounded-full bg-white overflow-hidden shrink-0 border-2 border-white shadow-enterprise">
             <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-spendwise-text-primary truncate uppercase tracking-tighter">Rajesh Kumar</p>
              <p className="text-[10px] font-bold text-spendwise-text-muted truncate uppercase">Finance Admin</p>
            </div>
          )}
          
          <button className="text-spendwise-text-muted hover:text-spendwise-primary transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
