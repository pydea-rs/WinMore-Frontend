import { useGetUserInfo } from '@/services/authentication/useGetUserInfo/useGetUserInfo.hook'
import { login } from '@/store/slices/auth/auth.slice'
import { useDispatch, useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import { useEffect } from 'react'
import { useWalletClient } from 'wagmi'

const AuthProvider: BaseProps = (props) => {
  const { children } = props
  const userState = useSelector((state) => state.auth.user)
  const { data: walletClient } = useWalletClient()
  const { data: userInfo, mutateAsync: getUserMutate } = useGetUserInfo()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(walletClient, userState)

    if (walletClient && !userState) {
      const pubkey = walletClient.account.address
      getUserMutate({ public_key: pubkey }).then((data) => {
        dispatch(login({ user: { ...data.data.user, public_key: pubkey } }))
      })
    }
  }, [walletClient])

  return <>{children}</>
}

export default AuthProvider
