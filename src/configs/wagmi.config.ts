import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains' // Import polygonMumbai for Devnet
import { injected, metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [
    // polygon,
    sepolia,
  ], // Include both mainnet and devnet
  transports: {
    // [polygon.id]: http(),
    [sepolia.id]: http('https://rough-aged-valley.ethereum-sepolia.quiknode.pro/7854d3f5a76f771a510ba06ed1a95a58f1416ee5'),
  },
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'winmore',
      },
    }),
    injected({ target: 'phantom' }),
    injected({ target: 'rabby' }),
  ],
  multiInjectedProviderDiscovery: false,
  ssr: true,
})
