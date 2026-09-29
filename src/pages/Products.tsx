import React, { useEffect, useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { DataTable } from '../components/DataTable';
import { RiskBadge } from '../components/RiskBadge';
import { api } from '../services/api';
import { EnrichedProductRisk } from '../types';
import { Search } from 'lucide-react';

export const Products: React.FC = () => {
  const [products, setProducts] = useState<EnrichedProductRisk[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.getStockoutRisk().then(setProducts);
  }, []);

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'id', header: 'Product ID' },
    { key: 'name', header: 'Product' },
    { key: 'category', header: 'Category' },
    { key: 'brand', header: 'Brand' },
    { key: 'mrp', header: 'MRP', render: (p: EnrichedProductRisk) => `₹${p.mrp}` },
    { key: 'currentStock', header: 'Stock' },
    { key: 'forecast7Day', header: '7-Day Forecast' },
    { key: 'riskLevel', header: 'Risk', render: (p: EnrichedProductRisk) => <RiskBadge level={p.riskLevel} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-content-muted" />
          </div>
          <input 
            type="text" 
            placeholder="Search products by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-glass-border rounded-xl leading-5 bg-glass text-content-muted placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-cyan focus:border-brand-cyan"
          />
        </div>
        <select className="bg-glass border border-glass-border text-content text-sm rounded-xl px-4 outline-none focus:border-brand-cyan">
          <option>All Categories</option>
          <option>Dairy</option>
          <option>Beverages</option>
          <option>Personal Care</option>
        </select>
        <select className="bg-glass border border-glass-border text-content text-sm rounded-xl px-4 outline-none focus:border-brand-cyan">
          <option>All Brands</option>
        </select>
      </div>

      <GlassCard>
        <DataTable data={filtered} columns={columns} />
      </GlassCard>
    </div>
  );
};
