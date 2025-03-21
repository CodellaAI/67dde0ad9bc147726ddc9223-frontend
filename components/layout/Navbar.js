
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaReddit, FaSearch, FaBell, FaUser, FaChevronDown } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <nav className="bg-white shadow-sm py-2 sticky top-0 z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <FaReddit className="text-reddit-orange text-3xl" />
              <span className="text-xl font-bold hidden sm:block">reddit clone</span>
            </Link>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm hover:bg-gray-100 py-1 px-2 rounded-md">
                <span>Home</span>
                <FaChevronDown className="text-xs" />
              </button>
              <div className="absolute left-0 top-full mt-1 bg-white rounded-md shadow-lg p-2 w-56 hidden group-hover:block">
                <Link href="/" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md">Home</Link>
                <Link href="/r/popular" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md">Popular</Link>
                <Link href="/r/all" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md">All</Link>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="flex-grow max-w-xl mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-reddit-blue focus:border-reddit-blue text-sm"
                placeholder="Search Reddit"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <FaBell className="text-xl" />
                </button>
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-1 hover:bg-gray-100 p-1 rounded-md"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <FaUser className="text-gray-500" />
                    </div>
                    <FaChevronDown className="text-xs text-gray-500" />
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg py-1 w-56">
                      <Link 
                        href={`/user/${user.username}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link 
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/login"
                  className="btn-secondary text-sm py-1"
                >
                  Log In
                </Link>
                <Link 
                  href="/signup"
                  className="btn-primary text-sm py-1"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
