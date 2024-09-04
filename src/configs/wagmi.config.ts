import { createConfig, http } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [
    // mainnet,
    polygon,
  ],
  transports: {
    // [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [metaMask(), injected({ target: 'phantom' }), injected({ target: 'rabby' })],
  multiInjectedProviderDiscovery: false,
  ssr: true,
})
