import { useAuth } from '@/hooks/useAuth'
import { useGetUserInfoQuery } from '@/services/user/user.api'
import { BaseProps } from '@/types/global.types'
import { useEffect } from 'react'

const AuthProvider: BaseProps = ({ children }) => {
  const { isWalletConnected, sendAuthSignature, token } = useAuth()

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null // Initialize timeout as null

    if (isWalletConnected && !token) {
      timeout = setTimeout(() => {
        sendAuthSignature()
      }, 500)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [isWalletConnected, token])

  const { data } = useGetUserInfoQuery({}, { skip: !token })

  return <>{children}</>
}

export default AuthProvider
