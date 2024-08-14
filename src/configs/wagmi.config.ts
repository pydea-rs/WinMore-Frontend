import { getDefaultConfig } from 'connectkit'
import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'

export const config = createConfig(
  getDefaultConfig({
    chains: [
      // mainnet,
      sepolia,
    ],
    transports: {
      // [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
    ssr: true, // If your dApp uses server side rendering (SSR)
    // connectors,
    appName: 'WinMore',
    appDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, rerum ut? Ullam aspernatur beatae, aut quo excepturi quae, perspiciatis consectetur itaque suscipit culpa distinctio esse atque et impedit accusamus ea.',
    walletConnectProjectId: process.env.PROJECT_ID || '',
  }),
)
