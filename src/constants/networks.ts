// import { INetwork } from '@/types/global.types'

// export const networks: INetwork[] = [
//   {
//     chainId: 137, // Polygon Mainnet Chain ID
//     name: 'Polygon Mainnet',
//     rpcUrl: 'https://rpc-mainnet.maticvigil.com', // Mainnet RPC URL
//     icon: '/assets/images/chains/Polygon Mainnet.png',
//     tokens: [
//       {
//         id: 0,
//         symbol: 'MATIC',
//         name: 'Polygon Matic',
//         contractAddress: '0x$', // Native tokens do not have a contract address
//         icon: '/assets/images/tokens/MATIC.png',
//         isNativeToken: true,
//         balance: 0,
//       },
//       {
//         id: 1,
//         symbol: 'USDT',
//         name: 'Tether USD',
//         contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT on Polygon mainnet
//         icon: '/assets/images/tokens/USDT.png',
//         isNativeToken: false,
//         balance: 0,
//       },
//       {
//         id: 2,
//         symbol: 'USDC',
//         name: 'USD Coin',
//         contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // USDC on Polygon mainnet
//         icon: '/assets/images/tokens/USDC.png',
//         isNativeToken: false,
//         balance: 0,
//       },
//     ],
//   },
//   {
//     chainId: 11155111, // Sepolia Testnet Chain ID
//     name: 'Sepolia',
//     rpcUrl: 'https://rough-aged-valley.ethereum-sepolia.quiknode.pro/7854d3f5a76f771a510ba06ed1a95a58f1416ee5', // Replace with your actual Infura project ID
//     icon: '/assets/images/chains/Sepolia.png',
//     tokens: [
//       {
//         id: 1,
//         symbol: 'WUSDC',
//         name: 'Winmore USD',
//         contractAddress: '0x9dfb350c3253386de5e2fec4dcb959b18f6ee2a1', // Native token for Sepolia testnet
//         icon: '/assets/images/tokens/WUSDC.png',
//         isNativeToken: false,
//         balance: 0,
//       },
//       {
//         id: 0,
//         symbol: 'ETH',
//         name: 'Sepolia Ether',
//         contractAddress: '0x$', // Native token for Sepolia testnet
//         icon: '/assets/images/tokens/ETH.png',
//         isNativeToken: true,
//         balance: 0,
//       },
//     ],
//   },
// ]

import { INetwork } from '@/types/global.types'

export const networks: INetwork[] = [
  // {
  //   chainId: 11155111, // Sepolia Testnet Chain ID
  //   name: 'Sepolia',
  //   rpcUrl: 'https://rough-aged-valley.ethereum-sepolia.quiknode.pro/7854d3f5a76f771a510ba06ed1a95a58f1416ee5', // Replace with your actual Infura project ID
  //   icon: '/assets/images/chains/Sepolia.png',
  //   tokens: [
  //     {
  //       id: 1,
  //       symbol: 'WUSDC',
  //       name: 'Winmore USD',
  //       contractAddress: '0x9dfb350c3253386de5e2fec4dcb959b18f6ee2a1', // Native token for Sepolia testnet
  //       icon: '/assets/images/tokens/WUSDC.png',
  //       isNativeToken: false,
  //       balance: 0,
  //     },
  //     {
  //       id: 0,
  //       symbol: 'ETH',
  //       name: 'Sepolia Ether',
  //       contractAddress: '0x$', // Native token for Sepolia testnet
  //       icon: '/assets/images/tokens/ETH.png',
  //       isNativeToken: true,
  //       balance: 0,
  //     },
  //   ],
  // },
  {
    chainId: 137, // Polygon Mainnet Chain ID
    name: 'Polygon Mainnet',
    rpcUrl: 'https://rpc-mainnet.maticvigil.com', // Mainnet RPC URL
    icon: '/assets/images/chains/Polygon Mainnet.png',
    tokens: [
      {
        id: 1,
        symbol: 'USDT',
        name: 'Tether USD',
        contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT on Polygon mainnet
        icon: '/assets/images/tokens/USDT.png',
        isNativeToken: false,
        balance: 0,
      },
      {
        id: 2,
        symbol: 'USDC',
        name: 'USD Coin',
        contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // USDC on Polygon mainnet
        icon: '/assets/images/tokens/USDC.png',
        isNativeToken: false,
        balance: 0,
      },
    ],
  },
  {
    chainId: 8453, // Base Mainnet Chain ID
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org', // RPC URL for Base Mainnet
    icon: '/assets/images/chains/BASE.png',
    tokens: [
      {
        id: 1,
        symbol: 'USDT',
        name: 'Tether USD',
        contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT on Polygon mainnet
        icon: '/assets/images/tokens/USDT.png',
        isNativeToken: false,
        balance: 0,
      },
      {
        id: 2,
        symbol: 'USDC',
        name: 'USD Coin',
        contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // USDC on Polygon mainnet
        icon: '/assets/images/tokens/USDC.png',
        isNativeToken: false,
        balance: 0,
      },
    ],
  },
  {
    chainId: 1, // Ethereum Mainnet Chain ID
    name: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID', // Replace with your Infura project ID
    icon: '/assets/images/chains/ETH.png',
    tokens: [
      {
        id: 1,
        symbol: 'USDT',
        name: 'Tether USD',
        contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT on Polygon mainnet
        icon: '/assets/images/tokens/USDT.png',
        isNativeToken: false,
        balance: 0,
      },
      {
        id: 2,
        symbol: 'USDC',
        name: 'USD Coin',
        contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // USDC on Polygon mainnet
        icon: '/assets/images/tokens/USDC.png',
        isNativeToken: false,
        balance: 0,
      },
    ],
  },
  {
    chainId: 42161, // Arbitrum One Chain ID
    name: 'Arbitrum One',
    rpcUrl: 'https://arb1.arbitrum.io/rpc', // RPC URL for Arbitrum One
    icon: '/assets/images/chains/ARB.png',
    tokens: [
      {
        id: 1,
        symbol: 'USDT',
        name: 'Tether USD',
        contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT on Polygon mainnet
        icon: '/assets/images/tokens/USDT.png',
        isNativeToken: false,
        balance: 0,
      },
      {
        id: 2,
        symbol: 'USDC',
        name: 'USD Coin',
        contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // USDC on Polygon mainnet
        icon: '/assets/images/tokens/USDC.png',
        isNativeToken: false,
        balance: 0,
      },
    ],
  },
  {
    chainId: 10, // Optimism Mainnet Chain ID
    name: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io', // RPC URL for Optimism
    icon: '/assets/images/chains/OPT.png',
    tokens: [
      {
        id: 1,
        symbol: 'USDT',
        name: 'Tether USD',
        contractAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT on Polygon mainnet
        icon: '/assets/images/tokens/USDT.png',
        isNativeToken: false,
        balance: 0,
      },
      {
        id: 2,
        symbol: 'USDC',
        name: 'USD Coin',
        contractAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // USDC on Polygon mainnet
        icon: '/assets/images/tokens/USDC.png',
        isNativeToken: false,
        balance: 0,
      },
    ],
  },
]
