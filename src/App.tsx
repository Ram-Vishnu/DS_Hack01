import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { DemandIntelligence } from './pages/DemandIntelligence';
import { InventoryRisk } from './pages/InventoryRisk';
import { ManagerActionCentre } from './pages/ManagerActionCentre';
import { Products } from './pages/Products';
import { Stores } from './pages/Stores';
import { ModelPerformance } from './pages/ModelPerformance';
import { Explainability } from './pages/Explainability';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('stocksense_authenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="dashboard" element={<Navigate to="/" replace />} />
          <Route path="demand" element={<DemandIntelligence />} />
          <Route path="risk" element={<InventoryRisk />} />
          <Route path="actions" element={<ManagerActionCentre />} />
          <Route path="products" element={<Products />} />
          <Route path="stores" element={<Stores />} />
          <Route path="model-performance" element={<ModelPerformance />} />
          <Route path="explainability" element={<Explainability />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
