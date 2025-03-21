
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchTopCommunities } from '@/lib/api'

export default function CommunityList() {
  const [communities, setCommunities] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadCommunities() {
      try {
        setLoading(true)
        const data = await fetchTopCommunities()
        setCommunities(data)
      } catch (err) {
        console.error(err)
        // Fall back to mock data
        setCommunities([])
      } finally {
        setLoading(false)
      }
    }
    
    loadCommunities()
  }, [])
  
  // For demo purposes, create some mock communities if the API call isn't implemented
  useEffect(() => {
    if (loading && communities.length === 0) {
      const mockCommunities = [
        { name: 'programming', members: 3754000, description: 'Computer programming' },
        { name: 'nextjs', members: 124000, description: 'Next.js framework' },
        { name: 'webdev', members: 1254000, description: 'Web development' },
        { name: 'react', members: 542000, description: 'React library' },
        { name: 'javascript', members: 1875000, description: 'JavaScript language' }
      ]
      
      setCommunities(mockCommunities)
      setLoading(false)
    }
  }, [loading, communities.length])
  
  if (loading) {
    return (
      <div className="bg-white rounded-md shadow-sm p-4">
        <h2 className="text-base font-medium mb-4">Top Communities</h2>
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
              <div className="flex-grow">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <h2 className="text-base font-medium mb-4">Top Communities</h2>
      
      {communities.length === 0 ? (
        <p className="text-gray-500 text-sm">No communities found</p>
      ) : (
        <ul className="space-y-2">
          {communities.map((community, index) => (
            <li key={community.name} className="flex items-center py-2">
              <span className="text-sm font-medium text-gray-500 mr-2">{index + 1}</span>
              <div className="w-8 h-8 bg-reddit-orange rounded-full flex items-center justify-center text-white font-bold mr-2">
                r/
              </div>
              <div className="flex-grow">
                <Link href={`/r/${community.name}`} className="text-sm font-medium hover:underline">
                  r/{community.name}
                </Link>
                <p className="text-xs text-gray-500">{formatMemberCount(community.members)} members</p>
              </div>
              <button className="text-xs text-reddit-blue font-bold hover:bg-blue-50 px-4 py-1 rounded-full">
                Join
              </button>
            </li>
          ))}
        </ul>
      )}
      
      <div className="mt-4 pt-4 border-t">
        <Link href="/communities" className="text-sm text-reddit-blue hover:underline">
          View All Communities
        </Link>
      </div>
    </div>
  )
}

function formatMemberCount(count) {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}m`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}
