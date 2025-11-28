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
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Image Section - ONLY on desktop */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center p-8">
        <div className="text-center max-w-md">
          <img
            src="images/doctor.png"
            alt="Brain Tumor System"
            className="w-64 h-64 mx-auto rounded-xl shadow-md object-cover"
          />
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome to Brain Tumor System
            </h3>
            <p className="text-gray-600">Medical Assistant</p>
          </div>
        </div>
      </div>

      {/* Form Section - Full width on mobile, half on desktop */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md"> {/* Remove mx-auto to use full available space */}
          {/* Header */}
          <div className="text-center mb-8">
            {/* Mobile Logo - Only show on mobile */}
            <div className="lg:hidden mb-6">
              <div className="flex flex-col items-center">
                <img
                  src="images/doctor.png"
                  alt="Brain Tumor System"
                  className="w-16 h-16 rounded-lg shadow-sm mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Welcome to Brain Tumor System
                </h3>
                <p className="text-sm text-gray-600">Medical Assistant</p>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Brain Tumor System</h1>
            <p className="text-lg text-gray-600 mb-2">Start your journey</p>
            <h2 className="text-2xl font-semibold text-gray-900">Sign In</h2>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
                  placeholder="example@email.com"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all"
                  placeholder="**********"
                  required
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or sign in with</span>
                </div>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {/* Add social login buttons here if needed */}
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="font-medium text-gray-900 hover:text-gray-700 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-500">
              © 2025. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;