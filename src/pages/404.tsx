import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white animate-fadeIn">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-400 mb-6">The page you are looking for does not exist.</p>
      <Link href="/" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition transform hover:scale-105">
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFoundPage
