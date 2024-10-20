'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

type AuthFormProps = {
  isLogin: boolean
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/home')  // Redirect to /home after successful login
      } else {
        const response = await fetch('/auth/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          if (data.error === 'Email not authorized for signup') {
            setError('This email is not authorized for signup. Please contact your organization administrator.')
          } else {
            throw new Error(data.error || 'An error occurred during sign-up')
          }
        } else {
          setMessage('Please check your email for the confirmation link.')
          console.log('Sign-up response:', data)
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error)
      setError(error.message || 'An error occurred during authentication')
    }
  }

  const handlePasswordReset = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      })
      if (error) throw error
      setMessage('Password reset email sent. Please check your inbox.')
    } catch (error: any) {
      console.error('Password reset error:', error)
      setError(error.message || 'An error occurred during password reset')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-md bg-white bg-opacity-5 shadow-lg rounded-lg p-8 space-y-6 border border-gray-700">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-green-500 text-center">{message}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Username</label>
                <input
                  id="name"
                  type="text"
                  placeholder="shaurya"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                id="email"
                type="email"
                placeholder="shaurya@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-md transition-colors duration-300"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <button
            onClick={handlePasswordReset}
            className="w-full text-sm text-gray-400 hover:text-white"
          >
            Forgot password?
          </button>
        </div>
      </motion.div>
    </div>
  )
}
