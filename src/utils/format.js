/**
 * Indian Rupee formatting utilities
 */

/**
 * Format a number as Indian Rupee using en-IN locale
 * e.g. 1245000 → ₹12,45,000
 */
export const formatINR = (amount) => {
  const num = Math.round(Number(amount));
  return '₹' + num.toLocaleString('en-IN');
};

/**
 * Compact Indian format for large numbers
 * e.g. 10000000 → ₹1Cr, 500000 → ₹5L, 85000 → ₹85K
 */
export const formatINRCompact = (value) => {
  const num = Number(value);
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000)   return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000)     return `₹${(num / 1000).toFixed(0)}K`;
  return `₹${num.toLocaleString('en-IN')}`;
};

/**
 * Strip non-numeric characters from an INR string for calculations
 * e.g. "₹12,45,000" → 1245000
 */
export const parseINR = (str) => {
  return parseFloat(String(str).replace(/[^0-9.]/g, '')) || 0;
};
