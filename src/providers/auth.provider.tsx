import { Spinner } from '@/components/common/spinner/spinner'
import { useAuth } from '@/hooks/useAuth'
import { useGetUserInfoQuery } from '@/services/user/user.service'
import { BaseProps } from '@/types/global.types'
import { Fragment, useEffect } from 'react'

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

  return (
    <Fragment>
      {isWalletConnected && !token ? (
        <div className="flex justify-center items-center h-[100vh] w-screen flex-col">
          <Spinner />
          Waiting for sign
        </div>
      ) : (
        children
      )}
    </Fragment>
  )
}

export default AuthProvider
