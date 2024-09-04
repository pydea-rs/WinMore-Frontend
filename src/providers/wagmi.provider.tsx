import { config } from '@/configs/wagmi.config'
import { BaseProps } from '@/types/global.types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { WagmiProvider } from 'wagmi'

export const Web3Provider: BaseProps = (props) => {
  const { children } = props
  const [query] = useState(() => new QueryClient())
  return (
    <WagmiProvider config={config} reconnectOnMount={true}>
      <QueryClientProvider client={query}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
