
'use client'

import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Check if user is logged in
    const token = Cookies.get('token')
    
    if (token) {
      // For demo purposes, we'll just create a mock user
      // In a real app, you would validate the token with your API
      try {
        const mockUser = {
          id: '1',
          username: 'demo_user',
          email: 'demo@example.com',
        }
        
        setUser(mockUser)
      } catch (err) {
        console.error('Failed to validate token:', err)
        Cookies.remove('token')
      }
    }
    
    setLoading(false)
  }, [])
  
  const login = async (username, password) => {
    // For demo purposes, we'll just create a mock user and token
    // In a real app, you would call your API to authenticate
    
    // Mock successful login for demo purposes
    if (username && password) {
      const mockUser = {
        id: '1',
        username,
        email: `${username}@example.com`,
      }
      
      const mockToken = 'mock-jwt-token'
      
      // Store token in cookie
      Cookies.set('token', mockToken, { expires: 7 }) // Expires in 7 days
      
      setUser(mockUser)
      return mockUser
    } else {
      throw new Error('Invalid credentials')
    }
  }
  
  const signup = async (email, username, password) => {
    // For demo purposes, we'll just create a mock user and token
    // In a real app, you would call your API to register
    
    // Mock successful signup for demo purposes
    if (email && username && password) {
      const mockUser = {
        id: '1',
        username,
        email,
      }
      
      const mockToken = 'mock-jwt-token'
      
      // Store token in cookie
      Cookies.set('token', mockToken, { expires: 7 }) // Expires in 7 days
      
      setUser(mockUser)
      return mockUser
    } else {
      throw new Error('Invalid registration data')
    }
  }
  
  const logout = () => {
    // Remove token from cookie
    Cookies.remove('token')
    
    // Clear user state
    setUser(null)
  }
  
  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
