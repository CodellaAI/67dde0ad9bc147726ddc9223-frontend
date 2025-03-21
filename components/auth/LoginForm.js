
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/hooks/useAuth'

export default function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      setError(null)
      
      await login(data.username, data.password)
      
      // Redirect to home page after successful login
      router.push('/')
    } catch (err) {
      setError('Invalid username or password. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-500 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-reddit-blue focus:border-reddit-blue"
          {...register("username", { 
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters"
            }
          })}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-reddit-blue focus:border-reddit-blue"
          {...register("password", { 
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      
      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          className="h-4 w-4 text-reddit-blue focus:ring-reddit-blue border-gray-300 rounded"
          {...register("remember")}
        />
        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
          Remember me
        </label>
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full bg-reddit-orange hover:bg-reddit-red text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </div>
      
      <div className="text-center text-sm">
        <a href="#" className="text-reddit-blue hover:underline">
          Forgot password?
        </a>
      </div>
    </form>
  )
}
