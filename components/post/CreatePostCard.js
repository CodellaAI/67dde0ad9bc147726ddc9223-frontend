
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaRegImage, FaLink } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'

export default function CreatePostCard({ community }) {
  const { user } = useAuth()
  const router = useRouter()
  
  const handleFocus = () => {
    router.push(community ? `/r/${community}/submit` : '/submit')
  }
  
  return (
    <div className="bg-white rounded-md shadow-sm p-2 mb-4">
      {user ? (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
          <input
            type="text"
            className="flex-grow mx-3 bg-gray-100 hover:bg-white border border-gray-200 hover:border-blue-500 rounded-md px-4 py-2 text-sm"
            placeholder={`Create post${community ? ` in r/${community}` : ''}`}
            onFocus={handleFocus}
            readOnly
          />
          <button 
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            onClick={handleFocus}
          >
            <FaRegImage />
          </button>
          <button 
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            onClick={handleFocus}
          >
            <FaLink />
          </button>
        </div>
      ) : (
        <div className="text-center py-2">
          <p className="text-sm mb-2">Log in or sign up to post and comment</p>
          <div className="flex space-x-2 justify-center">
            <Link href="/login" className="btn-secondary text-sm py-1 px-6">
              Log In
            </Link>
            <Link href="/signup" className="btn-primary text-sm py-1 px-6">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
