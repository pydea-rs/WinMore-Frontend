import { config } from '@/configs/wagmi.config'
import { useGetNonce } from '@/services/authentication/useGetNounce/useGetNonce.hook'
import { useGetUserInfo } from '@/services/authentication/useGetUserInfo/useGetUserInfo.hook'
import { login, logout } from '@/store/slices/auth/auth.slice'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { dispatch, useSelector } from '@/store/store'
import { IWalletError } from '@/types/global.types'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Connector, useAccount, useDisconnect, useSignMessage } from 'wagmi'

export const useAuth = () => {
  const user = useSelector((state) => state.auth)
  const { isConnected, address } = useAccount({ config: config })
  const { disconnect } = useDisconnect({ config: config })
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const { mutateAsync: getNonceMutate } = useGetNonce()
  const { mutateAsync: getUserInfoMutate } = useGetUserInfo()
  const jwt_token = getCookie('token')

  const getProfileHandler = useCallback(() => {
    if (address) {
      const public_key = address
      getUserInfoMutate({ public_key })
        .then((res) => {
          setCookie('token', res.data.user.jwt_token)
          dispatch(login({ user: { ...res.data.user, public_key } }))
          dispatch(triggerModal({ modal: 'login', trigger: false }))
        })
        .catch((error) => {})
    }
  }, [address])

  const { signMessage } = useSignMessage({
    mutation: {
      onSuccess: (data) => {
        getProfileHandler()
      },
    },
  })

  const connectWallet = (connector: Connector) => {
    connector
      .connect()
      .then((res) => {
        toast.success(`${connector.name} Wallet Connected!`)
        getNonceMutate({})
          .then((res) => {
            signMessage({ message: res.data.nonce })
          })
          .catch((error) => {})
      })
      .catch((error: IWalletError) => {
        toast.error(error.details, { toastId: error.code })
      })
  }

  const sendAuthSignature = () => {
    getNonceMutate({})
      .then((res) => {
        signMessage({ message: res.data.nonce })
      })
      .catch((error) => {})
  }

  const logoutAndDisconnect = () => {
    deleteCookie('token')
    dispatch(logout())
    disconnect()
  }

  useEffect(() => {
    if (isConnected && user) {
      setIsAuthenticated(true)
    }
    return () => {}
  }, [isConnected, user])

  return { connectWallet, sendAuthSignature, isWalletConnected: isConnected, isAuthenticated, logoutAndDisconnect }
}
