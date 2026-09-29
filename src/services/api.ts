import { EnrichedProductRisk, NotificationMsg } from '../types';
import { mockEnrichedProducts, mockNotifications, mockDemandChartData, mockModelPerformance, mockRiskPredictions, mockRecommendations } from '../data/mockData';

// TODO: Replace mock implementation with backend API when ML pipeline is ready.
// Example: export const getDashboardSummary = () => fetch('/api/dashboard/summary').then(res => res.json());

export const api = {
  getDashboardSummary: async () => {
    return {
      revenue: { value: 1248000, trend: 8.4 },
      unitsSold: { value: 48920, trend: 6.7 },
      inventoryValue: { value: 2860000, trend: 2.3 },
      stockOutRate: { value: 4.8, trend: -1.2 },
      productsAtRisk: { value: 27, highRisk: 8 }
    };
  },

  getDemandForecast: async () => {
    return mockDemandChartData;
  },

  getStockoutRisk: async (): Promise<EnrichedProductRisk[]> => {
    return mockEnrichedProducts;
  },

  getRecommendations: async () => {
    return mockRecommendations;
  },

  getProductDetails: async (productId: string, storeId: string) => {
    const product = mockEnrichedProducts.find(p => p.id === productId && p.storeId === storeId);
    if (!product) throw new Error('Product not found');
    const risk = mockRiskPredictions[`${storeId}-${productId}`];
    const recommendation = mockRecommendations[`${storeId}-${productId}`];
    return { product, risk, recommendation };
  },

  getModelMetrics: async () => {
    return mockModelPerformance;
  },

  getExplainability: async (productId: string, storeId: string) => {
    return mockRiskPredictions[`${storeId}-${productId}`]?.contributingFactors || [];
  },

  getNotifications: async (): Promise<NotificationMsg[]> => {
    return mockNotifications;
  }
};
