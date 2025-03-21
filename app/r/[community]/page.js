
import { notFound } from 'next/navigation'
import PostFeed from '@/components/post/PostFeed'
import CommunityHeader from '@/components/community/CommunityHeader'
import CommunityAbout from '@/components/community/CommunityAbout'
import CreatePostCard from '@/components/post/CreatePostCard'

export default async function CommunityPage({ params }) {
  const { community } = params
  
  // This would normally fetch the community data from the API
  // For now, we'll just check if the community exists in a predefined list
  const validCommunities = ['programming', 'nextjs', 'webdev', 'react', 'javascript']
  
  if (!validCommunities.includes(community)) {
    return notFound()
  }
  
  return (
    <div className="space-y-4">
      <CommunityHeader name={community} />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-grow">
          <CreatePostCard community={community} />
          <div className="mb-4 bg-white p-3 rounded-md shadow-sm">
            <div className="flex space-x-4 border-b pb-3">
              <button className="font-semibold text-reddit-blue border-b-2 border-reddit-blue pb-1">
                Hot
              </button>
              <button className="font-medium text-gray-500 hover:bg-gray-100 pb-1 px-2 rounded">
                New
              </button>
              <button className="font-medium text-gray-500 hover:bg-gray-100 pb-1 px-2 rounded">
                Top
              </button>
            </div>
          </div>
          <PostFeed community={community} />
        </div>
        <div className="md:w-80">
          <CommunityAbout name={community} />
        </div>
      </div>
    </div>
  )
}
