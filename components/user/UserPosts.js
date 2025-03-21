
'use client'

import { useState, useEffect } from 'react'
import PostCard from '../post/PostCard'
import { fetchUserPosts } from '@/lib/api'

export default function UserPosts({ username }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        const data = await fetchUserPosts(username)
        setPosts(data)
      } catch (err) {
        setError('Failed to load posts. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    loadPosts()
  }, [username])
  
  // For demo purposes, create some mock posts if the API call isn't implemented
  useEffect(() => {
    if (loading && posts.length === 0) {
      const mockPosts = [
        {
          id: 1,
          title: 'My thoughts on React vs Vue',
          content: 'After using both frameworks extensively, I have some thoughts to share about the pros and cons of each...',
          author: username,
          community: 'programming',
          upvotes: 127,
          comments: 42,
          createdAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
        },
        {
          id: 2,
          title: 'Check out this cool project I built with Next.js',
          content: 'I recently finished a side project using Next.js and wanted to share it with everyone...',
          author: username,
          community: 'nextjs',
          upvotes: 89,
          comments: 15,
          createdAt: new Date(Date.now() - 2592000000).toISOString(), // 1 month ago
          image: 'https://via.placeholder.com/600x400',
        },
        {
          id: 3,
          title: 'Question about MongoDB indexing',
          content: 'I\'m trying to optimize my MongoDB queries and wondering about the best indexing strategy for the following schema...',
          author: username,
          community: 'mongodb',
          upvotes: 34,
          comments: 8,
          createdAt: new Date(Date.now() - 7776000000).toISOString(), // 3 months ago
        }
      ]
      
      setPosts(mockPosts)
      setLoading(false)
    }
  }, [loading, posts.length, username])
  
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-md shadow-sm p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
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
  
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-md shadow-sm p-8 text-center">
        <h3 className="text-lg font-medium mb-2">No posts yet</h3>
        <p className="text-gray-500">This user hasn't posted anything yet.</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
