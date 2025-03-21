
'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function CommentForm({ onAddComment, isReply = false, onCancel }) {
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      // Redirect to login or show login modal
      return
    }
    
    if (!content.trim()) {
      return
    }
    
    try {
      setIsSubmitting(true)
      
      // Create a new comment object
      const newComment = {
        id: Date.now(), // In a real app, this would come from the API
        content: content.trim(),
        author: user.username,
        upvotes: 1, // Start with user's own upvote
        createdAt: new Date().toISOString(),
        replies: []
      }
      
      // Here you would normally call an API to create the comment
      
      // Add the comment to the UI
      onAddComment(newComment)
      
      // Clear the form
      setContent('')
    } catch (err) {
      console.error('Failed to add comment:', err)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (!user) {
    return (
      <div className="bg-gray-50 p-4 rounded-md text-center">
        <p className="text-sm text-gray-600 mb-2">Log in or sign up to leave a comment</p>
        <div className="flex justify-center space-x-2">
          <a href="/login" className="btn-secondary text-sm py-1 px-4">Log In</a>
          <a href="/signup" className="btn-primary text-sm py-1 px-4">Sign Up</a>
        </div>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="border border-gray-300 rounded-md overflow-hidden focus-within:border-reddit-blue focus-within:ring-1 focus-within:ring-reddit-blue">
        <textarea
          className="w-full p-3 text-sm border-none focus:outline-none resize-none"
          placeholder={isReply ? "What are your thoughts on this comment?" : "What are your thoughts?"}
          rows={isReply ? 3 : 4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        
        <div className="bg-gray-50 px-3 py-2 flex justify-end">
          {isReply && onCancel && (
            <button
              type="button"
              className="btn-outline text-sm py-1 mr-2"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn-primary text-sm py-1"
            disabled={!content.trim() || isSubmitting}
          >
            {isSubmitting ? 'Posting...' : isReply ? 'Reply' : 'Comment'}
          </button>
        </div>
      </div>
    </form>
  )
}
