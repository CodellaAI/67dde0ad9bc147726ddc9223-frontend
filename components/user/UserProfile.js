
'use client'

import { useState, useEffect } from 'react'
import { FaBirthdayCake, FaUserCircle } from 'react-icons/fa'
import { fetchUserProfile } from '@/lib/api'

export default function UserProfile({ username }) {
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
        description: `Hi, I'm ${username}. I enjoy discussing technology and programming.`
      }
      
      setProfile(mockProfile)
      setLoading(false)
    }
  }, [loading, profile, username])
  
  if (loading) {
    return (
      <div className="bg-white rounded-md shadow-sm p-6 mb-4 animate-pulse">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
          <div>
            <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }
  
  if (!profile) {
    return (
      <div className="bg-white rounded-md shadow-sm p-6 mb-4">
        <p className="text-gray-500">User profile not available</p>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-md shadow-sm p-6 mb-4">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          <FaUserCircle className="text-gray-400 text-4xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold">{profile.username}</h1>
          <p className="text-sm text-gray-500">{profile.karma} karma</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-800 mb-4">{profile.description}</p>
      
      <div className="flex items-center text-sm text-gray-500">
        <FaBirthdayCake className="mr-2" />
        <span>Cake day: {formatDate(profile.createdAt)}</span>
      </div>
    </div>
  )
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const month = date.toLocaleString('default', { month: 'long' })
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}
