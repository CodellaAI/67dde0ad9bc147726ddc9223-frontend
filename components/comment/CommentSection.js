
'use client'

import { useState, useEffect } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { fetchComments } from '@/lib/api'

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('best')
  
  useEffect(() => {
    async function loadComments() {
      try {
        setLoading(true)
        const data = await fetchComments(postId)
        setComments(data)
      } catch (err) {
        setError('Failed to load comments. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    loadComments()
  }, [postId])
  
  // For demo purposes, create some mock comments if the API call isn't implemented
  useEffect(() => {
    if (loading && comments.length === 0) {
      const mockComments = [
        {
          id: 1,
          content: "This is a great post! I've been using Next.js for a while now and it's amazing.",
          author: "nextjs_lover",
          upvotes: 24,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          replies: [
            {
              id: 2,
              content: "I agree! The new app router is a game changer.",
              author: "web_dev_pro",
              upvotes: 12,
              createdAt: new Date(Date.now() - 3000000).toISOString(),
              replies: []
            },
            {
              id: 3,
              content: "What's your favorite feature in Next.js 14?",
              author: "curious_coder",
              upvotes: 5,
              createdAt: new Date(Date.now() - 2400000).toISOString(),
              replies: [
                {
                  id: 4,
                  content: "For me it's definitely the improved caching system!",
                  author: "nextjs_lover",
                  upvotes: 8,
                  createdAt: new Date(Date.now() - 1800000).toISOString(),
                  replies: []
                }
              ]
            }
          ]
        },
        {
          id: 5,
          content: "I'm new to web development. Would you recommend starting with Next.js or plain React?",
          author: "beginner_dev",
          upvotes: 7,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          replies: [
            {
              id: 6,
              content: "I'd recommend starting with plain React to understand the basics, then move to Next.js once you're comfortable.",
              author: "senior_dev",
              upvotes: 19,
              createdAt: new Date(Date.now() - 5400000).toISOString(),
              replies: []
            }
          ]
        },
        {
          id: 7,
          content: "Has anyone deployed a Next.js app to Vercel? How was your experience?",
          author: "deployment_curious",
          upvotes: 11,
          createdAt: new Date(Date.now() - 10800000).toISOString(),
          replies: []
        }
      ]
      
      setComments(mockComments)
      setLoading(false)
    }
  }, [loading, comments.length])
  
  const handleAddComment = (newComment) => {
    setComments([newComment, ...comments])
  }
  
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <CommentForm onAddComment={handleAddComment} />
      
      <div className="mt-4 mb-2 flex items-center">
        <span className="text-sm font-medium mr-2">Sort by:</span>
        <select 
          className="text-sm bg-transparent border-none p-0 font-medium text-reddit-blue focus:outline-none cursor-pointer"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="best">Best</option>
          <option value="top">Top</option>
          <option value="new">New</option>
          <option value="controversial">Controversial</option>
          <option value="old">Old</option>
        </select>
      </div>
      
      {loading ? (
        <div className="space-y-4 mt-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4 text-red-500">
          {error}
          <button 
            className="ml-2 text-reddit-blue hover:underline"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <CommentList comments={comments} />
      )}
    </div>
  )
}
