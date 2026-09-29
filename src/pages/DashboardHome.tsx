import React, { useEffect, useState } from 'react';
import { IndianRupee, ShoppingBag, Package, AlertTriangle, Boxes } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { GlassCard } from '../components/GlassCard';
import { DataTable } from '../components/DataTable';
import { RiskBadge } from '../components/RiskBadge';
import { RiskDetailPanel } from '../components/RiskDetailPanel';
import { api } from '../services/api';
import { EnrichedProductRisk } from '../types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const DashboardHome: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [demandData, setDemandData] = useState<any[]>([]);
  const [productsAtRisk, setProductsAtRisk] = useState<EnrichedProductRisk[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<EnrichedProductRisk | null>(null);

  useEffect(() => {
    Promise.all([
      api.getDashboardSummary(),
      api.getDemandForecast(),
      api.getStockoutRisk()
    ]).then(([sum, demand, risk]) => {
      setSummary(sum);
      setDemandData(demand);
      setProductsAtRisk(risk.sort((a, b) => b.stockoutProbability - a.stockoutProbability).slice(0, 5));
    });
  }, []);

  if (!summary) {
    return <div className="h-full flex items-center justify-center text-content-muted">Loading dashboard...</div>;
  }

  const riskColumns = [
    { key: 'storeId', header: 'Store' },
    { key: 'name', header: 'Product' },
    { key: 'category', header: 'Category' },
    { key: 'currentStock', header: 'Current Stock' },
    { key: 'forecast7Day', header: '7-Day Forecast', render: (p: EnrichedProductRisk) => <span className="text-brand-cyan">{p.forecast7Day}</span> },
    { key: 'stockoutProbability', header: 'Probability', render: (p: EnrichedProductRisk) => `${(p.stockoutProbability * 100).toFixed(0)}%` },
    { key: 'riskLevel', header: 'Risk', render: (p: EnrichedProductRisk) => <RiskBadge level={p.riskLevel} /> },
    { key: 'recommendedOrder', header: 'Rec. Order' },
    { 
      key: 'action', 
      header: 'Action', 
      render: (p: EnrichedProductRisk) => (
        <span className={p.action === 'Reorder' ? 'text-brand-cyan' : p.action === 'Review' ? 'text-brand-amber' : 'text-content-muted'}>
          {p.action}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="flex gap-4 mb-8">
        <select className="bg-glass border border-glass-border text-content text-sm rounded-xl px-4 py-2 outline-none focus:border-brand-cyan focus:bg-glass-hover transition-colors">
          <option value="all">All Stores</option>
          <option value="S01">Chennai Central</option>
          <option value="S02">T-Nagar Express</option>
        </select>
        <select className="bg-glass border border-glass-border text-content text-sm rounded-xl px-4 py-2 outline-none focus:border-brand-cyan focus:bg-glass-hover transition-colors">
          <option value="all">All Categories</option>
          <option value="Dairy">Dairy</option>
          <option value="Beverages">Beverages</option>
        </select>
        <select className="bg-glass border border-glass-border text-content text-sm rounded-xl px-4 py-2 outline-none focus:border-brand-cyan focus:bg-glass-hover transition-colors">
          <option value="all">All Risk Levels</option>
          <option value="HIGH">HIGH Risk</option>
          <option value="MEDIUM">MEDIUM Risk</option>
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard 
          title="Total Revenue" 
          value={`₹${(summary.revenue.value / 100000).toFixed(2)}L`} 
          trend={summary.revenue.trend} 
          icon={IndianRupee} 
        />
        <KPICard 
          title="Units Sold" 
          value={summary.unitsSold.value.toLocaleString()} 
          trend={summary.unitsSold.trend} 
          icon={ShoppingBag} 
        />
        <KPICard 
          title="Inventory Value" 
          value={`₹${(summary.inventoryValue.value / 100000).toFixed(2)}L`} 
          trend={summary.inventoryValue.trend} 
          icon={Boxes} 
        />
        <KPICard 
          title="Stock-out Rate" 
          value={`${summary.stockOutRate.value}%`} 
          trend={summary.stockOutRate.trend} 
          icon={AlertTriangle} 
          isNegativeGood={true}
        />
        <KPICard 
          title="Products At Risk" 
          value={summary.productsAtRisk.value} 
          trend={12.4} 
          icon={Package} 
          subtitle={`${summary.productsAtRisk.highRisk} HIGH`}
          isNegativeGood={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Demand Intelligence Chart */}
        <GlassCard className="lg:col-span-2 flex flex-col" title="Demand Intelligence">
          <div className="h-[300px] w-full">
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
          <div className="mt-4 flex gap-6 text-sm">
            <div>
              <span className="text-content-muted block mb-1">Forecast Accuracy</span>
              <span className="text-xl font-bold text-content">92.4%</span>
            </div>
            <div>
              <span className="text-content-muted block mb-1">MAE</span>
              <span className="text-xl font-bold text-content">18.7</span>
            </div>
            <div>
              <span className="text-content-muted block mb-1">RMSE</span>
              <span className="text-xl font-bold text-content">27.3</span>
            </div>
          </div>
        </GlassCard>

        {/* Risk Overview */}
        <GlassCard title="Inventory Risk Overview">
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-6 relative">
              {/* Fake Donut Chart via CSS gradients */}
              <div className="w-40 h-40 rounded-full border-[16px] border-brand-red/80 relative flex items-center justify-center" 
                   style={{ borderRightColor: '#f59e0b', borderBottomColor: '#10b981', borderLeftColor: '#ef4444' }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-content">100</div>
                  <div className="text-xs text-content-muted">Total Risks</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-brand-red/10 border border-brand-red/20">
                <span className="text-brand-red font-semibold">HIGH Risk</span>
                <span className="text-content font-bold">8</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-brand-amber/10 border border-brand-amber/20">
                <span className="text-brand-amber font-semibold">MEDIUM Risk</span>
                <span className="text-content font-bold">19</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-brand-emerald/10 border border-brand-emerald/20">
                <span className="text-brand-emerald font-semibold">LOW Risk</span>
                <span className="text-content font-bold">73</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-content">Products Requiring Attention</h3>
        <DataTable 
          data={productsAtRisk} 
          columns={riskColumns} 
          onRowClick={(product) => setSelectedProduct(product)}
        />
      </div>

      {/* Detail Panel */}
      <RiskDetailPanel 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};
