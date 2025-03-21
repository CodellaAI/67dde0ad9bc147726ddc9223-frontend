
import { notFound } from 'next/navigation'
import UserProfile from '@/components/user/UserProfile'
import UserPosts from '@/components/user/UserPosts'
import UserSidebar from '@/components/user/UserSidebar'

export default async function UserProfilePage({ params }) {
  const { username } = params
  
  // This would normally fetch the user data from the API
  // For now, we'll just return a 404 if the username isn't valid
  if (!username || username.length < 3) {
    return notFound()
  }
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-grow">
        <UserProfile username={username} />
        <div className="mb-4 bg-white p-3 rounded-md shadow-sm">
          <div className="flex space-x-4 border-b pb-3">
            <button className="font-semibold text-reddit-blue border-b-2 border-reddit-blue pb-1">
              Posts
            </button>
            <button className="font-medium text-gray-500 hover:bg-gray-100 pb-1 px-2 rounded">
              Comments
            </button>
          </div>
        </div>
        <UserPosts username={username} />
      </div>
      <div className="md:w-80">
        <UserSidebar username={username} />
      </div>
    </div>
  )
}
