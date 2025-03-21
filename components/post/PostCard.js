
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { FaArrowUp, FaArrowDown, FaRegComment, FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'

export default function PostCard({ post }) {
  const { user } = useAuth()
  const [votes, setVotes] = useState(post.upvotes)
  const [userVote, setUserVote] = useState(0) // 0: no vote, 1: upvote, -1: downvote
  
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
  
  return (
    <div className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow">
      <div className="flex">
        {/* Vote sidebar */}
        <div className="bg-gray-50 w-10 sm:w-12 flex flex-col items-center py-2 rounded-l-md">
          <button 
            onClick={() => handleVote(1)}
            className={`p-1 rounded ${userVote === 1 ? 'text-reddit-orange' : 'text-gray-400 hover:text-reddit-orange'}`}
          >
            <FaArrowUp />
          </button>
          <span className={`text-xs font-bold my-1 ${
            userVote === 1 ? 'text-reddit-orange' : 
            userVote === -1 ? 'text-blue-600' : 
            'text-gray-700'
          }`}>
            {votes}
          </span>
          <button 
            onClick={() => handleVote(-1)}
            className={`p-1 rounded ${userVote === -1 ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
          >
            <FaArrowDown />
          </button>
        </div>
        
        {/* Post content */}
        <div className="p-3 flex-grow">
          {/* Post header */}
          <div className="flex items-center text-xs text-gray-500 mb-2">
            {post.community && (
              <>
                <Link href={`/r/${post.community}`} className="font-bold hover:underline text-gray-900">
                  r/{post.community}
                </Link>
                <span className="mx-1">•</span>
              </>
            )}
            <span>Posted by</span>
            <Link href={`/user/${post.author}`} className="ml-1 hover:underline">
              u/{post.author}
            </Link>
            <span className="mx-1">•</span>
            <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
          </div>
          
          {/* Post title */}
          <Link href={`/r/${post.community}/${post.id}`}>
            <h3 className="text-lg font-medium mb-2 hover:underline">{post.title}</h3>
          </Link>
          
          {/* Post content */}
          <div className="text-sm text-gray-800 mb-3">
            <p>{post.content}</p>
          </div>
          
          {/* Post image if available */}
          {post.image && (
            <div className="mb-3 relative">
              <Image 
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="rounded-md max-h-96 w-auto object-contain"
              />
            </div>
          )}
          
          {/* Post actions */}
          <div className="flex items-center text-xs text-gray-500">
            <Link href={`/r/${post.community}/${post.id}`} className="flex items-center mr-4 hover:bg-gray-100 p-1 rounded">
              <FaRegComment className="mr-1" />
              <span>{post.comments} Comments</span>
            </Link>
            <button className="flex items-center mr-4 hover:bg-gray-100 p-1 rounded">
              <FaShare className="mr-1" />
              <span>Share</span>
            </button>
            <button className="flex items-center mr-4 hover:bg-gray-100 p-1 rounded">
              <FaBookmark className="mr-1" />
              <span>Save</span>
            </button>
            <button className="flex items-center hover:bg-gray-100 p-1 rounded">
              <FaEllipsisH />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
