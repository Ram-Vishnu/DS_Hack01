import React from 'react';
import { X, Package, MapPin, Target, AlertTriangle } from 'lucide-react';
import { EnrichedProductRisk } from '../types';
import { RiskBadge } from './RiskBadge';
import { api } from '../services/api';

interface RiskDetailPanelProps {
  product: EnrichedProductRisk | null;
  onClose: () => void;
}

export const RiskDetailPanel: React.FC<RiskDetailPanelProps> = ({ product, onClose }) => {
  const [factors, setFactors] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (product) {
      api.getExplainability(product.id, product.storeId).then(setFactors);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-md h-full glass-modal flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <div>
            <h2 className="text-xl font-bold text-content">{product.name}</h2>
            <div className="flex items-center gap-2 text-sm text-content-muted mt-1">
              <span className="font-mono">{product.id}</span>
              <span>•</span>
              <span>{product.category}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-glass-hover text-content-muted hover:text-content transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-4 rounded-xl">
              <div className="flex items-center gap-2 text-content-muted mb-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Store</span>
              </div>
              <p className="font-semibold text-content">{product.storeName}</p>
            </div>
            <div className="glass-panel p-4 rounded-xl">
              <div className="flex items-center gap-2 text-content-muted mb-2 text-sm">
                <Target className="w-4 h-4" />
                <span>Risk Level</span>
              </div>
              <RiskBadge level={product.riskLevel} />
            </div>
          </div>

          {/* Inventory Status */}
          <div>
            <h3 className="text-sm font-semibold text-content-muted uppercase tracking-wider mb-4">Inventory Status</h3>
            <div className="glass-panel p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-content-muted">Current Stock</span>
                <span className="text-xl font-bold text-content">{product.currentStock}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-content-muted">Incoming Stock</span>
                <span className="text-xl font-bold text-content">{product.incomingStock}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-content-muted">7-Day Forecast</span>
                <span className="text-xl font-bold text-brand-cyan">{product.forecast7Day}</span>
              </div>
              <div className="w-full h-px bg-glass-hover my-2" />
              <div className="flex justify-between items-center">
                <span className="text-content-muted">Stock-out Probability</span>
                <span className="text-xl font-bold text-brand-red">{(product.stockoutProbability * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Explainability (Mock) */}
          <div>
            <h3 className="text-sm font-semibold text-content-muted uppercase tracking-wider mb-4">Why is this product at risk?</h3>
            <div className="glass-panel p-5 space-y-4">
              {factors.length > 0 ? factors.map((factor, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-content-muted">{factor.factor}</span>
                    <span className={factor.value > 0 ? 'text-brand-cyan' : 'text-content-muted'}>+{factor.value}%</span>
                  </div>
                  <div className="w-full bg-glass rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${factor.impact === 'High' ? 'bg-brand-red' : factor.impact === 'Medium' ? 'bg-brand-amber' : 'bg-brand-cyan'}`} 
                      style={{ width: `${Math.min(factor.value * 2, 100)}%` }}
                    />
                  </div>
                </div>
              )) : (
                <p className="text-sm text-content-muted">No specific contributing factors identified.</p>
              )}
            </div>
          </div>

          {/* Replenishment Calculation */}
          <div>
            <h3 className="text-sm font-semibold text-content-muted uppercase tracking-wider mb-4">Replenishment Action</h3>
            <div className="glass-panel p-5 border-brand-cyan/20">
              <div className="bg-brand-cyan/10 p-4 rounded-lg mb-4 text-sm text-brand-cyan font-medium">
                Recommendation: Raise replenishment order by {product.recommendedOrder} units today.
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-content-muted">
                  <span>Lead Time</span>
                  <span className="text-content">{product.leadTime} Days</span>
                </div>
                <div className="flex justify-between text-content-muted">
                  <span>Reorder Level</span>
                  <span className="text-content">{product.reorderLevel} units</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-brand-cyan hover:bg-brand-cyan/90 text-black font-bold py-2 px-4 rounded-xl transition-colors">
                  Create Reorder
                </button>
                <button className="px-4 py-2 rounded-xl bg-glass hover:bg-glass-hover text-content font-medium border border-glass-border transition-colors">
                  Watchlist
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
