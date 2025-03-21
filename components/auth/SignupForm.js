
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/hooks/useAuth'

export default function SignupForm() {
  const { signup } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')
  
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      setError(null)
      
      await signup(data.email, data.username, data.password)
      
      // Redirect to home page after successful signup
      router.push('/')
    } catch (err) {
      setError('Failed to create account. Please try again.')
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-reddit-blue focus:border-reddit-blue"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      
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
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "Username can only contain letters, numbers, and underscores"
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
              value: 8,
              message: "Password must be at least 8 characters"
            }
          })}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-reddit-blue focus:border-reddit-blue"
          {...register("confirmPassword", { 
            required: "Please confirm your password",
            validate: value => value === password || "Passwords do not match"
          })}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
      
      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          className="h-4 w-4 text-reddit-blue focus:ring-reddit-blue border-gray-300 rounded"
          {...register("terms", { 
            required: "You must agree to the terms and conditions"
          })}
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the <a href="#" className="text-reddit-blue hover:underline">Terms and Conditions</a>
        </label>
      </div>
      {errors.terms && (
        <p className="mt-1 text-sm text-red-500">{errors.terms.message}</p>
      )}
      
      <div>
        <button
          type="submit"
          className="w-full bg-reddit-orange hover:bg-reddit-red text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Sign Up'}
        </button>
      </div>
    </form>
  )
}
