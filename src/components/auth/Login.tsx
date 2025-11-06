import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const { login, currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, authLoading, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/'); // Redirect to main app after successful login
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render login form if already authenticated (will redirect)
  if (currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding/Info */}
        <div className="hidden md:flex md:flex-col md:justify-center">
          <div className="mb-8">
            <div className="flex justify-center md:justify-start mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full shadow-lg">
                <i className="fas fa-brain text-white text-4xl"></i>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Brain Tumor
              <span className="text-blue-600 block">Detection System</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center md:text-left">
              Advanced AI-powered medical diagnosis platform for accurate brain tumor detection and analysis.
            </p>
            <div className="space-y-5 max-w-md mx-auto md:mx-0">
              <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-shield-alt text-blue-600 text-lg"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Secure & Reliable</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Your data is protected with enterprise-grade security</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-microscope text-blue-600 text-lg"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">AI-Powered Analysis</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Advanced machine learning for accurate diagnosis</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-user-md text-blue-600 text-lg"></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Medical Professionals</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Trusted by healthcare providers worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto md:mx-0">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
            {/* Mobile Header */}
            <div className="md:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-md">
                <i className="fas fa-brain text-white text-3xl"></i>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Brain Tumor System
              </h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue to your dashboard</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
                <i className="fas fa-exclamation-circle mt-0.5"></i>
                <div>
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400"></i>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Additional Info for Mobile */}
            <div className="md:hidden mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <i className="fas fa-shield-alt text-blue-600 text-2xl mb-2"></i>
                  <p className="text-xs text-gray-600">Secure</p>
                </div>
                <div>
                  <i className="fas fa-microscope text-blue-600 text-2xl mb-2"></i>
                  <p className="text-xs text-gray-600">AI-Powered</p>
                </div>
                <div>
                  <i className="fas fa-user-md text-blue-600 text-2xl mb-2"></i>
                  <p className="text-xs text-gray-600">Professional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

