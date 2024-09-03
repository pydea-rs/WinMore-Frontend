import { getDefaultConfig } from 'connectkit'
import { createConfig, http } from 'wagmi'
import { polygon } from 'wagmi/chains'

export const config = createConfig(
  getDefaultConfig({
    chains: [
      // mainnet,
      polygon,
    ],
    transports: {
      // [mainnet.id]: http(),
      [polygon.id]: http(),
    },
    ssr: true,
    appName: 'WinMore',
    appDescription: '',
    walletConnectProjectId: process.env.PROJECT_ID || '',
  }),
)
