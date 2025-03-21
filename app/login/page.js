
import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
        <LoginForm />
        <div className="mt-4 text-center text-sm">
          <p>New to Reddit Clone? <Link href="/signup" className="text-reddit-blue hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}
