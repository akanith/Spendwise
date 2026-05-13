import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  variant = 'default' 
}) => {
  const isDanger = variant === 'danger';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        flex flex-col items-center justify-center text-center p-12 rounded-3xl border-2 border-dashed
        ${isDanger ? 'bg-red-50/30 border-red-100' : 'bg-slate-50/50 border-slate-100'}
      `}
    >
      <div className={`
        w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl
        ${isDanger ? 'bg-white text-red-500' : 'bg-white text-spendwise-text-muted'}
      `}>
        {Icon ? <Icon size={32} /> : <span className="text-2xl font-black">!</span>}
      </div>
      
      <h4 className="text-lg font-black text-spendwise-text-primary uppercase tracking-tight mb-2">
        {title}
      </h4>
      
      <p className="text-sm text-spendwise-text-muted max-w-sm mb-8 font-medium leading-relaxed">
        {description}
      </p>
      
      {actionLabel && (
        <Button 
          variant={isDanger ? 'danger' : 'primary'} 
          onClick={onAction}
          className="min-w-[200px]"
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
