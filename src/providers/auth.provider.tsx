import { Spinner } from '@/components/common/spinner/spinner'
import { useAuth } from '@/hooks/useAuth'
import { useGetUserInfoQuery } from '@/services/user/user.service'
import { useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import { Fragment, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'

const AuthProvider: BaseProps = ({ children }) => {
  const { isWalletConnected, sendAuthSignature, token, isAuthorized, connectWallet } = useAuth()
  const { address } = useAccount()
  const { user } = useSelector((state) => state.auth)
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

  useEffect(() => {
    if (isWalletConnected) {
      if (address && user && user.wallet !== address) {
        sendAuthSignature()
      }
    } else {
      toast.error('wallet is not connected')
    }

    return () => {}
  }, [address])

  const { data } = useGetUserInfoQuery({}, { skip: !isAuthorized })

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
