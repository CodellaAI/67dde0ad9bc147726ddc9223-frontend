
'use client'

import { useState, useEffect } from 'react'
import { FaTrophy, FaUserCircle } from 'react-icons/fa'
import { fetchUserProfile } from '@/lib/api'

export default function UserSidebar({ username }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true)
        const data = await fetchUserProfile(username)
        setProfile(data)
      } catch (err) {
        console.error(err)
        // Fall back to mock data
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }
    
    loadProfile()
  }, [username])
  
  // For demo purposes, create mock profile if the API call isn't implemented
  useEffect(() => {
    if (loading && !profile) {
      // Create mock data based on the username
      const mockProfile = {
        username,
        karma: Math.floor(Math.random() * 50000) + 1000,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 31536000000 * 3)).toISOString(), // Random date within last 3 years
        trophies: [
          { name: 'Verified Email', icon: '✉️' },
          { name: 'One-Year Club', icon: '🎂' },
          { name: 'Top Contributor', icon: '🏆' }
        ],
        activeCommunities: [
          { name: 'programming', members: 3754000 },
          { name: 'nextjs', members: 124000 },
          { name: 'webdev', members: 1254000 }
        ]
      }
      
      setProfile(mockProfile)
      setLoading(false)
    }
  }, [loading, profile, username])
  
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-md shadow-sm p-4 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="bg-white rounded-md shadow-sm p-4 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center">
                <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  if (!profile) {
    return (
      <div className="bg-white rounded-md shadow-sm p-4">
        <p className="text-gray-500">User information not available</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-md shadow-sm p-4">
        <h2 className="text-base font-medium mb-3">Trophy Case</h2>
        {profile.trophies.length === 0 ? (
          <p className="text-sm text-gray-500">No trophies yet</p>
        ) : (
          <ul className="space-y-3">
            {profile.trophies.map((trophy, index) => (
              <li key={index} className="flex items-center">
                <span className="text-xl mr-2">{trophy.icon}</span>
                <span className="text-sm">{trophy.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="bg-white rounded-md shadow-sm p-4">
        <h2 className="text-base font-medium mb-3">Active in these communities</h2>
        {profile.activeCommunities.length === 0 ? (
          <p className="text-sm text-gray-500">Not active in any communities yet</p>
        ) : (
          <ul className="space-y-3">
            {profile.activeCommunities.map(community => (
              <li key={community.name} className="flex items-center">
                <div className="w-8 h-8 bg-reddit-orange rounded-full flex items-center justify-center text-white font-bold mr-2">
                  r/
                </div>
                <div>
                  <a href={`/r/${community.name}`} className="text-sm font-medium hover:underline">
                    r/{community.name}
                  </a>
                  <p className="text-xs text-gray-500">{formatMemberCount(community.members)} members</p>
                </div>
              </li>
            ))}
          </ul>
        )}
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
