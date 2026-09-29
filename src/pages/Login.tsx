import React, { useState } from 'react';
import { Package, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('manager@novamart.com');
  const [password, setPassword] = useState('NovaMart@123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (localStorage.getItem('stocksense_authenticated') === 'true') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock Authentication Delay
    setTimeout(() => {
      if (email === 'manager@novamart.com' && password === 'NovaMart@123') {
        localStorage.setItem('stocksense_authenticated', 'true');
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-cyan/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-purple/20 blur-[130px]" />
      <div className="absolute top-[20%] right-[15%] w-[300px] h-[300px] rounded-full bg-brand-blue/10 blur-[100px]" />
      
      {/* Floating Glass Circles (Decorative) */}
      <div className="absolute top-[15%] left-[25%] w-24 h-24 rounded-full border border-glass-border bg-glass backdrop-blur-md animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-[20%] right-[30%] w-32 h-32 rounded-full border border-glass-border bg-brand-purple/10 backdrop-blur-xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

      {/* Main Card */}
      <div className="glass-auth w-full max-w-md p-10 relative z-10 transform transition-all duration-700 hover:shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan/30 to-brand-blue/30 border border-brand-cyan/40 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <Package className="w-8 h-8 text-brand-cyan" />
          </div>
          <h1 className="text-3xl font-bold tracking-wider text-content">STOCKSENSE</h1>
          <p className="text-xs text-brand-cyan font-medium uppercase tracking-widest mt-1">NovaMart Intelligence</p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-content">Welcome back</h2>
          <p className="text-sm text-content-muted mt-2">Sign in to your inventory intelligence workspace.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-brand-red/10 border border-brand-red/30 text-brand-red text-sm text-center backdrop-blur-md animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-content-muted mb-1.5 ml-1">Work Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input placeholder-gray-500" 
              placeholder="manager@novamart.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-content-muted mb-1.5 ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-xl glass-input placeholder-gray-500" 
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-glass-border bg-black/30 text-brand-cyan focus:ring-brand-cyan/50 focus:ring-offset-0" />
              <span className="text-content-muted group-hover:text-content-muted transition-colors">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-brand-cyan hover:text-brand-cyan/80 transition-colors">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-content font-bold text-[15px] glass-button-primary mt-6 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-content" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-content-muted mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-brand-cyan hover:text-content transition-colors font-medium">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};
