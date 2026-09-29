import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { api } from '../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { Filter } from 'lucide-react';

export const DemandIntelligence: React.FC = () => {
  const [demandData, setDemandData] = useState<any[]>([]);

  useEffect(() => {
    api.getDemandForecast().then(setDemandData);
  }, []);

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="flex gap-4 items-center bg-glass p-4 rounded-xl border border-glass-border backdrop-blur-md">
        <Filter className="text-brand-cyan w-5 h-5 mr-2" />
        <select className="bg-glass border border-glass-border text-content text-sm rounded-lg px-4 py-2 outline-none focus:border-brand-cyan">
          <option>All Stores</option>
          <option>Chennai Central</option>
          <option>OMR Tech Park</option>
        </select>
        <select className="bg-glass border border-glass-border text-content text-sm rounded-lg px-4 py-2 outline-none focus:border-brand-cyan">
          <option>All Categories</option>
          <option>Dairy</option>
          <option>Beverages</option>
        </select>
        <select className="bg-glass border border-glass-border text-content text-sm rounded-lg px-4 py-2 outline-none focus:border-brand-cyan">
          <option>Next 7 Days</option>
          <option>Next 14 Days</option>
          <option>Next 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard title="Overall Demand Forecast" className="lg:col-span-2">
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demandData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-glass-border)" vertical={false} />
                <XAxis dataKey="date" stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} tickMargin={10} axisLine={false} />
                <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} tickMargin={10} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--theme-glass-modal)', backdropFilter: 'blur(16px)', border: '1px solid var(--theme-glass-border)', borderRadius: '12px', color: 'var(--theme-text)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Area type="monotone" dataKey="actual" name="Actual Demand" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="forecast" name="Forecast Demand" stroke="#06b6d4" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorForecast)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard title="Demand by Category">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { category: 'Dairy', value: 4500 },
                { category: 'Beverages', value: 3200 },
                { category: 'Snacks', value: 2800 },
                { category: 'Personal Care', value: 1500 },
                { category: 'Grocery', value: 5200 },
              ]} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-glass-border)" horizontal={false} />
                <XAxis type="number" stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} axisLine={false} />
                <YAxis dataKey="category" type="category" stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: 'var(--theme-glass-modal)', backdropFilter: 'blur(16px)', border: '1px solid var(--theme-glass-border)', borderRadius: '12px', color: 'var(--theme-text)' }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard title="High Volatility Products">
          <div className="space-y-4">
            {[
              { name: 'Aavin Milk 500ml', volatility: 'High', trend: '+31%' },
              { name: 'Cola 750ml', volatility: 'High', trend: '+24%' },
              { name: 'Maggi Noodles', volatility: 'Medium', trend: '+12%' },
              { name: 'Tata Salt 1kg', volatility: 'Low', trend: '-2%' },
            ].map((p, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-glass rounded-xl border border-glass-border hover:bg-glass-hover transition-colors">
                <div>
                  <p className="font-semibold text-content">{p.name}</p>
                  <p className={`text-xs mt-1 ${p.volatility === 'High' ? 'text-brand-red' : p.volatility === 'Medium' ? 'text-brand-amber' : 'text-brand-emerald'}`}>
                    {p.volatility} Volatility
                  </p>
                </div>
                <div className="text-brand-cyan font-bold bg-brand-cyan/10 px-3 py-1 rounded-lg">
                  {p.trend}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
