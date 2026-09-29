import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { DataTable } from '../components/DataTable';
import { RiskBadge } from '../components/RiskBadge';
import { RiskDetailPanel } from '../components/RiskDetailPanel';
import { api } from '../services/api';
import { EnrichedProductRisk } from '../types';
import { AlertTriangle, Filter } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const InventoryRisk: React.FC = () => {
  const [productsAtRisk, setProductsAtRisk] = useState<EnrichedProductRisk[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<EnrichedProductRisk | null>(null);

  useEffect(() => {
    api.getStockoutRisk().then(setProductsAtRisk);
  }, []);

  const riskColumns = [
    { key: 'storeId', header: 'Store' },
    { key: 'name', header: 'Product' },
    { key: 'category', header: 'Category' },
    { key: 'currentStock', header: 'Current Stock' },
    { key: 'reorderLevel', header: 'Reorder Level' },
    { key: 'stockoutProbability', header: 'Stock-out Prob.', render: (p: EnrichedProductRisk) => `${(p.stockoutProbability * 100).toFixed(0)}%` },
    { key: 'riskLevel', header: 'Risk Score', render: (p: EnrichedProductRisk) => <RiskBadge level={p.riskLevel} /> },
  ];

  const riskDistributionData = [
    { name: 'S01', High: 8, Medium: 12, Low: 45 },
    { name: 'S02', High: 3, Medium: 15, Low: 38 },
    { name: 'S03', High: 11, Medium: 8, Low: 52 },
    { name: 'S04', High: 5, Medium: 10, Low: 41 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center bg-glass p-4 rounded-xl border border-glass-border backdrop-blur-md">
        <Filter className="text-brand-red w-5 h-5 mr-2" />
        <select className="bg-glass border border-glass-border text-content text-sm rounded-lg px-4 py-2 outline-none focus:border-brand-red">
          <option>All Stores</option>
        </select>
        <select className="bg-glass border border-glass-border text-content text-sm rounded-lg px-4 py-2 outline-none focus:border-brand-red">
          <option>Only High Risk</option>
          <option>Medium & High Risk</option>
          <option>All Risks</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="bg-brand-red/5 border-brand-red/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-brand-red/20 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-brand-red" />
              </div>
              <div>
                <p className="text-content-muted font-medium">Critical Stock-outs</p>
                <h3 className="text-3xl font-bold text-content mt-1">27</h3>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="Risk Distribution by Store">
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskDistributionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-glass-border)" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} axisLine={false} />
                  <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: 'var(--theme-glass-modal)', backdropFilter: 'blur(16px)', border: '1px solid var(--theme-glass-border)', borderRadius: '12px', color: 'var(--theme-text)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="High" stackId="a" fill="#ef4444" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="Medium" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="Low" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-2">
          <GlassCard title="Inventory Coverage Heatmap">
            <div className="overflow-x-auto mt-4">
              <div className="min-w-[600px] border border-glass-border rounded-xl overflow-hidden">
                <div className="grid grid-cols-5 bg-glass border-b border-glass-border text-content-muted font-medium p-4 text-sm text-center">
                  <div className="text-left">Store</div>
                  <div>Dairy</div>
                  <div>Beverages</div>
                  <div>Snacks</div>
                  <div>Personal Care</div>
                </div>
                {[
                  { store: 'S01', v1: 'bg-brand-red/80', v2: 'bg-brand-emerald/40', v3: 'bg-brand-emerald/80', v4: 'bg-brand-amber/60' },
                  { store: 'S02', v1: 'bg-brand-emerald/90', v2: 'bg-brand-emerald/70', v3: 'bg-brand-amber/80', v4: 'bg-brand-red/60' },
                  { store: 'S03', v1: 'bg-brand-amber/50', v2: 'bg-brand-red/90', v3: 'bg-brand-emerald/50', v4: 'bg-brand-emerald/90' },
                  { store: 'S04', v1: 'bg-brand-emerald/60', v2: 'bg-brand-emerald/80', v3: 'bg-brand-emerald/70', v4: 'bg-brand-amber/50' },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-5 border-b border-glass-border p-4 items-center text-sm">
                    <div className="text-content-muted font-medium">{row.store}</div>
                    <div className="px-2 py-1"><div className={`h-8 rounded-md w-full ${row.v1} shadow-lg shadow-black/20 cursor-pointer hover:opacity-80 transition-opacity`}></div></div>
                    <div className="px-2 py-1"><div className={`h-8 rounded-md w-full ${row.v2} shadow-lg shadow-black/20 cursor-pointer hover:opacity-80 transition-opacity`}></div></div>
                    <div className="px-2 py-1"><div className={`h-8 rounded-md w-full ${row.v3} shadow-lg shadow-black/20 cursor-pointer hover:opacity-80 transition-opacity`}></div></div>
                    <div className="px-2 py-1"><div className={`h-8 rounded-md w-full ${row.v4} shadow-lg shadow-black/20 cursor-pointer hover:opacity-80 transition-opacity`}></div></div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <GlassCard title="Products at Risk">
        <DataTable 
          data={productsAtRisk} 
          columns={riskColumns} 
          onRowClick={(product) => setSelectedProduct(product)}
        />
      </GlassCard>

      <RiskDetailPanel 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};
