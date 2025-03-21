
import SubmitPostForm from '@/components/post/SubmitPostForm'
import PostRules from '@/components/post/PostRules'

export default function SubmitPage() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-grow">
        <h1 className="text-xl font-bold mb-4">Create a post</h1>
        <SubmitPostForm />
      </div>
      <div className="md:w-80">
        <PostRules />
      </div>
    </div>
  )
}
