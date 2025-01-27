import { config } from '@/configs/wagmi.config'
import { useGetAuthMutation, useGetMessageMutation } from '@/services/authentication/auth.service'
import { logout } from '@/store/slices/auth/auth.slice'
import { setWalletConnectorName, updateCurrentTokenBalance } from '@/store/slices/currency/currency.slice'
import { useDispatch } from '@/store/store'
import { ISIWEMessage } from '@/types/auth/auth.types'
import { getHostName } from '@/utils/getHostname.utils'
import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { SiweMessage } from 'siwe'
import { Connector, useAccount, useChainId, useDisconnect, useSignMessage } from 'wagmi'

export const useAuth = () => {
  const router = useRouter()
  const { isConnected, address } = useAccount({ config })
  const chainId = useChainId()

  const token = getCookie('token')

  const { disconnect } = useDisconnect({ config: config })
  const [getMessageMutate, { isLoading: isMessageLoading }] = useGetMessageMutation({})
  const [login, { isLoading: isLoginLoading }] = useGetAuthMutation()
  const dispatch = useDispatch()
  const [isPendingForSign, setIsPendingForSign] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState<boolean>(Boolean(token))
  const { signMessageAsync } = useSignMessage({
    mutation: {
      onMutate: () => {
        console.log('onMutate')
        setIsPendingForSign(true)
      },
      onSuccess: () => {
        console.log('onSuccess')
        setIsPendingForSign(false)
      },
      onError: (err) => {
        console.log(err)
        setIsPendingForSign(false)
      },
    },
  })
  const signMessageHandler = async (message: ISIWEMessage) => {
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
    try {
      const res = await signMessageAsync({ account: address, message: preparedMessage })
      const payload = { message: preparedMessage, signature: res }
      await login(payload)
    } catch (err) {
      toast.error((err as any)['details'] || (err as string))
    }
  }

  const sendAuthSignature = async () => {
    if (!address) {
      return
    }
    await getMessageMutate({ address })
      .unwrap()
      .then(async (res) => {
        console.log(res)
        await signMessageHandler(res.data)
      })
  }

  const connectWallet = async (connector: Connector) => {
    connector
      .connect()
      .then(async (res) => {
        await sendAuthSignature()
        dispatch(setWalletConnectorName(connector.name))
      })
      .catch((error) => {
        toast.error(error.details, { toastId: error.code })
      })
  }

  const logoutAndDisconnect = () => {
    // const domain = getHostName()
    deleteCookie('token')
    localStorage.clear()
    dispatch(updateCurrentTokenBalance(0))
    dispatch(logout())
    disconnect()
    setIsAuthorized(false)
    router.reload()
  }
  useEffect(() => {
    if (isConnected && !!token) {
      setIsAuthorized(true)
    }

    return () => {}
  }, [token, isConnected])

  return { connectWallet, sendAuthSignature, isWalletConnected: isConnected, logoutAndDisconnect, token, isPendingForSign, isMessageLoading, isLoginLoading, isAuthorized }
}
