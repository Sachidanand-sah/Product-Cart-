import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToken } from '../auth'
import { Lock, Mail, Eye, EyeOff, Loader } from 'lucide-react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()

  // Demo credentials
  const VALID_USERNAME = 'DemoUser'
  const VALID_PASSWORD = 'Demo@123'

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        const token = `mock_token_${Date.now()}`
        saveToken({ email: username, token })
        nav('/')
      } else {
        setError('Invalid username or password')
      }
    } catch (err) {
      console.error(err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-600 to-purple-600 p-6">
      <div className="w-full max-w-md bg-white/6 backdrop-blur rounded-2xl p-8 border border-white/10 shadow-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Sign In</h1>
          <p className="text-sm text-white/70">Use demo: <strong className="text-white">{VALID_USERNAME}</strong> / <strong className="text-white">{VALID_PASSWORD}</strong></p>
        </div>

        {error && <div className="mb-4 text-sm text-red-300">{error}</div>}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/80 mb-1">Username</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                className="w-full pl-10 pr-3 py-2 rounded-md bg-white/5 text-white placeholder-white/50 border border-white/10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="DemoUser"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                className="w-full pl-10 pr-10 py-2 rounded-md bg-white/5 text-white placeholder-white/50 border border-white/10"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Demo@123"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2"><Loader className="w-4 h-4 animate-spin" /> Signing in...</span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/60">© 2025 ProductCartStore</p>
      </div>
    </div>
  )
}