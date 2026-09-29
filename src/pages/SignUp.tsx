import React, { useState } from 'react';
import { Package, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

export const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Inventory Manager'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (localStorage.getItem('stocksense_authenticated') === 'true') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    // Mock Authentication Delay
    setTimeout(() => {
      localStorage.setItem('stocksense_authenticated', 'true');
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden py-12">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-cyan/20 blur-[120px]" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-purple/20 blur-[130px]" />
      
      {/* Floating Glass Circles (Decorative) */}
      <div className="absolute top-[30%] left-[15%] w-16 h-16 rounded-full border border-glass-border bg-glass backdrop-blur-md animate-pulse" style={{ animationDuration: '5s' }} />

      {/* Main Card */}
      <div className="glass-auth w-full max-w-md p-10 relative z-10 transform transition-all duration-700 hover:shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/30 to-brand-blue/30 border border-brand-cyan/40 flex items-center justify-center mb-3">
            <Package className="w-6 h-6 text-brand-cyan" />
          </div>
          <h1 className="text-xl font-bold tracking-wider text-content">STOCKSENSE</h1>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-content">Create your workspace</h2>
          <p className="text-sm text-content-muted mt-2">Join NovaMart Inventory Intelligence.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-brand-red/10 border border-brand-red/30 text-brand-red text-sm text-center backdrop-blur-md animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-content-muted mb-1 ml-1">Full Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl glass-input placeholder-gray-500 text-sm" 
              placeholder="e.g. Arun Kumar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-content-muted mb-1 ml-1">Work Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl glass-input placeholder-gray-500 text-sm" 
              placeholder="arun@novamart.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-content-muted mb-1 ml-1">Role</label>
            <select 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-content-muted text-sm [&>option]:bg-[#050711] [&>option]:text-content"
            >
              <option value="Inventory Manager">Inventory Manager</option>
              <option value="Store Manager">Store Manager</option>
              <option value="Analyst">Analyst</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-content-muted mb-1 ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl glass-input placeholder-gray-500 text-sm" 
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-content-muted mb-1 ml-1">Confirm Password</label>
            <input 
              type={showPassword ? 'text' : 'password'} 
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl glass-input placeholder-gray-500 text-sm" 
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-start gap-2 mt-4">
            <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-glass-border bg-black/30 text-brand-cyan focus:ring-brand-cyan/50" />
            <span className="text-xs text-content-muted">
              I agree to the <a href="#" className="text-brand-cyan hover:underline">terms and conditions</a> and privacy policy.
            </span>
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
                Creating account...
              </>
            ) : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-content-muted mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-cyan hover:text-content transition-colors font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
