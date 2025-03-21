
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import AuthProvider from '@/context/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Reddit Clone',
  description: 'A modern Reddit clone built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-reddit-mediumgray min-h-screen`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-4 max-w-6xl">
              {children}
            </main>
            <footer className="bg-white py-4 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Reddit Clone - Created for educational purposes
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
