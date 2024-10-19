import { useAuth } from '@/hooks/useAuth'
import { useGetUserCurrentBalanceQuery } from '@/services/user/user.service'
import { useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import { useEffect } from 'react'
import { useSwitchChain } from 'wagmi'

const ChainProvider: BaseProps = ({ children }) => {
  const { network, token } = useSelector((state) => state.currency)
  const { chains, switchChain } = useSwitchChain()
  const { isAuthorized } = useAuth()
  const { refetch, data } = useGetUserCurrentBalanceQuery({ chain: network.chainId, token: token.symbol }, { skip: !isAuthorized })
  useEffect(() => {
    if (network.chainId && network.chainId !== chains[0].id) {
      switchChain({ chainId: network.chainId })
    }
  }, [chains, network, switchChain])

  useEffect(() => {
    if (data) {
      refetch()
    }
    return () => {}
  }, [token])

  return <>{children}</>
}

export default ChainProvider
