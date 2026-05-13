import React, { useState, useEffect } from 'react';
import { animate } from 'framer-motion';

/**
 * Animated counter that rolls up to its target value.
 * Supports ₹ prefix, % suffix, and Indian number formatting (en-IN locale).
 */
const KPICounter = ({ value, prefix = '', suffix = '', duration = 1.5 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Strip all non-numeric characters except decimal
  const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;

  useEffect(() => {
    const controls = animate(0, numericValue, {
      duration,
      onUpdate(v) {
        setDisplayValue(v);
      },
    });
    return () => controls.stop();
  }, [numericValue, duration]);

  // Use Indian locale for ₹ prefix, otherwise use en-IN
  const hasDecimal = String(value).includes('.');
  const formatted = displayValue.toLocaleString('en-IN', {
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: 2,
  });

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export default KPICounter;
