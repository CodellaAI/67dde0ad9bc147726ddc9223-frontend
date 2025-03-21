
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { FaArrowUp, FaArrowDown, FaReply, FaEllipsisH } from 'react-icons/fa'
import CommentForm from './CommentForm'
import { useAuth } from '@/hooks/useAuth'

export default function Comment({ comment }) {
  const { user } = useAuth()
  const [isReplying, setIsReplying] = useState(false)
  const [showReplies, setShowReplies] = useState(true)
  const [votes, setVotes] = useState(comment.upvotes)
  const [userVote, setUserVote] = useState(0)
  
  const handleVote = (value) => {
    if (!user) {
      // Redirect to login or show login modal
      return
    }
    
    // If clicking the same vote button, remove the vote
    if (userVote === value) {
      setVotes(votes - value)
      setUserVote(0)
    } else {
      // If changing vote, adjust by the difference
      setVotes(votes - userVote + value)
      setUserVote(value)
    }
    
    // Here you would normally call an API to update the vote
  }
  
  const handleAddReply = (newReply) => {
    // In a real app, you would update the comment with the new reply
    // For now, we'll just close the reply form
    setIsReplying(false)
  }
  
  return (
    <div className="pl-2 border-l-2 border-gray-200">
      <div className="mb-2">
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <Link href={`/user/${comment.author}`} className="font-bold text-gray-900 hover:underline">
            {comment.author}
          </Link>
          <span className="mx-1">•</span>
          <span>{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
        </div>
        
        <div className="text-sm text-gray-800 mb-2">
          {comment.content}
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <div className="flex items-center mr-2">
            <button 
              onClick={() => handleVote(1)}
              className={`p-1 ${userVote === 1 ? 'text-reddit-orange' : 'text-gray-400 hover:text-reddit-orange'}`}
            >
              <FaArrowUp />
            </button>
            <span className={`mx-1 ${
              userVote === 1 ? 'text-reddit-orange' : 
              userVote === -1 ? 'text-blue-600' : 
              'text-gray-700'
            }`}>
              {votes}
            </span>
            <button 
              onClick={() => handleVote(-1)}
              className={`p-1 ${userVote === -1 ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
            >
              <FaArrowDown />
            </button>
          </div>
          
          <button 
            onClick={() => setIsReplying(!isReplying)}
            className="flex items-center mr-2 hover:bg-gray-100 p-1 rounded"
          >
            <FaReply className="mr-1" />
            <span>Reply</span>
          </button>
          
          <button className="flex items-center hover:bg-gray-100 p-1 rounded">
            <FaEllipsisH />
          </button>
        </div>
        
        {isReplying && (
          <div className="mt-2">
            <CommentForm 
              onAddComment={handleAddReply} 
              isReply={true}
              onCancel={() => setIsReplying(false)}
            />
          </div>
        )}
      </div>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.length > 3 && !showReplies && (
            <button 
              onClick={() => setShowReplies(true)}
              className="text-xs text-reddit-blue hover:underline mb-2"
            >
              Show {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </button>
          )}
          
          {showReplies && (
            <>
              {comment.replies.length > 3 && (
                <button 
                  onClick={() => setShowReplies(false)}
                  className="text-xs text-reddit-blue hover:underline mb-2"
                >
                  Hide replies
                </button>
              )}
              <div className="space-y-4">
                {comment.replies.map(reply => (
                  <Comment key={reply.id} comment={reply} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
