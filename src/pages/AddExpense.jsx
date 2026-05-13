import React, { useState } from 'react';
import {
  Upload, X, CheckCircle2, ChevronDown,
  Calendar as CalendarIcon, Info, Loader2, FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

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
    <div className="section-spacing">
      {/* Page Header */}
      <PageHeader 
        title="Add New Expense" 
        description="Record business expenditures with AI-assisted GST invoice scanning. Our engine automatically extracts vendor details, GSTIN, and amount from uploaded invoices."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Upload & Preview */}
        <div className="space-y-6 lg:sticky lg:top-28">
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
            <p className="text-sm font-bold text-spendwise-text-muted">or click to browse (PDF, JPG, PNG)</p>
          </motion.div>

          <AnimatePresence>
            {hasFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                className="enterprise-card !p-0 overflow-hidden shadow-2xl rounded-[32px]"
              >
                <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <FileText size={16} className="text-spendwise-primary" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-spendwise-text-primary">gst_invoice_oct2024.pdf</span>
                  </div>
                  <button onClick={() => setHasFile(false)} className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all">
                    <X size={18} />
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
                        <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.15em] mt-2">Extracting GSTIN & vendor details...</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Form */}
        <Card className="shadow-2xl shadow-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted flex items-center gap-2">
                Expense Title <Info size={12} className="text-spendwise-text-muted/40" />
              </label>
              <input
                type="text"
                placeholder="e.g. Client Dinner – The Oberoi, Mumbai"
                className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-6 py-4.5 text-sm font-black text-spendwise-text-primary focus:bg-white focus:border-spendwise-primary/20 focus:ring-4 focus:ring-spendwise-primary/5 outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted">Amount (₹)</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-spendwise-text-muted group-focus-within:text-spendwise-primary transition-colors">₹</span>
                  <input type="text" placeholder="0.00"
                    className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-12 py-4.5 text-sm font-black text-spendwise-text-primary focus:bg-white focus:border-spendwise-primary/20 focus:ring-4 focus:ring-spendwise-primary/5 outline-none transition-all placeholder:text-slate-300" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted">Category</label>
                <div className="relative">
                  <select className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-6 py-4.5 text-sm font-black text-spendwise-text-primary appearance-none outline-none focus:bg-white focus:border-spendwise-primary/20 focus:ring-4 focus:ring-spendwise-primary/5 transition-all cursor-pointer">
                    <option>Select Category</option>
                    <option>Meals & Entertainment</option>
                    <option>Domestic Travel</option>
                    <option>International Travel</option>
                    <option>Hotel & Accommodation</option>
                    <option>Software / SaaS</option>
                    <option>Marketing & Ads</option>
                    <option>Vendor Payment</option>
                    <option>GST Compliance</option>
                    <option>Office Supplies</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-spendwise-text-muted pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted">Department</label>
                <div className="relative">
                  <select className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-6 py-4.5 text-sm font-black text-spendwise-text-primary appearance-none outline-none focus:bg-white focus:border-spendwise-primary/20 focus:ring-4 focus:ring-spendwise-primary/5 transition-all cursor-pointer">
                    <option>Sales & Marketing</option>
                    <option>Engineering</option>
                    <option>Operations</option>
                    <option>Finance</option>
                    <option>Human Resources</option>
                    <option>Customer Success</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-spendwise-text-muted pointer-events-none" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted">Date</label>
                <div className="relative group">
                  <CalendarIcon size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-spendwise-text-muted group-focus-within:text-spendwise-primary transition-colors" />
                  <input type="date"
                    className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-14 py-4.5 text-sm font-black text-spendwise-text-primary outline-none focus:bg-white focus:border-spendwise-primary/20 focus:ring-4 focus:ring-spendwise-primary/5 transition-all" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted">Payment Method</label>
                <div className="relative">
                  <select className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-6 py-4.5 text-sm font-black text-spendwise-text-primary appearance-none outline-none focus:bg-white focus:border-spendwise-primary/20 focus:ring-4 focus:ring-spendwise-primary/5 transition-all cursor-pointer">
                    <option>Corporate UPI</option>
                    <option>HDFC Business Card</option>
                    <option>ICICI Corporate Card</option>
                    <option>Bank Transfer (NEFT/RTGS)</option>
                    <option>Razorpay Business</option>
                    <option>Cash (Petty Cash)</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-spendwise-text-muted pointer-events-none" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted">GST Rate</label>
                <div className="relative">
                  <select className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-6 py-4.5 text-sm font-black text-spendwise-text-primary appearance-none outline-none focus:bg-white focus:border-spendwise-primary/20 focus:ring-4 focus:ring-spendwise-primary/5 transition-all cursor-pointer">
                    <option>18% GST</option>
                    <option>12% GST</option>
                    <option>5% GST</option>
                    <option>0% / Exempt</option>
                    <option>Composite</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-spendwise-text-muted pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted">Notes / Business Justification</label>
              <textarea
                placeholder="Provide business purpose and any GST input credit justification for the finance team..."
                className="w-full bg-slate-50/50 border-2 border-transparent rounded-2xl px-6 py-5 text-sm font-bold text-spendwise-text-primary min-h-[140px] focus:bg-white focus:border-spendwise-primary/20 focus:ring-4 focus:ring-spendwise-primary/5 outline-none transition-all resize-none placeholder:text-slate-300"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="secondary" className="flex-1 py-5 rounded-[20px]">Save Draft</Button>
              <Button
                type="submit"
                className="flex-[2] py-5 rounded-[20px]"
                disabled={isSubmitting}
                icon={isSubmitting ? Loader2 : null}
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddExpense;
