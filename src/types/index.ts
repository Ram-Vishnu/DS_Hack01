export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  mrp: number;
  cost: number;
  shelfLife: number; // in days
}

export interface Store {
  id: string;
  name: string;
  city: string;
  type: string;
  region: string;
  averageDailyCustomers: number;
  revenue: number;
  stockOutRate: number;
  inventoryValue: number;
}

export interface InventoryRecord {
  storeId: string;
  productId: string;
  currentStock: number;
  incomingStock: number;
  leadTime: number; // in days
  reorderLevel: number;
}

export interface Forecast {
  productId: string;
  storeId: string;
  date: string;
  predictedDemand: number;
  confidenceLower: number;
  confidenceUpper: number;
}

export interface RiskPrediction {
  productId: string;
  storeId: string;
  probability: number; // 0 to 1
  riskLevel: RiskLevel;
  contributingFactors: {
    factor: string;
    impact: 'High' | 'Medium' | 'Low';
    value: number; // e.g. +31%
  }[];
}

export interface Recommendation {
  productId: string;
  storeId: string;
  recommendedStock: number;
  recommendedOrder: number;
  action: 'Reorder' | 'Review' | 'Monitor';
  reason: string;
}

export interface NotificationMsg {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'alert' | 'info' | 'success' | 'warning';
}

export interface ModelMetrics {
  name: string;
  metrics: {
    label: string;
    value: string | number;
  }[];
}

export interface EnrichedProductRisk extends Product {
  storeId: string;
  storeName: string;
  currentStock: number;
  incomingStock: number;
  forecast7Day: number;
  stockoutProbability: number;
  riskLevel: RiskLevel;
  recommendedOrder: number;
  action: 'Reorder' | 'Review' | 'Monitor';
  reorderLevel: number;
  leadTime: number;
}
