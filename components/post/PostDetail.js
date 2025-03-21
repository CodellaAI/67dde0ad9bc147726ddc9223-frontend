
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { FaArrowUp, FaArrowDown, FaRegComment, FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import { fetchPostById } from '@/lib/api'

export default function PostDetail({ community, postId }) {
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userVote, setUserVote] = useState(0)
  
  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true)
        const data = await fetchPostById(postId)
        setPost(data)
      } catch (err) {
        setError('Failed to load post. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    loadPost()
  }, [postId])
  
  // For demo purposes, create a mock post if the API call isn't implemented
  useEffect(() => {
    if (loading && !post) {
      const mockPost = {
        id: Number(postId),
        title: 'Detailed post about web development',
        content: `This is a long-form post discussing the latest trends in web development.
        
Next.js has been gaining a lot of traction lately, and for good reason. It provides an excellent developer experience with features like server-side rendering, static site generation, and API routes.

TailwindCSS is another tool that has revolutionized the way we style our applications. Its utility-first approach allows for rapid UI development without leaving your HTML.

What do you think about these technologies? Have you used them in your projects?`,
        author: 'tech_enthusiast',
        community: community,
        upvotes: 487,
        comments: 73,
        createdAt: new Date(Date.now() - 5400000).toISOString(),
        image: Math.random() > 0.5 ? 'https://via.placeholder.com/800x600' : null,
      }
      
      setPost(mockPost)
      setLoading(false)
    }
  }, [loading, post, postId, community])
  
  const handleVote = (value) => {
    if (!user) {
      // Redirect to login or show login modal
      return
    }
    
    // If clicking the same vote button, remove the vote
    if (userVote === value) {
      setPost({...post, upvotes: post.upvotes - value})
      setUserVote(0)
    } else {
      // If changing vote, adjust by the difference
      setPost({...post, upvotes: post.upvotes - userVote + value})
      setUserVote(value)
    }
    
    // Here you would normally call an API to update the vote
  }
  
  if (loading) {
    return (
      <div className="bg-white rounded-md shadow-sm p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-md shadow-sm p-4">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-2 text-reddit-blue hover:underline"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    )
  }
  
  if (!post) {
    return (
      <div className="bg-white rounded-md shadow-sm p-8 text-center">
        <h3 className="text-lg font-medium mb-2">Post not found</h3>
        <p className="text-gray-500 mb-4">The post you're looking for might have been removed or doesn't exist.</p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-md shadow-sm mb-4">
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
            {post.upvotes}
          </span>
          <button 
            onClick={() => handleVote(-1)}
            className={`p-1 rounded ${userVote === -1 ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
          >
            <FaArrowDown />
          </button>
        </div>
        
        {/* Post content */}
        <div className="p-4 flex-grow">
          {/* Post header */}
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <Link href={`/r/${post.community}`} className="font-bold hover:underline text-gray-900">
              r/{post.community}
            </Link>
            <span className="mx-1">•</span>
            <span>Posted by</span>
            <Link href={`/user/${post.author}`} className="ml-1 hover:underline">
              u/{post.author}
            </Link>
            <span className="mx-1">•</span>
            <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
          </div>
          
          {/* Post title */}
          <h1 className="text-xl font-medium mb-3">{post.title}</h1>
          
          {/* Post content */}
          <div className="text-sm text-gray-800 mb-4 whitespace-pre-line">
            <p>{post.content}</p>
          </div>
          
          {/* Post image if available */}
          {post.image && (
            <div className="mb-4 relative">
              <Image 
                src={post.image}
                alt={post.title}
                width={800}
                height={600}
                className="rounded-md max-h-[600px] w-auto object-contain"
              />
            </div>
          )}
          
          {/* Post actions */}
          <div className="flex items-center text-xs text-gray-500 border-t pt-3">
            <button className="flex items-center mr-4 hover:bg-gray-100 p-1 rounded">
              <FaRegComment className="mr-1" />
              <span>{post.comments} Comments</span>
            </button>
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
