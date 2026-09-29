import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { Store } from '../types';
import { mockStores } from '../data/mockData';
import { MapPin, Users, IndianRupee, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Stores: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStores.map((store: Store) => (
          <GlassCard key={store.id} className="hover:border-glass-border transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-content">{store.name}</h3>
                <div className="flex items-center gap-1 text-xs text-content-muted mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{store.city} • {store.type}</span>
                </div>
              </div>
              <span className="text-xs font-mono text-content-muted">{store.id}</span>
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-content-muted">
                  <IndianRupee className="w-4 h-4" /> Revenue
                </div>
                <span className="font-semibold text-content">₹{(store.revenue / 100000).toFixed(2)}L</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-content-muted">
                  <Users className="w-4 h-4" /> Avg Customers
                </div>
                <span className="font-semibold text-content">{store.averageDailyCustomers}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-content-muted">
                  <AlertTriangle className="w-4 h-4" /> Stock-out Rate
                </div>
                <span className={`font-semibold ${store.stockOutRate > 4 ? 'text-brand-red' : 'text-brand-emerald'}`}>
                  {store.stockOutRate}%
                </span>
              </div>
            </div>
            
            <button className="w-full mt-6 py-2 bg-glass hover:bg-glass-hover rounded-lg text-sm font-medium text-content transition-colors border border-glass-border">
              View Store Details
            </button>
          </GlassCard>
        ))}
      </div>

      <GlassCard title="Store Comparison (Revenue vs Stock-out Rate)">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockStores} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-glass-border)" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} axisLine={false} />
              <YAxis yAxisId="left" orientation="left" stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#ef4444" tick={{fill: '#ef4444', fontSize: 12}} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--theme-glass-modal)', backdropFilter: 'blur(16px)', border: '1px solid var(--theme-glass-border)', borderRadius: '12px', color: 'var(--theme-text)' }}
              />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="stockOutRate" name="Stock-out Rate (%)" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
