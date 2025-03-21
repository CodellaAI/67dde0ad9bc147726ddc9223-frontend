
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FaRegImage, FaLink, FaPoll, FaRegFileAlt } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import { createPost } from '@/lib/api'

export default function SubmitPostForm() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('post')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCommunity, setSelectedCommunity] = useState('')
  
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  // Mock communities for demo
  const communities = [
    'programming',
    'nextjs',
    'webdev',
    'react',
    'javascript'
  ]
  
  const onSubmit = async (data) => {
    if (!user) {
      router.push('/login')
      return
    }
    
    if (!selectedCommunity) {
      setError('Please select a community')
      return
    }
    
    try {
      setIsSubmitting(true)
      setError(null)
      
      const postData = {
        ...data,
        community: selectedCommunity,
        author: user.username,
      }
      
      // Call API to create post
      const newPost = await createPost(postData)
      
      // Redirect to the new post
      router.push(`/r/${selectedCommunity}/${newPost.id}`)
    } catch (err) {
      setError('Failed to create post. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // For demo purposes, mock the post creation
  const mockSubmit = (data) => {
    if (!user) {
      router.push('/login')
      return
    }
    
    if (!selectedCommunity) {
      setError('Please select a community')
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      router.push(`/r/${selectedCommunity}`)
    }, 1000)
  }
  
  if (!user) {
    return (
      <div className="bg-white rounded-md shadow-sm p-8 text-center">
        <h3 className="text-lg font-medium mb-2">You need to log in to create a post</h3>
        <p className="text-gray-500 mb-4">Join the conversation by creating an account or logging in.</p>
        <button 
          onClick={() => router.push('/login')}
          className="btn-primary mr-2"
        >
          Log In
        </button>
        <button 
          onClick={() => router.push('/signup')}
          className="btn-secondary"
        >
          Sign Up
        </button>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-md shadow-sm">
      <div className="border-b">
        <div className="flex">
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'post' ? 'border-reddit-blue text-reddit-blue' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('post')}
          >
            <div className="flex items-center">
              <FaRegFileAlt className="mr-1" />
              <span>Post</span>
            </div>
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'image' ? 'border-reddit-blue text-reddit-blue' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('image')}
          >
            <div className="flex items-center">
              <FaRegImage className="mr-1" />
              <span>Image</span>
            </div>
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'link' ? 'border-reddit-blue text-reddit-blue' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('link')}
          >
            <div className="flex items-center">
              <FaLink className="mr-1" />
              <span>Link</span>
            </div>
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'poll' ? 'border-reddit-blue text-reddit-blue' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('poll')}
          >
            <div className="flex items-center">
              <FaPoll className="mr-1" />
              <span>Poll</span>
            </div>
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(mockSubmit)} className="p-4">
        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-500 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-blue"
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
          >
            <option value="">Choose a community</option>
            {communities.map(community => (
              <option key={community} value={community}>r/{community}</option>
            ))}
          </select>
          {!selectedCommunity && (
            <p className="text-xs text-gray-500 mt-1">Please select a community to post to</p>
          )}
        </div>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-blue"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">Title is required</p>
          )}
        </div>
        
        {activeTab === 'post' && (
          <div className="mb-4">
            <textarea
              placeholder="Text (optional)"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-blue min-h-[200px]"
              {...register("content")}
            ></textarea>
          </div>
        )}
        
        {activeTab === 'image' && (
          <div className="mb-4">
            <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
              <FaRegImage className="mx-auto text-gray-400 text-4xl mb-2" />
              <p className="text-gray-500 mb-2">Drag and drop images or</p>
              <button type="button" className="btn-secondary">Upload</button>
              <input type="file" className="hidden" />
            </div>
          </div>
        )}
        
        {activeTab === 'link' && (
          <div className="mb-4">
            <input
              type="url"
              placeholder="URL"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reddit-blue"
              {...register("url")}
            />
          </div>
        )}
        
        {activeTab === 'poll' && (
          <div className="mb-4">
            <p className="text-center text-gray-500 py-8">Poll creation is coming soon!</p>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="button"
            className="btn-outline mr-2"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  )
}
