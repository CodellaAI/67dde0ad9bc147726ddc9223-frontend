
import Link from 'next/link'
import { FaReddit } from 'react-icons/fa'

export default function CommunityHeader({ name }) {
  return (
    <div>
      <div className="h-20 bg-reddit-blue"></div>
      <div className="bg-white px-4 pb-3">
        <div className="flex items-end relative">
          <div className="absolute -top-6 bg-white rounded-full p-1">
            <div className="w-16 h-16 bg-reddit-orange rounded-full flex items-center justify-center text-white">
              <FaReddit className="text-4xl" />
            </div>
          </div>
          <div className="ml-20 flex items-center justify-between flex-grow py-2">
            <div>
              <h1 className="text-xl font-bold">r/{name}</h1>
              <p className="text-sm text-gray-500">r/{name}</p>
            </div>
            <button className="btn-primary">Join</button>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <Link href={`/r/${name}`} className="font-medium text-gray-900 border-b-2 border-reddit-blue pb-2">
            Posts
          </Link>
          <Link href={`/r/${name}/wiki`} className="font-medium text-gray-500 hover:bg-gray-100 pb-2 px-2 rounded">
            Wiki
          </Link>
        </div>
      </div>
    </div>
  )
}
