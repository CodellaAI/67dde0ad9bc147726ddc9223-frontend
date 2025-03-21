
'use client'

import { useState, useEffect } from 'react'
import PostCard from './PostCard'
import { fetchPosts } from '@/lib/api'

export default function PostFeed({ community }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        const data = await fetchPosts(community)
        setPosts(data)
      } catch (err) {
        setError('Failed to load posts. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    loadPosts()
  }, [community])
  
  // For demo purposes, create some mock posts if the API call isn't implemented
  useEffect(() => {
    if (loading && posts.length === 0) {
      const mockPosts = [
        {
          id: 1,
          title: 'Check out this amazing Next.js feature',
          content: 'Next.js 14 introduces a lot of performance improvements and new features that make development even better!',
          author: 'nextjs_fan',
          community: community || 'nextjs',
          upvotes: 342,
          comments: 56,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          image: 'https://via.placeholder.com/600x400',
        },
        {
          id: 2,
          title: 'What do you think about TailwindCSS?',
          content: 'I\'ve been using TailwindCSS for my projects lately and I\'m really enjoying the developer experience. What are your thoughts?',
          author: 'css_enthusiast',
          community: community || 'webdev',
          upvotes: 127,
          comments: 89,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          id: 3,
          title: 'Building a Reddit clone with Next.js and TailwindCSS',
          content: 'I\'m working on a Reddit clone using Next.js and TailwindCSS. Here\'s my progress so far!',
          author: 'dev_builder',
          community: community || 'programming',
          upvotes: 215,
          comments: 32,
          createdAt: new Date(Date.now() - 10800000).toISOString(),
        },
        {
          id: 4,
          title: 'Announcing the new React documentation',
          content: 'The React team has released a completely revamped documentation site with new tutorials and examples.',
          author: 'react_team',
          community: community || 'react',
          upvotes: 542,
          comments: 104,
          createdAt: new Date(Date.now() - 14400000).toISOString(),
          image: 'https://via.placeholder.com/600x400',
        },
        {
          id: 5,
          title: 'How to optimize your MongoDB queries',
          content: 'Here are some tips and tricks to make your MongoDB queries faster and more efficient.',
          author: 'db_wizard',
          community: community || 'mongodb',
          upvotes: 98,
          comments: 27,
          createdAt: new Date(Date.now() - 18000000).toISOString(),
        }
      ]
      
      // Filter posts by community if specified
      const filteredPosts = community 
        ? mockPosts.filter(post => post.community === community)
        : mockPosts
        
      setPosts(filteredPosts)
      setLoading(false)
    }
  }, [loading, posts.length, community])
  
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
        <p className="text-gray-500 mb-4">Be the first to share something with the community!</p>
        <button className="btn-primary">Create Post</button>
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
