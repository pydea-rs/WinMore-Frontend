import { config } from '@/configs/wagmi.config'
// import theme from "@/styles/wallet/theme.json";
import { BaseProps } from '@/types/global.types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ConnectKitProvider } from "connectkit";
import { WagmiProvider } from 'wagmi'
const queryClient = new QueryClient()

export const Web3Provider: BaseProps = (props) => {
  const { children } = props

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <ConnectKitProvider theme="rounded" customTheme={theme}> */}
        {children}
        {/* </ConnectKitProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
