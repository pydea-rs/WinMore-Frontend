import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch } from '@/store/store'
import Link from 'next/link'
import { FaLock } from 'react-icons/fa'

const LoginRequiredPage = () => {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white animate-fadeIn">
      <FaLock className="text-yellow-500 text-6xl mb-4 animate-bounce " />
      <h1 className="text-4xl font-bold mb-2">Access Restricted</h1>
      <p className="text-lg text-gray-400 mb-6">You must log in first to access this page.</p>
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(triggerModal({ modal: 'login', trigger: true }))}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition transform hover:scale-105"
        >
          Login
        </button>
        <Link href="/" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition transform hover:scale-105">
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default LoginRequiredPage
