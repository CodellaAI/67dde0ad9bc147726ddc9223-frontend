
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    // Get token from cookies or local storage
    const token = typeof window !== 'undefined' ? 
      document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1') : 
      null
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => Promise.reject(error)
)

// Posts
export const fetchPosts = async (community) => {
  try {
    const endpoint = community ? `/api/posts?community=${community}` : '/api/posts'
    const response = await api.get(endpoint)
    return response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export const fetchPostById = async (postId) => {
  try {
    const response = await api.get(`/api/posts/${postId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}

export const createPost = async (postData) => {
  try {
    const response = await api.post('/api/posts', postData)
    return response.data
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

export const votePost = async (postId, value) => {
  try {
    const response = await api.post(`/api/posts/${postId}/vote`, { value })
    return response.data
  } catch (error) {
    console.error('Error voting on post:', error)
    throw error
  }
}

// Comments
export const fetchComments = async (postId) => {
  try {
    const response = await api.get(`/api/posts/${postId}/comments`)
    return response.data
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

export const createComment = async (postId, commentData) => {
  try {
    const response = await api.post(`/api/posts/${postId}/comments`, commentData)
    return response.data
  } catch (error) {
    console.error('Error creating comment:', error)
    throw error
  }
}

export const voteComment = async (commentId, value) => {
  try {
    const response = await api.post(`/api/comments/${commentId}/vote`, { value })
    return response.data
  } catch (error) {
    console.error('Error voting on comment:', error)
    throw error
  }
}

// Communities
export const fetchTopCommunities = async () => {
  try {
    const response = await api.get('/api/communities/top')
    return response.data
  } catch (error) {
    console.error('Error fetching top communities:', error)
    throw error
  }
}

export const fetchCommunityInfo = async (name) => {
  try {
    const response = await api.get(`/api/communities/${name}`)
    return response.data
  } catch (error) {
    console.error('Error fetching community info:', error)
    throw error
  }
}

// User
export const fetchUserProfile = async (username) => {
  try {
    const response = await api.get(`/api/users/${username}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw error
  }
}

export const fetchUserPosts = async (username) => {
  try {
    const response = await api.get(`/api/users/${username}/posts`)
    return response.data
  } catch (error) {
    console.error('Error fetching user posts:', error)
    throw error
  }
}

export default api
