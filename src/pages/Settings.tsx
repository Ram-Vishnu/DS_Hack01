import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { User, Bell, Monitor, Database, ShieldAlert } from 'lucide-react';

export const Settings: React.FC = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="max-w-4xl space-y-6">
      <h2 className="text-xl font-bold text-content mb-6">Dashboard Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 font-medium flex items-center gap-3">
            <User className="w-4 h-4" /> Profile
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-content-muted hover:bg-glass hover:text-content transition-colors flex items-center gap-3">
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-content-muted hover:bg-glass hover:text-content transition-colors flex items-center gap-3">
            <Monitor className="w-4 h-4" /> Display
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-content-muted hover:bg-glass hover:text-content transition-colors flex items-center gap-3">
            <Database className="w-4 h-4" /> Data Sources
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <GlassCard title="Profile Information">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-content-muted mb-1">Full Name</label>
                  <input type="text" value="Ivan Manager" disabled className="w-full bg-glass border border-glass-border rounded-lg px-4 py-2 text-content outline-none opacity-70" />
                </div>
                <div>
                  <label className="block text-sm text-content-muted mb-1">Role</label>
                  <input type="text" value="Inventory Manager" disabled className="w-full bg-glass border border-glass-border rounded-lg px-4 py-2 text-content outline-none opacity-70" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-content-muted mb-1">Email Address</label>
                <input type="email" value="ivan.m@novamart.com" disabled className="w-full bg-glass border border-glass-border rounded-lg px-4 py-2 text-content outline-none opacity-70" />
              </div>
            </div>
          </GlassCard>

          <GlassCard title="Alert Preferences">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-glass rounded-xl border border-glass-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-cyan/20 rounded-lg"><Bell className="w-4 h-4 text-brand-cyan" /></div>
                  <div>
                    <p className="font-medium text-content">Email Alerts</p>
                    <p className="text-xs text-content-muted">Receive daily risk summaries</p>
                  </div>
                </div>
                <button 
                  className={`w-12 h-6 rounded-full transition-colors relative ${emailAlerts ? 'bg-brand-cyan' : 'bg-gray-600'}`}
                  onClick={() => setEmailAlerts(!emailAlerts)}
                >
                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform ${emailAlerts ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-glass rounded-xl border border-glass-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-purple/20 rounded-lg"><ShieldAlert className="w-4 h-4 text-brand-purple" /></div>
                  <div>
                    <p className="font-medium text-content">Critical SMS Alerts</p>
                    <p className="text-xs text-content-muted">Immediate alerts for HIGH risk items</p>
                  </div>
                </div>
                <button 
                  className={`w-12 h-6 rounded-full transition-colors relative ${smsAlerts ? 'bg-brand-cyan' : 'bg-gray-600'}`}
                  onClick={() => setSmsAlerts(!smsAlerts)}
                >
                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform ${smsAlerts ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="Dashboard Behavior">
            <div className="flex items-center justify-between p-4 bg-glass rounded-xl border border-glass-border">
              <div>
                <p className="font-medium text-content">Auto-Refresh Data</p>
                <p className="text-xs text-content-muted">Update metrics every 15 minutes</p>
              </div>
              <button 
                className={`w-12 h-6 rounded-full transition-colors relative ${autoRefresh ? 'bg-brand-cyan' : 'bg-gray-600'}`}
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-transform ${autoRefresh ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
