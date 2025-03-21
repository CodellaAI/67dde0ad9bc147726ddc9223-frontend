
import SignupForm from '@/components/auth/SignupForm'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <SignupForm />
        <div className="mt-4 text-center text-sm">
          <p>Already have an account? <Link href="/login" className="text-reddit-blue hover:underline">Log In</Link></p>
        </div>
      </div>
    </div>
  )
}
