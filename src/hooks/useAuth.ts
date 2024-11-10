import { config } from '@/configs/wagmi.config'
import { useGetAuthMutation, useGetMessageMutation } from '@/services/authentication/auth.service'
import { logout } from '@/store/slices/auth/auth.slice'
import { updateCurrentTokenBalance } from '@/store/slices/currency/currency.slice'
import { useDispatch } from '@/store/store'
import { ISIWEMessage } from '@/types/auth/auth.types'
import { IWalletError } from '@/types/global.types'
import { getDomain } from '@/utils/getDomain.util'
import { getHostName } from '@/utils/getHostname.utils'
import { deleteCookie, getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { SiweMessage } from 'siwe'
import { Connector, useAccount, useChainId, useDisconnect, useSignMessage } from 'wagmi'

export const useAuth = () => {
  const { isConnected, address } = useAccount({ config: config })
  const chainId = useChainId()
  const token = getCookie('token')
  const { disconnect } = useDisconnect({ config: config })
  const [getMessageMutate, { isLoading: isMessageLoading }] = useGetMessageMutation({})
  const [login, { isLoading: isLoginLoading }] = useGetAuthMutation()
  const dispatch = useDispatch()
  const [isPendingForSign, setIsPendingForSign] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState<boolean>(isConnected && !!token)
  const { signMessageAsync } = useSignMessage({
    mutation: {
      onMutate: () => {
        setIsPendingForSign(true)
      },
      onSuccess: () => {
        setIsPendingForSign(false)
      },
      onError: () => {
        setIsPendingForSign(false)
      },
    },
  })
  const signMessageHandler = (message: ISIWEMessage) => {
    const domain = getHostName()

    if (!domain) {
      console.error('Domain is undefined')
      toast.error('Domain is undefined')
      return
    }

    const protocol = 'https://' // Assuming you're using HTTPS
    const fullDomain = `${protocol}${domain}`

    const rawMessage = new SiweMessage({
      address: message.address,
      nonce: message.nonce,
      version: message.version,
      statement: message.statement,
      domain: process.env.NODE_ENV === 'development' ? `${domain}:3000` : fullDomain,
      chainId,
      uri: process.env.NODE_ENV === 'development' ? `${domain}:3000` : fullDomain,
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
    dispatch(updateCurrentTokenBalance(0))
    dispatch(logout())
    disconnect()
    // window.location.reload()
  }
  useEffect(() => {
    if (isConnected && !!token) {
      setIsAuthorized(true)
    }

    return () => {}
  }, [token, isConnected])

  return { connectWallet, sendAuthSignature, isWalletConnected: isConnected, logoutAndDisconnect, token, isPendingForSign, isMessageLoading, isLoginLoading, isAuthorized }
}
