import { Product, Store, EnrichedProductRisk, RiskPrediction, Recommendation, NotificationMsg, ModelMetrics, Forecast } from '../types';

export const mockStores: Store[] = [
  { id: 'S01', name: 'Chennai Central', city: 'Chennai', type: 'Supermarket', region: 'South', averageDailyCustomers: 1200, revenue: 450000, stockOutRate: 3.2, inventoryValue: 1200000 },
  { id: 'S02', name: 'T-Nagar Express', city: 'Chennai', type: 'Express', region: 'South', averageDailyCustomers: 850, revenue: 280000, stockOutRate: 5.1, inventoryValue: 650000 },
  { id: 'S03', name: 'OMR Tech Park', city: 'Chennai', type: 'Hypermarket', region: 'South', averageDailyCustomers: 2100, revenue: 850000, stockOutRate: 2.8, inventoryValue: 2400000 },
  { id: 'S04', name: 'Adyar Fresh', city: 'Chennai', type: 'Supermarket', region: 'South', averageDailyCustomers: 950, revenue: 320000, stockOutRate: 4.5, inventoryValue: 900000 },
];

export const mockProducts: Product[] = [
  { id: 'P001', name: 'Aavin Milk 500ml', category: 'Dairy', brand: 'Aavin', mrp: 22, cost: 18, shelfLife: 3 },
  { id: 'P002', name: 'Cola 750ml', category: 'Beverages', brand: 'Cola', mrp: 40, cost: 28, shelfLife: 180 },
  { id: 'P003', name: 'GlowCare Shampoo', category: 'Personal Care', brand: 'GlowCare', mrp: 150, cost: 110, shelfLife: 730 },
  { id: 'P004', name: 'Tata Salt 1kg', category: 'Grocery', brand: 'Tata', mrp: 25, cost: 20, shelfLife: 365 },
  { id: 'P005', name: 'Maggi Noodles', category: 'Snacks', brand: 'Nestle', mrp: 14, cost: 10, shelfLife: 270 },
];

export const mockRiskPredictions: Record<string, RiskPrediction> = {
  'S01-P001': {
    productId: 'P001',
    storeId: 'S01',
    probability: 0.89,
    riskLevel: 'HIGH',
    contributingFactors: [
      { factor: 'Weekend demand increase', impact: 'High', value: 31 },
      { factor: 'Active promotion', impact: 'High', value: 24 },
      { factor: 'Recent sales growth', impact: 'Medium', value: 19 },
    ]
  },
  'S03-P002': {
    productId: 'P002',
    storeId: 'S03',
    probability: 0.82,
    riskLevel: 'HIGH',
    contributingFactors: [
      { factor: 'Festival effect', impact: 'High', value: 45 },
      { factor: 'Weather effect', impact: 'Medium', value: 15 },
    ]
  },
  'S04-P003': {
    productId: 'P003',
    storeId: 'S04',
    probability: 0.61,
    riskLevel: 'MEDIUM',
    contributingFactors: [
      { factor: 'Supply chain delay', impact: 'High', value: 20 },
      { factor: 'Recent sales growth', impact: 'Low', value: 8 },
    ]
  }
};

export const mockRecommendations: Record<string, Recommendation> = {
  'S01-P001': { productId: 'P001', storeId: 'S01', recommendedStock: 500, recommendedOrder: 180, action: 'Reorder', reason: 'Forecast demand exceeds available inventory.' },
  'S03-P002': { productId: 'P002', storeId: 'S03', recommendedStock: 600, recommendedOrder: 245, action: 'Reorder', reason: 'High festival demand expected.' },
  'S04-P003': { productId: 'P003', storeId: 'S04', recommendedStock: 150, recommendedOrder: 40, action: 'Review', reason: 'Stock dropping below safety threshold.' }
};

export const mockEnrichedProducts: EnrichedProductRisk[] = [
  {
    ...mockProducts[0],
    storeId: 'S01',
    storeName: 'Chennai Central',
    currentStock: 250,
    incomingStock: 50,
    forecast7Day: 485,
    stockoutProbability: 0.89,
    riskLevel: 'HIGH',
    recommendedOrder: 180,
    action: 'Reorder',
    reorderLevel: 200,
    leadTime: 1
  },
  {
    ...mockProducts[1],
    storeId: 'S03',
    storeName: 'OMR Tech Park',
    currentStock: 120,
    incomingStock: 0,
    forecast7Day: 390,
    stockoutProbability: 0.82,
    riskLevel: 'HIGH',
    recommendedOrder: 245,
    action: 'Reorder',
    reorderLevel: 150,
    leadTime: 2
  },
  {
    ...mockProducts[2],
    storeId: 'S04',
    storeName: 'Adyar Fresh',
    currentStock: 60,
    incomingStock: 10,
    forecast7Day: 108,
    stockoutProbability: 0.61,
    riskLevel: 'MEDIUM',
    recommendedOrder: 40,
    action: 'Review',
    reorderLevel: 80,
    leadTime: 3
  },
  {
    ...mockProducts[3],
    storeId: 'S01',
    storeName: 'Chennai Central',
    currentStock: 400,
    incomingStock: 100,
    forecast7Day: 250,
    stockoutProbability: 0.12,
    riskLevel: 'LOW',
    recommendedOrder: 0,
    action: 'Monitor',
    reorderLevel: 150,
    leadTime: 4
  }
];

export const mockNotifications: NotificationMsg[] = [
  { id: '1', title: 'Risk Alert', message: '8 products entered HIGH risk.', timestamp: '10 mins ago', isRead: false, type: 'alert' },
  { id: '2', title: 'System', message: 'Inventory mismatch detected in 3 records.', timestamp: '1 hour ago', isRead: false, type: 'warning' },
  { id: '3', title: 'Intelligence', message: 'Demand forecast updated.', timestamp: '2 hours ago', isRead: true, type: 'info' },
  { id: '4', title: 'Action Required', message: '5 reorder actions awaiting approval.', timestamp: '3 hours ago', isRead: true, type: 'alert' }
];

export const mockDemandChartData = [
  { date: '12 Sep', actual: 4200, forecast: 4150 },
  { date: '13 Sep', actual: 4600, forecast: 4400 },
  { date: '14 Sep', actual: 4800, forecast: 4700 },
  { date: '15 Sep', actual: 4100, forecast: 4200 },
  { date: '16 Sep', actual: 4500, forecast: 4600 },
  { date: '17 Sep', actual: 4700, forecast: 4800 },
  { date: '18 Sep', actual: 5100, forecast: 5050 },
  { date: '19 Sep', forecast: 5200 },
  { date: '20 Sep', forecast: 5400 },
  { date: '21 Sep', forecast: 5100 },
  { date: '22 Sep', forecast: 5000 },
  { date: '23 Sep', forecast: 4800 },
  { date: '24 Sep', forecast: 4900 },
  { date: '25 Sep', forecast: 5300 },
];

export const mockModelPerformance = {
  demandForecasting: {
    name: 'XGBoost Regressor',
    metrics: [
      { label: 'MAE', value: 18.7 },
      { label: 'RMSE', value: 27.3 },
      { label: 'MAPE', value: '8.6%' },
      { label: 'R²', value: 0.91 }
    ]
  },
  stockoutClassification: {
    name: 'Random Forest',
    metrics: [
      { label: 'Accuracy', value: '91.2%' },
      { label: 'Precision', value: '88.5%' },
      { label: 'Recall', value: '86.7%' },
      { label: 'F1 Score', value: '87.6%' },
      { label: 'ROC-AUC', value: 0.94 }
    ]
  }
};
