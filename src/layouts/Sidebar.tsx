import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  AlertTriangle, 
  CheckSquare, 
  Package, 
  Store as StoreIcon, 
  Activity, 
  Search, 
  Settings 
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/demand', icon: TrendingUp, label: 'Demand Intelligence' },
  { path: '/risk', icon: AlertTriangle, label: 'Inventory Risk' },
  { path: '/actions', icon: CheckSquare, label: 'Manager Actions' },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '/stores', icon: StoreIcon, label: 'Stores' },
  { path: '/model-performance', icon: Activity, label: 'Model Performance' },
  { path: '/explainability', icon: Search, label: 'Explainability' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 flex-shrink-0 glass-sidebar h-full flex flex-col z-20 transition-all duration-300 relative">
      {/* Brand */}
      <div className="p-6 border-b border-glass-border">
        <div className="flex items-center gap-3 text-brand-cyan">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-blue/20 border border-brand-cyan/30 flex items-center justify-center">
            <Package className="w-6 h-6 text-brand-cyan" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-content">STOCKSENSE</h1>
            <p className="text-[10px] text-brand-cyan font-medium uppercase tracking-widest">NovaMart Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'glass-nav-active text-brand-cyan'
                  : 'text-content-muted hover:text-content hover:bg-glass'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-cyan' : ''}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute left-0 w-1 h-8 bg-brand-cyan rounded-r-full" />
              )}
            </NavLink>
          );
        })}
      </div>

    </aside>
  );
};
