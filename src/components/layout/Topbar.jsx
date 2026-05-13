import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, Loader2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import NotificationDropdown from './NotificationDropdown';

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e.target.value.length > 0) {
      setIsSearching(true);
      setTimeout(() => setIsSearching(false), 1000); // Simulate search delay
    } else {
      setIsSearching(false);
    }
  };

  return (
    <header className="h-24 bg-spendwise-background flex items-center justify-between px-8 md:px-10 sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
          {isSearching ? (
            <Loader2 size={18} className="text-spendwise-primary animate-spin" />
          ) : (
            <Search 
              size={18} 
              className="text-spendwise-text-muted group-focus-within:text-spendwise-primary transition-colors" 
            />
          )}
        </div>
        <input 
          type="text" 
          onChange={handleSearch}
          placeholder="Search budgets, departments, or transactions..." 
          className="w-full bg-slate-100 border-2 border-transparent rounded-2xl py-3.5 pl-14 pr-6 text-sm font-medium focus:bg-white focus:border-spendwise-primary/10 focus:ring-[12px] focus:ring-spendwise-primary/5 transition-all outline-none"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-8 ml-8">
        {/* Company Selector */}
        <div className="hidden lg:flex items-center gap-3 bg-white border border-spendwise-border rounded-2xl px-5 py-2.5 enterprise-shadow cursor-pointer hover:bg-slate-50 transition-all interactive-button">
          <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] text-white font-black shadow-sm">IL</div>
          <span className="text-sm font-bold text-spendwise-text-primary">Infosys Ltd.</span>
          <ChevronDown size={14} className="text-spendwise-text-muted" />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <div 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`
              p-3 rounded-2xl border cursor-pointer transition-all duration-300 interactive-button
              ${showNotifications ? 'bg-spendwise-primary text-white border-spendwise-primary shadow-lg shadow-indigo-100' : 'bg-white text-spendwise-text-secondary border-spendwise-border shadow-enterprise hover:bg-slate-50'}
            `}
          >
            <Bell size={20} />
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-4 border-spendwise-background rounded-full flex items-center justify-center text-[8px] text-white font-black">
            3
          </span>

          <AnimatePresence>
            {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 pl-8 border-l border-spendwise-border">
          <div className="hidden md:block text-right">
            <p className="text-xs font-black text-spendwise-text-primary uppercase tracking-tight">Rajesh Kumar</p>
            <p className="text-[10px] font-bold text-spendwise-primary uppercase tracking-widest">Administrator</p>
          </div>
          <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-enterprise bg-white overflow-hidden cursor-pointer hover:border-spendwise-primary transition-all duration-300 interactive-button">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
