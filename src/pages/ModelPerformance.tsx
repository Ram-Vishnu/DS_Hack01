import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { api } from '../services/api';
import { Activity, Beaker } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ModelPerformance: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    api.getModelMetrics().then(setMetrics);
  }, []);

  if (!metrics) return null;

  // Mock data for Actual vs Predicted
  const validationData = Array.from({ length: 20 }).map((_, i) => ({
    time: i,
    actual: Math.floor(Math.random() * 50) + 100,
    predicted: Math.floor(Math.random() * 50) + 95,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-brand-purple/10 border border-brand-purple/20 p-4 rounded-xl flex items-start gap-4 backdrop-blur-md">
        <Beaker className="w-6 h-6 text-brand-purple shrink-0 mt-1" />
        <div>
          <h3 className="text-brand-purple font-bold">Prototype / Mock Model Metrics</h3>
          <p className="text-sm text-content-muted mt-1">
            This dashboard displays mock metrics for the AI/ML pipeline. No actual model is connected yet.
            The architecture is designed to integrate with a Python backend once the models are trained.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard title={`Demand Forecasting (${metrics.demandForecasting.name})`}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {metrics.demandForecasting.metrics.map((m: any, idx: number) => (
              <div key={idx} className="bg-glass p-4 rounded-xl border border-glass-border">
                <p className="text-content-muted text-sm">{m.label}</p>
                <p className="text-2xl font-bold text-content mt-1">{m.value}</p>
              </div>
            ))}
          </div>
          
          <h4 className="text-sm font-medium text-content-muted mb-4">Validation Set: Actual vs Predicted</h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={validationData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-glass-border)" vertical={false} />
                <XAxis dataKey="time" stroke="#9ca3af" tick={false} axisLine={false} />
                <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--theme-glass-modal)', backdropFilter: 'blur(16px)', border: '1px solid var(--theme-glass-border)', borderRadius: '12px', color: 'var(--theme-text)' }}
                />
                <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="transparent" strokeWidth={2} />
                <Area type="monotone" dataKey="predicted" stroke="#06b6d4" strokeDasharray="5 5" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard title={`Stock-out Classification (${metrics.stockoutClassification.name})`}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {metrics.stockoutClassification.metrics.map((m: any, idx: number) => (
              <div key={idx} className="bg-glass p-4 rounded-xl border border-glass-border">
                <p className="text-content-muted text-sm">{m.label}</p>
                <p className="text-2xl font-bold text-content mt-1">{m.value}</p>
              </div>
            ))}
          </div>

          <h4 className="text-sm font-medium text-content-muted mb-4">Confusion Matrix (Validation)</h4>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="flex items-center justify-center"></div>
            <div className="text-content-muted">Predicted Risk</div>
            <div className="text-content-muted">Predicted Safe</div>
            
            <div className="text-content-muted flex items-center justify-end pr-2">Actual Risk</div>
            <div className="bg-brand-emerald/20 border border-brand-emerald/30 p-4 rounded-lg flex flex-col justify-center">
              <span className="font-bold text-lg text-content">425</span>
              <span className="text-xs text-content-muted">True Positives</span>
            </div>
            <div className="bg-brand-red/20 border border-brand-red/30 p-4 rounded-lg flex flex-col justify-center">
              <span className="font-bold text-lg text-content">65</span>
              <span className="text-xs text-content-muted">False Negatives</span>
            </div>

            <div className="text-content-muted flex items-center justify-end pr-2">Actual Safe</div>
            <div className="bg-brand-red/20 border border-brand-red/30 p-4 rounded-lg flex flex-col justify-center">
              <span className="font-bold text-lg text-content">55</span>
              <span className="text-xs text-content-muted">False Positives</span>
            </div>
            <div className="bg-brand-cyan/20 border border-brand-cyan/30 p-4 rounded-lg flex flex-col justify-center">
              <span className="font-bold text-lg text-content">3,890</span>
              <span className="text-xs text-content-muted">True Negatives</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
