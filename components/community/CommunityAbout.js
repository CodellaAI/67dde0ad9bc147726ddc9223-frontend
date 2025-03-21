
'use client'

import { useState, useEffect } from 'react'
import { FaBirthdayCake, FaUsers, FaReddit } from 'react-icons/fa'
import { fetchCommunityInfo } from '@/lib/api'

export default function CommunityAbout({ name }) {
  const [communityInfo, setCommunityInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadCommunityInfo() {
      try {
        setLoading(true)
        const data = await fetchCommunityInfo(name)
        setCommunityInfo(data)
      } catch (err) {
        console.error(err)
        // Fall back to mock data
        setCommunityInfo(null)
      } finally {
        setLoading(false)
      }
    }
    
    loadCommunityInfo()
  }, [name])
  
  // For demo purposes, create mock community info if the API call isn't implemented
  useEffect(() => {
    if (loading && !communityInfo) {
      // Create mock data based on the community name
      const mockInfo = {
        name,
        description: `A community for discussions about ${name} related topics.`,
        members: Math.floor(Math.random() * 900000) + 100000,
        online: Math.floor(Math.random() * 9000) + 1000,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 31536000000 * 3)).toISOString(), // Random date within last 3 years
        rules: [
          'Be respectful to others',
          'No spam or self-promotion',
          'Use descriptive titles',
          'Mark spoilers appropriately'
        ]
      }
      
      setCommunityInfo(mockInfo)
      setLoading(false)
    }
  }, [loading, communityInfo, name])
  
  if (loading) {
    return (
      <div className="bg-white rounded-md shadow-sm p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
      </div>
    )
  }
  
  if (!communityInfo) {
    return (
      <div className="bg-white rounded-md shadow-sm p-4">
        <p className="text-gray-500">Community information not available</p>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-md shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-base font-medium">About Community</h2>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-800 mb-4">{communityInfo.description}</p>
        
        <div className="flex items-center mb-3">
          <FaUsers className="text-gray-500 mr-2" />
          <div>
            <div className="text-lg font-medium">{formatNumber(communityInfo.members)}</div>
            <div className="text-xs text-gray-500">Members</div>
          </div>
          <div className="ml-6">
            <div className="text-lg font-medium">{formatNumber(communityInfo.online)}</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FaBirthdayCake className="mr-2" />
          <span>Created {formatDate(communityInfo.createdAt)}</span>
        </div>
        
        <button className="btn-primary w-full mb-3">Join</button>
        <button className="btn-outline w-full">Create Post</button>
      </div>
      
      <div className="border-t p-4">
        <h3 className="text-base font-medium mb-3">r/{name} Rules</h3>
        <ol className="list-decimal list-inside text-sm space-y-2">
          {communityInfo.rules.map((rule, index) => (
            <li key={index} className="text-gray-800">{rule}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function formatNumber(num) {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}m`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}
