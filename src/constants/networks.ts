import { INetwork } from '@/types/global.types'

export const networks: INetwork[] = [
  // {
  //   chainId: 137, // Polygon Mainnet Chain ID
  //   name: 'Polygon Mainnet',
  //   rpcUrl: 'https://rpc-mainnet.maticvigil.com', // Mainnet RPC URL
  //   icon: '/assets/images/chains/Polygon Mainnet.png',
  //   tokens: [
  //     {
  //       id: 0,
  //       symbol: 'MATIC',
  //       name: 'Polygon Matic',
  //       contractAddress: '0x$', // Native tokens do not have a contract address
  //       icon: '/assets/images/tokens/MATIC.png',
  //       isNativeToken: true,
  //       balance: 0,
  //     },
  //     {
  //       id: 1,
  //       symbol: 'USDT',
  //       name: 'Tether USD',
  //       contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT on Polygon mainnet
  //       icon: '/assets/images/tokens/USDT.png',
  //       isNativeToken: false,
  //       balance: 0,
  //     },
  //     {
  //       id: 2,
  //       symbol: 'USDC',
  //       name: 'USD Coin',
  //       contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // USDC on Polygon mainnet
  //       icon: '/assets/images/tokens/USDC.png',
  //       isNativeToken: false,
  //       balance: 0,
  //     },
  //   ],
  // },
  {
    chainId: 11155111, // Sepolia Testnet Chain ID
    name: 'Sepolia',
    rpcUrl: 'https://rpc2.sepolia.org', // Replace with your actual Infura project ID
    icon: '/assets/images/chains/Sepolia.png',
    tokens: [
      {
        id: 1,
        symbol: 'WUSDC',
        name: 'Winmore USD',
        contractAddress: '0x9dfb350c3253386de5e2fec4dcb959b18f6ee2a1', // Native token for Sepolia testnet
        icon: '/assets/images/tokens/WUSDC.png',
        isNativeToken: false,
        balance: 0,
      },
      {
        id: 0,
        symbol: 'ETH',
        name: 'Sepolia Ether',
        contractAddress: '0x$', // Native token for Sepolia testnet
        icon: '/assets/images/tokens/ETH.png',
        isNativeToken: true,
        balance: 0,
      },
    ],
  },
]
