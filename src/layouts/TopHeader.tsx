import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Calendar, User, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/': return { title: 'Inventory Intelligence', subtitle: 'Monitor demand, inventory health and stock-out risk across NovaMart.' };
    case '/demand': return { title: 'Demand Intelligence', subtitle: 'Analyze demand patterns and view forecasting metrics.' };
    case '/risk': return { title: 'Inventory Risk Overview', subtitle: 'Monitor and manage stock-out probabilities.' };
    case '/actions': return { title: 'Manager Action Centre', subtitle: 'Prioritized inventory actions requiring attention.' };
    case '/products': return { title: 'Product Directory', subtitle: 'Manage product catalog and check inventory.' };
    case '/stores': return { title: 'Store Intelligence', subtitle: 'Monitor performance and inventory across locations.' };
    case '/model-performance': return { title: 'Model Performance (Prototype)', subtitle: 'Review mock ML prediction accuracy and metrics.' };
    case '/explainability': return { title: 'Prediction Explainability', subtitle: 'Understand contributing factors behind predictions (Mock).' };
    case '/settings': return { title: 'Settings', subtitle: 'Manage your dashboard preferences.' };
    default: return { title: 'Dashboard', subtitle: 'NovaMart Inventory Intelligence' };
  }
};

export const TopHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, subtitle } = getPageTitle(location.pathname);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Theme Logic
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('stocksense_theme');
    return saved ? saved === 'dark' : true; // default dark
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('stocksense_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('stocksense_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("stocksense_authenticated");
    navigate('/login');
  };

  return (
    <header className="h-20 glass-header flex items-center justify-between px-8 z-30 sticky top-0">
      <div>
        <h2 className="text-2xl font-bold text-content tracking-tight">{title}</h2>
        <p className="text-sm text-content-muted mt-1">{subtitle}</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-content-muted group-hover:text-brand-cyan transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search products, stores..." 
            className="block w-64 pl-10 pr-3 py-2 border border-glass-border rounded-xl leading-5 glass-input sm:text-sm"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel glass-panel-hover text-sm text-content-muted">
          <Calendar className="w-4 h-4" />
          <span>Last 7 Days</span>
        </button>

        <button 
          onClick={() => setIsDark(!isDark)}
          className="relative p-2 rounded-xl glass-panel glass-panel-hover text-content-muted hover:text-brand-amber transition-colors"
          title="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5 text-brand-amber" /> : <Moon className="w-5 h-5 text-brand-blue" />}
        </button>

        <button className="relative p-2 rounded-xl glass-panel glass-panel-hover text-content-muted hover:text-content transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 block w-2 h-2 rounded-full bg-brand-red shadow-[0_0_8px_#ef4444]"></span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-full glass-panel glass-panel-hover transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-cyan to-brand-blue flex items-center justify-center border border-glass-border">
              <span className="text-sm font-bold text-content">AK</span>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-content leading-tight">Arun Kumar</p>
              <p className="text-[10px] text-content-muted leading-tight">Inventory Manager</p>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 glass-modal rounded-xl overflow-hidden py-2 transform opacity-100 scale-100 transition-all duration-200 origin-top-right shadow-2xl">
              <div className="px-4 py-3 border-b border-glass-border">
                <p className="text-sm font-medium text-content">Arun Kumar</p>
                <p className="text-xs text-content-muted truncate">arun.k@novamart.com</p>
              </div>
              
              <div className="py-1">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-content-muted hover:bg-glass-hover hover:text-content transition-colors">
                  <User className="w-4 h-4" /> My Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-content-muted hover:bg-glass-hover hover:text-content transition-colors" onClick={() => navigate('/settings')}>
                  <Settings className="w-4 h-4" /> Settings
                </button>
              </div>
              
              <div className="border-t border-glass-border py-1">
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-brand-red hover:bg-brand-red/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
