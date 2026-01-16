'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User, 
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const { login, isLoading: authLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const validateForm = () => {
    const newErrors = { email: '', password: '' }
    let isValid = true

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      console.log('Attempting login with:', { email: formData.email, password: '***' })
      const success = await login(formData.email, formData.password, rememberMe)
      
      if (success) {
        toast.success('Login successful! Welcome back.')
        // Navigation is handled by AuthContext
      } else {
        toast.error('Invalid credentials. Please check your email and password.')
      }
    } catch (error) {
      console.error('Login error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Advanced security measures to protect your account'
    },
    {
      icon: User,
      title: 'Role-Based Access',
      description: 'Customized dashboard based on your permissions'
    },
    {
      icon: CheckCircle,
      title: 'Real-time Updates',
      description: 'Stay updated with live notifications and data'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 via-white to-maroon-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left Side - Branding & Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center space-y-8 lg:pr-8"
        >
          {/* Logo & Brand */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-saffron-500 to-maroon-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl sm:text-2xl">S</span>
              </div>
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-admin-800">
                  Saffron Dashboard
                </h1>
                <p className="text-sm sm:text-base text-admin-600">Premium Admin Portal</p>
              </div>
            </div>
            <p className="text-base sm:text-lg text-admin-700 leading-relaxed">
              Manage your saffron business with our comprehensive admin dashboard. 
              Access powerful tools for inventory, orders, content, and customer management.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl backdrop-blur-sm"
                >
                  <div className="p-2 bg-saffron-100 rounded-lg">
                    <Icon className="w-5 h-5 text-saffron-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-admin-800 mb-1">{feature.title}</h3>
                    <p className="text-sm text-admin-600">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8">
              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-admin-800 mb-2">
                  Welcome Back
                </h2>
                <p className="text-admin-600">Sign in to your admin account</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-400 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`input-field pl-11 ${errors.email ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="admin@saffronshop.com"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-admin-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-admin-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`input-field pl-11 pr-11 ${errors.password ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-admin-400 hover:text-admin-600 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-saffron-600 bg-gray-100 border-gray-300 rounded focus:ring-saffron-500 focus:ring-2"
                      disabled={isLoading}
                    />
                    <span className="ml-2 text-sm text-admin-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-saffron-600 hover:text-saffron-700 font-medium transition-colors"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || authLoading}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {(isLoading || authLoading) ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Backend Credentials Info */}
              <div className="mt-6 p-4 bg-saffron-50 rounded-lg border border-saffron-200">
                <h4 className="text-sm font-medium text-saffron-800 mb-2">Login Credentials:</h4>
                <div className="text-xs text-saffron-700 space-y-1">
                  <p>Use the admin credentials from your backend <code className="bg-saffron-100 px-1 py-0.5 rounded">.env</code> file</p>
                  <div className="mt-3 p-2 bg-white rounded border border-saffron-300">
                    <p className="font-mono"><strong>Email:</strong> a@aa.co</p>
                    <p className="font-mono"><strong>Password:</strong> 123412</p>
                  </div>
                  <p className="text-saffron-600 mt-2">
                    * These are from ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-xs text-admin-500">
                  Protected by advanced security measures
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage