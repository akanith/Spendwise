import React, { useState, useCallback } from 'react';
import {
  Upload, X, CheckCircle2, ChevronDown,
  Calendar as CalendarIcon, Info, Loader2, FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';

const AddExpense = () => {
  const { showToast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasFile, setHasFile] = useState(false);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); simulateUpload(); };

  const simulateUpload = () => {
    setHasFile(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          showToast('GST invoice uploaded and scanned successfully');
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.submitExpense({});
      showToast('Expense report submitted for approval', 'success');
    } catch (err) {
      showToast('Failed to submit expense. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-spendwise-text-primary font-outfit tracking-tight">Add New Expense</h1>
          <p className="text-spendwise-text-secondary mt-1 text-sm font-medium leading-relaxed max-w-xl">
            Record business expenditures with AI-assisted GST invoice scanning. Our engine automatically extracts vendor details, GSTIN, and amount from uploaded invoices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Upload & Preview */}
        <div className="space-y-8 sticky top-28">
          <motion.div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            whileHover={{ scale: 1.01 }}
            onClick={() => !hasFile && simulateUpload()}
            className={`enterprise-card border-dashed border-2 flex flex-col items-center justify-center p-16 text-center transition-all duration-300 cursor-pointer ${isDragging ? 'bg-indigo-50 border-spendwise-primary scale-105' : 'bg-slate-50/50 border-slate-200'} ${hasFile ? 'border-spendwise-primary/50' : ''}`}
          >
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl mb-8 transition-all duration-500 ${isDragging ? 'bg-spendwise-primary text-white scale-110' : 'bg-white text-spendwise-text-muted'}`}>
              <Upload size={36} />
            </div>
            <h4 className="text-xl font-black text-spendwise-text-primary mb-2">Drop your GST invoice here</h4>
            <p className="text-sm font-medium text-spendwise-text-muted">or click to browse (PDF, JPG, PNG)</p>
          </motion.div>

          <AnimatePresence>
            {hasFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                className="enterprise-card !p-0 overflow-hidden shadow-2xl"
              >
                <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-white">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-spendwise-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-primary">gst_invoice_oct2024.pdf</span>
                  </div>
                  <button onClick={() => setHasFile(false)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-xl transition-all">
                    <X size={16} />
                  </button>
                </div>
                <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    alt="Invoice Preview"
                    className={`w-full h-full object-cover transition-all duration-1000 ${uploadProgress < 100 ? 'grayscale blur-sm' : 'grayscale-0 blur-0'}`}
                  />
                  {uploadProgress < 100 && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center p-12 text-center">
                      <div className="w-full space-y-4">
                        <div className="flex justify-between items-end text-white text-[10px] font-black uppercase tracking-[0.2em]">
                          <span>OCR Scanning Invoice</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div className="h-full bg-spendwise-primary shadow-[0_0_20px_rgba(79,70,229,0.5)]" initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} />
                        </div>
                        <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Extracting GSTIN & vendor details...</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Form */}
        <div className="enterprise-card space-y-8 shadow-2xl shadow-slate-100">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted flex items-center gap-2">
              Expense Title <Info size={12} className="text-spendwise-text-muted/40" />
            </label>
            <input
              type="text"
              placeholder="e.g. Client Dinner – The Oberoi, Mumbai"
              className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-spendwise-text-primary focus:bg-white focus:border-spendwise-primary/10 focus:ring-4 focus:ring-spendwise-primary/5 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted">Amount (₹)</label>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-spendwise-text-muted group-focus-within:text-spendwise-primary transition-colors">₹</span>
                <input type="text" placeholder="0.00"
                  className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-10 py-4 text-sm font-black text-spendwise-text-primary focus:bg-white focus:border-spendwise-primary/10 focus:ring-4 focus:ring-spendwise-primary/5 outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted">Category</label>
              <div className="relative">
                <select className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-spendwise-text-primary appearance-none outline-none focus:bg-white focus:border-spendwise-primary/10 focus:ring-4 focus:ring-spendwise-primary/5 transition-all cursor-pointer">
                  <option>Select Category</option>
                  <option>Meals &amp; Entertainment</option>
                  <option>Domestic Travel</option>
                  <option>International Travel</option>
                  <option>Hotel &amp; Accommodation</option>
                  <option>Software / SaaS</option>
                  <option>Marketing &amp; Ads</option>
                  <option>Vendor Payment</option>
                  <option>GST Compliance</option>
                  <option>Office Supplies</option>
                </select>
                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-spendwise-text-muted pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted">Department</label>
              <div className="relative">
                <select className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-spendwise-text-primary appearance-none outline-none focus:bg-white focus:border-spendwise-primary/10 focus:ring-4 focus:ring-spendwise-primary/5 transition-all cursor-pointer">
                  <option>Sales &amp; Marketing</option>
                  <option>Engineering</option>
                  <option>Operations</option>
                  <option>Finance</option>
                  <option>Human Resources</option>
                  <option>Customer Success</option>
                </select>
                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-spendwise-text-muted pointer-events-none" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted">Date (DD/MM/YYYY)</label>
              <div className="relative group">
                <CalendarIcon size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-spendwise-text-muted group-focus-within:text-spendwise-primary transition-colors" />
                <input type="date"
                  className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-12 py-4 text-sm font-bold text-spendwise-text-primary outline-none focus:bg-white focus:border-spendwise-primary/10 focus:ring-4 focus:ring-spendwise-primary/5 transition-all" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted">Payment Method</label>
              <div className="relative">
                <select className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-spendwise-text-primary appearance-none outline-none focus:bg-white focus:border-spendwise-primary/10 focus:ring-4 focus:ring-spendwise-primary/5 transition-all cursor-pointer">
                  <option>Corporate UPI</option>
                  <option>HDFC Business Card</option>
                  <option>ICICI Corporate Card</option>
                  <option>Bank Transfer (NEFT/RTGS)</option>
                  <option>Razorpay Business</option>
                  <option>Cash (Petty Cash)</option>
                </select>
                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-spendwise-text-muted pointer-events-none" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted">GST Rate</label>
              <div className="relative">
                <select className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-spendwise-text-primary appearance-none outline-none focus:bg-white focus:border-spendwise-primary/10 focus:ring-4 focus:ring-spendwise-primary/5 transition-all cursor-pointer">
                  <option>18% GST</option>
                  <option>12% GST</option>
                  <option>5% GST</option>
                  <option>0% / Exempt</option>
                  <option>Composite</option>
                </select>
                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-spendwise-text-muted pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-muted">Notes / Business Justification</label>
            <textarea
              placeholder="Provide business purpose and any GST input credit justification for the finance team..."
              className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-5 py-5 text-sm font-medium text-spendwise-text-primary min-h-[120px] focus:bg-white focus:border-spendwise-primary/10 focus:ring-4 focus:ring-spendwise-primary/5 outline-none transition-all resize-none"
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button className="flex-1 bg-white border-2 border-slate-100 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-spendwise-text-primary hover:bg-slate-50 transition-all interactive-button">
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-[2] bg-spendwise-primary text-white py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 interactive-button"
            >
              {isSubmitting ? (
                <><Loader2 size={18} className="animate-spin" /> Submitting...</>
              ) : 'Submit for Approval'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
