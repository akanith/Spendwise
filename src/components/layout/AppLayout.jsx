import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastProvider } from '../../context/ToastContext';

const AppLayout = ({ children }) => {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-spendwise-background flex">
        {/* Sidebar - Fixed */}
        <Sidebar />

        {/* Main Content Area */}
        <div 
          className="flex-1 flex flex-col min-w-0 transition-all duration-500 ease-in-out" 
          style={{ paddingLeft: 'var(--sidebar-width, 256px)' }}
        >
          <Topbar />
        
          <main className="flex-1 p-6 md:p-8 pt-0 lg:p-10 lg:pt-0 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[1600px] mx-auto"
              >
                {children}
              </motion.div>
            </AnimatePresence>

            {/* Footer */}
            <footer className="mt-20 py-10 border-t border-spendwise-border flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-spendwise-text-muted">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-spendwise-primary rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
                <span className="text-base font-black text-spendwise-text-primary font-outfit tracking-tighter uppercase">Spendwise AI</span>
                <span className="hidden md:inline text-slate-300">|</span>
                <span>© 2024 Spendwise AI. All rights reserved.</span>
              </div>
              <div className="flex gap-8 font-bold uppercase tracking-widest text-[10px]">
                <a href="#" className="hover:text-spendwise-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-spendwise-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-spendwise-primary transition-colors">Design System</a>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};

export default AppLayout;
