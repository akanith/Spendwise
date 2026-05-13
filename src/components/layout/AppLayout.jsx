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
          className="flex-1 flex flex-col min-w-0 transition-all duration-300" 
          style={{ paddingLeft: 'var(--sidebar-width, 256px)' }}
        >
          <Topbar />
        
          <main className="flex-1 p-8 pt-2 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>

            {/* Footer */}
            <footer className="mt-12 py-8 border-t border-spendwise-border flex justify-between items-center text-xs text-spendwise-text-muted">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-spendwise-text-primary font-outfit">Spendwise</span>
                <span>© 2024 Spendwise AI. All rights reserved.</span>
              </div>
              <div className="flex gap-6">
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
