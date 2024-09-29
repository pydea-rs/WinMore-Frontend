import { config } from '@/configs/wagmi.config'
import { useGetAuthMutation, useGetMessageMutation } from '@/services/authentication/auth.api'
import { logout } from '@/store/slices/auth/auth.slice'
import { useDispatch } from '@/store/store'
import { ISIWEMessage } from '@/types/auth/auth.types'
import { IWalletError } from '@/types/global.types'
import { getDomain } from '@/utils/getDomain.util'
import { deleteCookie, getCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { SiweMessage } from 'siwe'
import { Connector, useAccount, useChainId, useDisconnect, useSignMessage } from 'wagmi'

export const useAuth = () => {
  const { isConnected, address, status } = useAccount({ config: config })
  const chainId = useChainId()
  const token = getCookie('token')
  const { disconnect } = useDisconnect({ config: config })
  const [getMessageMutate] = useGetMessageMutation({})
  const [login] = useGetAuthMutation()
  const dispatch = useDispatch()
  const { signMessageAsync } = useSignMessage()

  const signMessageHandler = (message: ISIWEMessage) => {
    const rawMessage = new SiweMessage({
      address: message.address,
      nonce: message.nonce,
      version: message.version,
      statement: message.statement,
      domain: 'localhost:3000',
      chainId,
      uri: 'localhost:3000',
    })

    const preparedMessage = rawMessage.prepareMessage()
    signMessageAsync({ message: preparedMessage })
      .then((res) => {
        const payload = { message: preparedMessage, signature: res }
        login(payload).catch((err) => toast.error(err.message))
      })
      .catch((err) => {
        toast.error(err.details)
      })
  }

  const sendAuthSignature = async () => {
    if (!address) {
      return
    }
    await getMessageMutate({ address })
      .unwrap()
      .then((res) => {
        signMessageHandler(res.data)
      })
  }

  const connectWallet = async (connector: Connector) => {
    connector
      .connect()
      .then((res) => {
        sendAuthSignature()
      })
      .catch((error: IWalletError) => {
        toast.error(error.details, { toastId: error.code })
      })
  }

  const logoutAndDisconnect = () => {
    const domain = getDomain()
    deleteCookie('token', { domain })
    dispatch(logout())
    disconnect()
    window.location.reload()
  }

  return { connectWallet, sendAuthSignature, isWalletConnected: isConnected, logoutAndDisconnect, token }
}
