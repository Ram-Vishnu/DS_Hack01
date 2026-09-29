import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { api } from '../services/api';
import { Recommendation, EnrichedProductRisk } from '../types';
import { Check, X, ChevronRight, AlertTriangle } from 'lucide-react';

export const ManagerActionCentre: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'HIGH' | 'MEDIUM' | 'WATCHLIST'>('HIGH');
  const [recommendations, setRecommendations] = useState<Record<string, Recommendation>>({});
  const [products, setProducts] = useState<EnrichedProductRisk[]>([]);

  useEffect(() => {
    Promise.all([
      api.getRecommendations(),
      api.getStockoutRisk()
    ]).then(([recs, prods]) => {
      setRecommendations(recs);
      setProducts(prods);
    });
  }, []);

  const getFilteredActions = () => {
    const combined = products.map(p => ({
      ...p,
      rec: recommendations[`${p.storeId}-${p.id}`]
    })).filter(p => p.rec);

    if (activeTab === 'HIGH') return combined.filter(p => p.riskLevel === 'HIGH');
    if (activeTab === 'MEDIUM') return combined.filter(p => p.riskLevel === 'MEDIUM');
    return combined.filter(p => p.riskLevel === 'LOW');
  };

  const actions = getFilteredActions();

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-glass-border mb-6">
        <button
          className={`px-6 py-3 font-medium text-sm outline-none transition-colors border-b-2 ${activeTab === 'HIGH' ? 'text-brand-red border-brand-red' : 'text-content-muted border-transparent hover:text-content'}`}
          onClick={() => setActiveTab('HIGH')}
        >
          HIGH PRIORITY
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm outline-none transition-colors border-b-2 ${activeTab === 'MEDIUM' ? 'text-brand-amber border-brand-amber' : 'text-content-muted border-transparent hover:text-content'}`}
          onClick={() => setActiveTab('MEDIUM')}
        >
          MEDIUM PRIORITY
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm outline-none transition-colors border-b-2 ${activeTab === 'WATCHLIST' ? 'text-brand-cyan border-brand-cyan' : 'text-content-muted border-transparent hover:text-content'}`}
          onClick={() => setActiveTab('WATCHLIST')}
        >
          WATCHLIST
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.length === 0 && (
          <div className="col-span-full py-12 text-center text-content-muted">
            No actions required in this category.
          </div>
        )}
        
        {actions.map((item, idx) => (
          <div key={idx} className={`glass-panel p-6 relative overflow-hidden group border-t-4 ${
            item.riskLevel === 'HIGH' ? 'border-t-brand-red' : item.riskLevel === 'MEDIUM' ? 'border-t-brand-amber' : 'border-t-brand-cyan'
          }`}>
            <div className="absolute top-4 right-4">
              {item.riskLevel === 'HIGH' && <AlertTriangle className="text-brand-red w-5 h-5 opacity-50" />}
            </div>
            
            <h3 className="text-xl font-bold text-content tracking-wide">{item.name}</h3>
            <p className="text-sm text-content-muted mt-1">{item.storeName} ({item.storeId})</p>
            
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-content-muted">Stock-out Prob:</span>
                <span className="text-content font-bold">{(item.stockoutProbability * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-content-muted">Recommended Order:</span>
                <span className="text-brand-cyan font-bold">{item.rec.recommendedOrder} units</span>
              </div>
              <div className="pt-2 border-t border-glass-border mt-2">
                <p className="text-xs text-content-muted italic">Reason:</p>
                <p className="text-sm text-content-muted mt-1">{item.rec.reason}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Approve
              </button>
              <button className="px-3 bg-glass hover:bg-glass-hover text-content-muted hover:text-content rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <button className="w-full mt-3 text-xs text-content-muted hover:text-content flex items-center justify-center gap-1 transition-colors">
              View Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
