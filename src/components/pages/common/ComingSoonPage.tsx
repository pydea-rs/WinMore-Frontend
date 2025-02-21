import { FaHourglassHalf } from 'react-icons/fa'

const ComingSoonPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center animate-pulse max-w-md w-full">
        <FaHourglassHalf className="text-yellow-400 mx-auto text-6xl mb-4 animate-spin" />
        <h1 className="text-4xl font-bold mb-2">Coming Soon...</h1>
        <p className="text-lg text-gray-400 mb-6">We&apos;re working hard to bring you something amazing. Stay tuned!</p>
      </div>
    </div>
  )
}

export default ComingSoonPage
