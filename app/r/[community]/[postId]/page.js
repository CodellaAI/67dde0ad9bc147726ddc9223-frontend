
import { notFound } from 'next/navigation'
import PostDetail from '@/components/post/PostDetail'
import CommentSection from '@/components/comment/CommentSection'
import CommunityAbout from '@/components/community/CommunityAbout'

export default async function PostPage({ params }) {
  const { community, postId } = params
  
  // This would normally fetch the post data from the API
  // For now, we'll just return a 404 if the post ID isn't valid
  if (!postId || isNaN(Number(postId))) {
    return notFound()
  }
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-grow">
        <PostDetail community={community} postId={postId} />
        <CommentSection postId={postId} />
      </div>
      <div className="md:w-80">
        <CommunityAbout name={community} />
      </div>
    </div>
  )
}
