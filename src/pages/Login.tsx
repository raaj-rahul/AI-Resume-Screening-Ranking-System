import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' as 'admin' | 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginMessage('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isValidStudent = formData.email === 'demo@student.edu' && formData.password === 'student123' && formData.role === 'student';
    const isValidAdmin = formData.email === 'admin@riverside.edu' && formData.password === 'admin123' && formData.role === 'admin';
    
    if (isValidStudent || isValidAdmin) {
      setLoginMessage(`Successfully logged in as ${formData.role}!`);
      
      // Navigate after showing success message
      setTimeout(() => {
        if (formData.role === 'student') {
          navigate('/student/quiz');
        } else {
          navigate('/admin/classes');
        }
      }, 1500);
    } else {
      setLoginMessage('Invalid credentials. Please check your email, password, and role.');
    }
    
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header matching main page */}
      <header className="bg-gradient-to-r from-green-800 to-teal-800 text-white border-b-4 border-orange-400">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-green-800" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Riverside University</h1>
                <p className="text-green-200 text-sm">Learning Management System - Login Portal</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Login Status Message */}
      {loginMessage && (
        <div className={`mx-6 mt-6 p-4 rounded-lg text-center font-medium ${
          loginMessage.includes('Successfully') 
            ? 'bg-green-100 text-green-800 border border-green-300' 
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {loginMessage}
        </div>
      )}

      {/* Main Login Section */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-lg text-gray-600">Sign in to access your courses and quizzes</p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-200 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder="Enter your university email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                  Login As
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none transition-all duration-300 bg-gray-50 hover:bg-white cursor-pointer"
                  >
                    <option value="student">Student</option>
                    <option value="admin">Administrator / Faculty</option>
                  </select>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Navigate to forgot password page')}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2 text-center">Demo Credentials</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <p className="font-medium text-blue-800">Student Access</p>
                  <p className="text-blue-600">demo@student.edu</p>
                  <p className="text-blue-600">student123</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-blue-800">Admin Access</p>
                  <p className="text-blue-600">admin@riverside.edu</p>
                  <p className="text-blue-600">admin123</p>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-8 text-center">
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <button onClick={() => alert('Navigate to help center')} className="hover:text-gray-700">Help Center</button>
                <button onClick={() => alert('Navigate to privacy policy')} className="hover:text-gray-700">Privacy Policy</button>
                <button onClick={() => alert('Navigate to terms of service')} className="hover:text-gray-700">Terms of Service</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* University Info Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-teal-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-bold text-lg mb-2">Need Help?</h4>
              <p className="text-green-200 text-sm">
                Contact IT Support: <br />
                <span className="text-white">support@riverside.edu</span><br />
                <span className="text-white">(951) 827-HELP</span>
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Office Hours</h4>
              <p className="text-green-200 text-sm">
                Monday - Friday: 8:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 2:00 PM<br />
                Sunday: Closed
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">Emergency Contact</h4>
              <p className="text-green-200 text-sm">
                Campus Security: <span className="text-white">(951) 827-5222</span><br />
                Health Services: <span className="text-white">(951) 827-3031</span>
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-700 text-center text-green-200 text-sm">
            <p>© 2025 Riverside University. All rights reserved. | Secure Login Portal</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;