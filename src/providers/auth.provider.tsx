import { useAuth } from '@/hooks/useAuth'
import { useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import { getCookie } from 'cookies-next'
import { useEffect } from 'react'

const AuthProvider: BaseProps = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  const { isWalletConnected, sendAuthSignature } = useAuth()
  const token = getCookie('token')

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null // Initialize timeout as null

    if (isWalletConnected && !user && token) {
      timeout = setTimeout(() => {
        sendAuthSignature()
      }, 500)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [isWalletConnected, user])

  return <>{children}</>
}

export default AuthProvider
