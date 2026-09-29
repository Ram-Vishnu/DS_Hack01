import React, { useState } from 'react';
import { Package, ArrowLeft } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redirect if already authenticated
  if (localStorage.getItem('stocksense_authenticated') === 'true') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock sending email
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-brand-blue/10 blur-[100px]" />
      <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-brand-cyan/20 blur-[120px]" />
      
      {/* Main Card */}
      <div className="glass-auth w-full max-w-md p-10 relative z-10 transform transition-all duration-700 hover:shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan/30 to-brand-blue/30 border border-brand-cyan/40 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <Package className="w-8 h-8 text-brand-cyan" />
          </div>
          <h1 className="text-3xl font-bold tracking-wider text-content">STOCKSENSE</h1>
        </div>

        {!success ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-content">Reset your password</h2>
              <p className="text-sm text-content-muted mt-2">Enter your email and we'll send you instructions.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-content-muted mb-1.5 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-input placeholder-gray-500" 
                  placeholder="manager@novamart.com"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-content font-bold text-[15px] glass-button-primary mt-2 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-content" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-emerald/20 border border-brand-emerald/30 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-content">Check your email</h2>
            <p className="text-sm text-content-muted">
              Password reset instructions have been sent to <strong>{email}</strong>.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-content-muted hover:text-content transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
};
