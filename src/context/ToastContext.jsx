import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className={`
                flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-2xl border min-w-[320px] bg-white
                ${toast.type === 'success' ? 'border-green-100' : 
                  toast.type === 'error' ? 'border-red-100' : 'border-blue-100'}
              `}
            >
              <div className={`
                p-2 rounded-xl
                ${toast.type === 'success' ? 'bg-green-50 text-green-600' : 
                  toast.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}
              `}>
                {toast.type === 'success' && <CheckCircle2 size={18} />}
                {toast.type === 'error' && <AlertCircle size={18} />}
                {toast.type === 'info' && <Info size={18} />}
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-bold text-spendwise-text-primary">{toast.message}</p>
              </div>

              <button 
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-slate-50 rounded-lg text-spendwise-text-muted transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
