import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-spendwise-primary text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100',
  secondary: 'bg-white text-spendwise-text-primary border border-spendwise-border hover:bg-slate-50 shadow-sm',
  outline: 'bg-transparent text-spendwise-primary border-2 border-spendwise-primary/20 hover:border-spendwise-primary/40 hover:bg-spendwise-primary/5',
  ghost: 'bg-transparent text-spendwise-text-secondary hover:bg-slate-100 hover:text-spendwise-text-primary',
  danger: 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  icon: Icon,
  iconPosition = 'left',
  ...props 
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 rounded-2xl font-bold uppercase tracking-widest transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={18} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={18} />}
        </>
      )}
    </motion.button>
  );
};

export default Button;
