
import PostFeed from '@/components/post/PostFeed'
import CommunityList from '@/components/community/CommunityList'
import CreatePostCard from '@/components/post/CreatePostCard'

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-grow">
        <CreatePostCard />
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
        <PostFeed />
      </div>
      <div className="md:w-80 space-y-4">
        <div className="bg-white rounded-md shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">About Reddit Clone</h2>
          <p className="text-sm text-gray-600 mb-4">
            Reddit Clone is a place for communities. Join your favorite communities and explore new ones.
          </p>
          <button className="btn-primary w-full">Create Post</button>
          <button className="btn-secondary w-full mt-2">Create Community</button>
        </div>
        <CommunityList />
      </div>
    </div>
  )
}
