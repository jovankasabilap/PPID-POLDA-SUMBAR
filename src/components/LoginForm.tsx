"use client"

import React, { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { X, User, Lock, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

interface LoginFormProps {
  onClose: () => void
}

export default function LoginForm({ onClose }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")

  const { signIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { error } = await signIn(formData.username, formData.password)
      if (error) throw new Error(error)

      onClose()
      navigate("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/polda.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-blue-900/90 z-0" />

      <Card className="relative z-10 w-full max-w-md border-none bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl animate-fadeIn">
        <CardHeader className="relative text-center">
          {/* Logo */}
          <img
            src="/logo_polda.png"
            alt="Logo Polda Sumbar"
            className="mx-auto mb-4 h-16"
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-full text-gray-400 hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <CardTitle className="text-3xl font-bold text-gray-800 mb-1">
            Administrator Login
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Please enter your credentials to access the admin dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  placeholder="Enter your username"
                  className="pl-10 pr-10 border border-blue-900 focus:border-blue-900 focus:ring-blue-400 rounded-lg transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 border border-blue-900 focus:border-blue-900 focus:ring-blue-400 rounded-lg transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-sm text-red-600 bg-red-100 border border-red-200 px-3 py-2 rounded-md">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white hover:brightness-150 font-semibold tracking-wide"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-xs text-center text-gray-500 mt-6">
            © {new Date().getFullYear()} PPID Polda Sumbar. All rights reserved.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}