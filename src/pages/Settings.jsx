import React from 'react';
import {
  Mail, Phone, Briefcase, Building2, Laptop,
  Smartphone, LogOut, MapPin, Calendar, RefreshCcw, Edit2, ChevronRight,
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const Settings = () => {
  const loginActivity = [
    { id: 1, device: 'MacBook Pro 16"', location: 'Bengaluru, KA', ip: '10.0.0.12', time: 'Today, 09:42 AM', status: 'Current', icon: Laptop },
    { id: 2, device: 'OnePlus 12 Pro', location: 'Bengaluru, KA', ip: '10.0.0.45', time: 'Yesterday, 11:15 PM', status: 'Active', icon: Smartphone },
  ];

  return (
    <div className="section-spacing">
      {/* Profile Header Card */}
      <Card className="p-8 shadow-2xl shadow-slate-100">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Profile Image */}
          <div className="relative group">
            <div className="w-36 h-36 rounded-[32px] overflow-hidden border-4 border-slate-50 shadow-xl transition-all group-hover:scale-105 duration-500 group-hover:rotate-3">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Rajesh Kumar"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2.5 bg-spendwise-primary text-white rounded-2xl shadow-xl border-4 border-white hover:bg-indigo-700 transition-all active:scale-90">
              <Edit2 size={16} />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left space-y-5">
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h2 className="text-4xl font-black text-spendwise-text-primary font-outfit tracking-tight">Rajesh Kumar</h2>
                <Badge status="Approved" className="w-fit self-center md:self-auto py-1 px-3">
                  Premium Admin
                </Badge>
              </div>
              <p className="text-spendwise-text-secondary font-bold text-lg">Finance Operations Manager at Infosys Ltd.</p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-8 text-[10px] text-spendwise-text-muted font-black uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-spendwise-primary" />
                <span>Bengaluru, KA</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-spendwise-primary" />
                <span>Joined Apr 2022</span>
              </div>
            </div>

            {/* PAN & GSTIN */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <div className="px-4 py-2 bg-slate-50 border-2 border-slate-100 rounded-2xl group hover:border-spendwise-primary/20 transition-all cursor-default">
                <span className="text-[9px] font-black uppercase tracking-widest text-spendwise-text-muted mr-2">PAN</span>
                <span className="text-xs font-black text-spendwise-text-primary font-mono tracking-wider group-hover:text-spendwise-primary transition-colors">ABCDE1234F</span>
              </div>
              <div className="px-4 py-2 bg-slate-50 border-2 border-slate-100 rounded-2xl group hover:border-spendwise-primary/20 transition-all cursor-default">
                <span className="text-[9px] font-black uppercase tracking-widest text-spendwise-text-muted mr-2">GSTIN</span>
                <span className="text-xs font-black text-spendwise-text-primary font-mono tracking-wider group-hover:text-spendwise-primary transition-colors">29ABCDE1234F1Z5</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 md:self-center">
            <Button variant="secondary" className="px-8 py-3.5 rounded-[20px]">Log Out</Button>
            <Button className="px-8 py-3.5 rounded-[20px]">Save Changes</Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Primary Information */}
        <Card title="Primary Information" className="lg:col-span-2 shadow-xl shadow-slate-100" 
          headerAction={
            <Button variant="outline" size="sm" icon={RefreshCcw}>Verify Contact</Button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-spendwise-primary" />
                <input type="email" defaultValue="r.kumar@infosys.com"
                  className="w-full bg-slate-50/50 border-2 border-transparent rounded-[20px] px-14 py-4.5 text-sm font-black text-spendwise-text-primary focus:bg-white focus:border-spendwise-primary/20 focus:ring-4 focus:ring-spendwise-primary/5 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted">Phone Number</label>
              <div className="relative group">
                <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-spendwise-primary" />
                <input type="text" defaultValue="+91 98765 43210"
                  className="w-full bg-slate-50/50 border-2 border-transparent rounded-[20px] px-14 py-4.5 text-sm font-black text-spendwise-text-primary focus:bg-white focus:border-spendwise-primary/20 focus:ring-4 focus:ring-spendwise-primary/5 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted">Job Title</label>
              <div className="relative group">
                <Briefcase size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-spendwise-primary" />
                <input type="text" defaultValue="Finance Operations Manager"
                  className="w-full bg-slate-50/50 border-2 border-transparent rounded-[20px] px-14 py-4.5 text-sm font-black text-spendwise-text-primary focus:bg-white focus:border-spendwise-primary/20 focus:ring-4 focus:ring-spendwise-primary/5 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted">Department</label>
              <div className="relative group">
                <Building2 size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-spendwise-primary" />
                <input type="text" defaultValue="Finance & Accounts"
                  className="w-full bg-slate-50/50 border-2 border-transparent rounded-[20px] px-14 py-4.5 text-sm font-black text-spendwise-text-primary focus:bg-white focus:border-spendwise-primary/20 focus:ring-4 focus:ring-spendwise-primary/5 outline-none transition-all" />
              </div>
            </div>
          </div>
        </Card>

        {/* Security Summary */}
        <Card title="Security Status" className="shadow-xl shadow-slate-100">
          <div className="space-y-6">
            <div className="flex items-center gap-5 p-4 bg-green-50/50 border-2 border-green-100 rounded-[24px]">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-500 shadow-sm border border-green-50">
                <Badge status="Approved" className="p-0 border-0 bg-transparent" />
                <div className="p-2.5 bg-green-500 rounded-xl text-white">
                  <RefreshCcw size={20} />
                </div>
              </div>
              <div>
                <p className="text-xs font-black text-spendwise-text-primary">Two-Factor Auth</p>
                <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1">Enabled & Secure</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-spendwise-text-muted">Account Security</p>
              <button className="w-full flex items-center justify-between p-4.5 bg-slate-50 border-2 border-transparent hover:border-spendwise-primary/10 hover:bg-white rounded-[20px] group transition-all">
                <span className="text-sm font-bold text-spendwise-text-primary group-hover:text-spendwise-primary">Change Password</span>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-spendwise-primary group-hover:translate-x-1 transition-all" />
              </button>
              <button className="w-full flex items-center justify-between p-4.5 bg-slate-50 border-2 border-transparent hover:border-spendwise-primary/10 hover:bg-white rounded-[20px] group transition-all">
                <span className="text-sm font-bold text-spendwise-text-primary group-hover:text-spendwise-primary">Manage API Keys</span>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-spendwise-primary group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Login Activity */}
      <Card title="Recent Login Activity" noPadding className="shadow-xl shadow-slate-100">
        <DataTable
          headers={[
            { label: 'Device' },
            { label: 'Location' },
            { label: 'IP Address' },
            { label: 'Time' },
            { label: 'Status', align: 'right' },
          ]}
          data={loginActivity}
          renderRow={(log) => (
            <>
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 border-2 border-slate-50 rounded-2xl flex items-center justify-center text-spendwise-text-primary shadow-sm group-hover:scale-110 transition-transform">
                    <log.icon size={18} />
                  </div>
                  <span className="text-sm font-black text-spendwise-text-primary group-hover:text-spendwise-primary transition-colors">{log.device}</span>
                </div>
              </td>
              <td className="px-8 py-5 text-xs text-spendwise-text-secondary font-bold uppercase tracking-wide">{log.location}</td>
              <td className="px-8 py-5 text-xs text-spendwise-text-secondary font-mono font-bold">{log.ip}</td>
              <td className="px-8 py-5 text-xs text-spendwise-text-muted font-bold">{log.time}</td>
              <td className="px-8 py-5 text-right">
                <Badge status={log.status === 'Current' ? 'Approved' : 'Pending'}>
                  {log.status}
                </Badge>
              </td>
            </>
          )}
        />
      </Card>

      {/* Sign Out */}
      <div className="flex justify-center pt-6">
        <button className="group flex items-center gap-3 text-red-500 font-black text-[10px] uppercase tracking-[0.3em] hover:text-red-600 transition-all active:scale-95">
          <LogOut size={18} className="group-hover:rotate-12 transition-transform" /> 
          <span>Sign out from all devices</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
