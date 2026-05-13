import React from 'react';
import {
  Mail, Phone, Briefcase, Building2, Laptop,
  Smartphone, LogOut, MapPin, Calendar, RefreshCcw, Edit2, ChevronRight,
} from 'lucide-react';

const Settings = () => {
  const loginActivity = [
    { id: 1, device: 'MacBook Pro 16"', location: 'Bengaluru, KA', ip: '10.0.0.12', time: 'Today, 09:42 AM', status: 'Current', icon: Laptop },
    { id: 2, device: 'OnePlus 12 Pro',  location: 'Bengaluru, KA', ip: '10.0.0.45', time: 'Yesterday, 11:15 PM', status: 'Active', icon: Smartphone },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="enterprise-card flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
        {/* Profile Image */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-slate-50 shadow-sm transition-transform group-hover:scale-105 duration-300">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Rajesh Kumar"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute -bottom-2 -right-2 p-2 bg-spendwise-primary text-white rounded-xl shadow-lg border-2 border-white hover:bg-indigo-700 transition-all">
            <Edit2 size={16} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h2 className="text-3xl font-black text-spendwise-text-primary font-outfit">Rajesh Kumar</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100 w-fit self-center md:self-auto">
                Premium Admin
              </span>
            </div>
            <p className="text-spendwise-text-secondary font-medium">Finance Operations Manager at Infosys Ltd.</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs text-spendwise-text-muted font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-spendwise-text-muted/50" />
              <span>Bengaluru, KA</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-spendwise-text-muted/50" />
              <span>Joined Apr 2022</span>
            </div>
          </div>

          {/* PAN & GSTIN */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[9px] font-black uppercase tracking-widest text-spendwise-text-muted">PAN: </span>
              <span className="text-[10px] font-black text-spendwise-text-primary font-mono">ABCDE1234F</span>
            </div>
            <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[9px] font-black uppercase tracking-widest text-spendwise-text-muted">GSTIN: </span>
              <span className="text-[10px] font-black text-spendwise-text-primary font-mono">29ABCDE1234F1Z5</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 md:self-center">
          <button className="px-6 py-2.5 rounded-xl border border-spendwise-border text-sm font-bold text-spendwise-text-primary hover:bg-slate-50 transition-all">
            Log Out
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-spendwise-primary text-white text-sm font-bold shadow-enterprise hover:bg-indigo-700 transition-all">
            Save Changes
          </button>
        </div>
      </div>

      {/* Primary Information */}
      <div className="enterprise-card space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-spendwise-text-primary font-outfit">Primary Information</h3>
          <button className="flex items-center gap-2 text-spendwise-primary text-xs font-bold hover:underline">
            <RefreshCcw size={14} /> Verify Contact
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-spendwise-text-muted">Email Address</label>
            <div className="relative group">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spendwise-primary" />
              <input type="email" defaultValue="r.kumar@infosys.com"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-12 py-4 text-sm font-bold text-spendwise-text-primary focus:bg-white focus:ring-2 focus:ring-spendwise-primary/20 outline-none transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-spendwise-text-muted">Phone Number</label>
            <div className="relative group">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spendwise-primary" />
              <input type="text" defaultValue="+91 98765 43210"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-12 py-4 text-sm font-bold text-spendwise-text-primary focus:bg-white focus:ring-2 focus:ring-spendwise-primary/20 outline-none transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-spendwise-text-muted">Job Title</label>
            <div className="relative group">
              <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spendwise-primary" />
              <input type="text" defaultValue="Finance Operations Manager"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-12 py-4 text-sm font-bold text-spendwise-text-primary focus:bg-white focus:ring-2 focus:ring-spendwise-primary/20 outline-none transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-spendwise-text-muted">Department</label>
            <div className="relative group">
              <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spendwise-primary" />
              <input type="text" defaultValue="Finance & Accounts"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-12 py-4 text-sm font-bold text-spendwise-text-primary focus:bg-white focus:ring-2 focus:ring-spendwise-primary/20 outline-none transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Login Activity */}
      <div className="enterprise-card !p-0 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-slate-50 bg-slate-50/20">
          <h3 className="text-lg font-bold text-spendwise-text-primary font-outfit">Recent Login Activity</h3>
          <button className="text-xs font-bold text-spendwise-text-muted hover:text-spendwise-primary transition-colors flex items-center gap-1">
            View All Logs <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest font-bold text-spendwise-text-muted border-b border-slate-50">
                <th className="px-8 py-4">Device</th>
                <th className="px-8 py-4">Location</th>
                <th className="px-8 py-4">IP Address</th>
                <th className="px-8 py-4">Time</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {loginActivity.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-slate-100 rounded-xl text-spendwise-text-secondary border border-slate-200 shadow-sm">
                        <log.icon size={18} />
                      </div>
                      <span className="font-bold text-spendwise-text-primary">{log.device}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-spendwise-text-secondary font-medium">{log.location}</td>
                  <td className="px-8 py-5 text-spendwise-text-secondary font-mono">{log.ip}</td>
                  <td className="px-8 py-5 text-spendwise-text-muted font-medium">{log.time}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${log.status === 'Current' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sign Out */}
      <div className="flex justify-center pt-4">
        <button className="flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] hover:text-red-600 transition-all hover:gap-3">
          <LogOut size={16} /> Sign out from all devices
        </button>
      </div>
    </div>
  );
};

export default Settings;
