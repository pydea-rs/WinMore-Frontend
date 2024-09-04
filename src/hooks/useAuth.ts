import { config } from '@/configs/wagmi.config'
import { useGetNonceMutation, useGetUserInfoQuery } from '@/services/authentication/auth.api'
import { logout } from '@/store/slices/auth/auth.slice'
import { dispatch } from '@/store/store'
import { IWalletError } from '@/types/global.types'
import { deleteCookie, setCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { Connector, useAccount, useDisconnect, useSignMessage } from 'wagmi'

export const useAuth = () => {
  const { isConnected, address } = useAccount({ config: config })
  const { disconnect } = useDisconnect({ config: config })
  const [mutate] = useGetNonceMutation({})
  const { data } = useGetUserInfoQuery({ public_key: address || '' }, { skip: !address })

  const { signMessage } = useSignMessage({
    mutation: {
      onSuccess: () => {
        setCookie('token', data?.data.user.jwt_token)
      },
    },
  })
  const sendAuthSignature = () => {
    mutate({})
      .unwrap()
      .then((res) => signMessage({ message: res.data.nonce }))
  }
  const connectWallet = (connector: Connector) => {
    connector
      .connect()
      .then((res) => {
        toast.success(`${connector.name} Wallet Connected!`)
        sendAuthSignature()
      })
      .catch((error: IWalletError) => {
        toast.error(error.details, { toastId: error.code })
      })
  }

  const logoutAndDisconnect = () => {
    deleteCookie('token')
    dispatch(logout())
    disconnect()
  }

  return { connectWallet, sendAuthSignature, isWalletConnected: isConnected, logoutAndDisconnect }
}
