import { useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import { useEffect } from 'react'
import { useSwitchChain } from 'wagmi'

const ChainProvider: BaseProps = ({ children }) => {
  const network = useSelector((state) => state.currency.network)
  const { chains, switchChain } = useSwitchChain()
  useEffect(() => {
    if (network.chainId && network.chainId !== chains[0].id) {
      switchChain({ chainId: network.chainId })
    }
  }, [chains, network, switchChain])
  return <>{children}</>
}

export default ChainProvider
