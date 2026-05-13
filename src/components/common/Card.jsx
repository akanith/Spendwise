import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  headerAction, 
  footer, 
  className = '',
  noPadding = false,
  hoverEffect = true,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`enterprise-card ${hoverEffect ? 'enterprise-card-hover group' : ''} ${className} flex flex-col`}
    >
      {(title || subtitle || headerAction) && (
        <div className={`flex justify-between items-center mb-6 ${noPadding ? 'p-6 pb-0' : ''}`}>
          <div>
            {title && <h3 className="text-lg font-bold text-spendwise-text-primary font-outfit">{title}</h3>}
            {subtitle && <p className="text-xs text-spendwise-text-muted mt-0.5 font-medium">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      
      <div className={`flex-1 ${noPadding ? '' : 'pt-0'}`}>
        {children}
      </div>

      {footer && (
        <div className={`mt-auto pt-6 border-t border-slate-50 ${noPadding ? 'p-6 pt-6' : ''}`}>
          {footer}
        </div>
      )}
    </motion.div>
  );
};

export default Card;
