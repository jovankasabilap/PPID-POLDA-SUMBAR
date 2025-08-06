// src/hooks/useAuth.ts
import { useState, useEffect } from "react"

interface AuthResult {
  error?: string
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    setIsAuthenticated(!!token)
  }, [])

  // Login
  const signIn = async (username: string, password: string): Promise<AuthResult> => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("adminToken", data.token || "dummyToken")
        setIsAuthenticated(true)
        return {}
      } else {
        return { error: data.message || "Username atau password salah" }
      }
    } catch (err) {
      console.error("Login error:", err)
      return { error: "Gagal login. Coba lagi nanti." }
    }
  }

  // Registrasi (jika diperlukan)
  const signUp = async (username: string, password: string): Promise<AuthResult> => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        return {}
      } else {
        return { error: data.message || "Pendaftaran gagal" }
      }
    } catch (err) {
      console.error("Register error:", err)
      return { error: "Gagal daftar. Coba lagi nanti." }
    }
  }

  const logout = () => {
    localStorage.removeItem("adminToken")
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    signIn,
    signUp,
    logout,
  }
}
