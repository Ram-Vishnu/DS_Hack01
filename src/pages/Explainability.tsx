import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Search } from 'lucide-react';

export const Explainability: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState('P001');
  const [selectedStore, setSelectedStore] = useState('S01');

  // Mock Global Feature Importance
  const globalFeatures = [
    { name: 'Recent Demand', value: 0.28 },
    { name: 'Rolling 7-Day Average', value: 0.22 },
    { name: 'Promotion Flag', value: 0.15 },
    { name: 'Weekend Effect', value: 0.12 },
    { name: 'Current Inventory', value: 0.08 },
    { name: 'Lead Time', value: 0.06 },
    { name: 'Store Traffic', value: 0.05 },
    { name: 'Festival Effect', value: 0.04 },
  ];

  // Mock Local Explainability (SHAP values concept)
  const localFeatures = [
    { name: 'Current inventory (Low)', value: 0.35, impact: 'High' },
    { name: 'Recent demand growth (+20%)', value: 0.25, impact: 'High' },
    { name: 'Promotion (Active)', value: 0.15, impact: 'Medium' },
    { name: 'Weekend (True)', value: 0.10, impact: 'Medium' },
    { name: 'Weather (Clear)', value: -0.05, impact: 'Low' },
  ];

  return (
    <div className="space-y-6">
      <GlassCard title="Global Feature Importance">
        <p className="text-sm text-content-muted mb-6">Features driving the stock-out classification model overall (Mock Data).</p>
        <div className="space-y-4 max-w-3xl">
          {globalFeatures.map((f, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-48 text-sm text-content-muted text-right shrink-0">{f.name}</div>
              <div className="flex-1">
                <div className="h-6 bg-glass rounded-r-md flex items-center">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-cyan/50 to-brand-cyan rounded-r-md transition-all duration-1000"
                    style={{ width: `${f.value * 300}%` }}
                  />
                  <span className="ml-3 text-xs text-brand-cyan font-mono">{f.value.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard title="Local Explainability (Single Prediction)">
        <p className="text-sm text-content-muted mb-6">Understand why a specific product is predicted to stock-out.</p>
        
        <div className="flex gap-4 mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-content-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select 
              value={selectedProduct}
              onChange={e => setSelectedProduct(e.target.value)}
              className="pl-9 pr-4 py-2 bg-glass border border-glass-border rounded-xl text-content text-sm outline-none focus:border-brand-cyan w-64"
            >
              <option value="P001">Aavin Milk 500ml</option>
              <option value="P002">Cola 750ml</option>
            </select>
          </div>
          <select 
            value={selectedStore}
            onChange={e => setSelectedStore(e.target.value)}
            className="px-4 py-2 bg-glass border border-glass-border rounded-xl text-content text-sm outline-none focus:border-brand-cyan w-48"
          >
            <option value="S01">Chennai Central (S01)</option>
            <option value="S03">OMR Tech Park (S03)</option>
          </select>
          <button className="px-6 py-2 bg-brand-cyan/20 text-brand-cyan font-medium rounded-xl border border-brand-cyan/30 hover:bg-brand-cyan/30 transition-colors">
            Analyze
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-glass p-6 rounded-xl border border-glass-border">
            <h4 className="font-medium text-content mb-4">Prediction Summary</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-content-muted">Model Output (Probability)</span>
                <span className="text-brand-red font-bold">89.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-muted">Base Value (Average)</span>
                <span className="text-content-muted">12.1%</span>
              </div>
              <div className="flex justify-between border-t border-glass-border pt-4">
                <span className="text-content-muted">Final Decision</span>
                <span className="text-brand-red font-bold">HIGH RISK</span>
              </div>
            </div>
          </div>

          <div className="bg-glass p-6 rounded-xl border border-glass-border">
            <h4 className="font-medium text-content mb-4">Contributing Factors</h4>
            <div className="space-y-4">
              {localFeatures.map((f, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-content-muted">{f.name}</span>
                    <span className={f.value > 0 ? 'text-brand-red' : 'text-brand-emerald'}>
                      {f.value > 0 ? '+' : ''}{f.value.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-glass-hover rounded-full h-1.5 flex">
                    {f.value > 0 ? (
                      <div className="flex-1 flex justify-start">
                        <div className="h-1.5 bg-brand-red rounded-full" style={{ width: `${f.value * 200}%` }} />
                      </div>
                    ) : (
                      <div className="flex-1 flex justify-start">
                        <div className="h-1.5 bg-brand-emerald rounded-full" style={{ width: `${Math.abs(f.value) * 200}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
