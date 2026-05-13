import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, description, actions }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1 className="text-3xl font-black text-spendwise-text-primary font-outfit tracking-tight">{title}</h1>
        {description && (
          <p className="text-spendwise-text-secondary mt-1 text-sm font-medium">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </motion.div>
  );
};

export default PageHeader;
