import { INetwork } from '@/types/global.types'

export const networks: INetwork[] = [
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
    // rpcUrl: 'https://mainnet.base.org', // RPC URL for Base Mainnet
    rpcUrl: 'https://rpc.ankr.com/base',
    icon: '/assets/images/chains/BASE.png',
    tokens: [
      {
        id: 1,
        symbol: 'USDT',
        name: 'Tether USD',
        contractAddress: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
        icon: '/assets/images/tokens/USDT.png',
        isNativeToken: false,
        balance: 0,
      },
      {
        id: 2,
        symbol: 'USDC',
        name: 'USD Coin',
        contractAddress: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
        icon: '/assets/images/tokens/USDC.png',
        isNativeToken: false,
        balance: 0,
      },
    ],
  },
  {
    chainId: 10143, // Ethereum Mainnet Chain ID
    name: 'Monad Testnet',
    rpcUrl: 'https://testnet-rpc.monad.xyz/', // Replace with your Infura project ID
    icon: '/assets/images/chains/Monad Testnet.jpeg',
    tokens: [
      {
        id: 1,
        symbol: 'USDT',
        name: 'Tether USD',
        contractAddress: '0x88b8E2161DEDC77EF4ab7585569D2415a1C1055D',
        icon: '/assets/images/tokens/USDT.png',
        isNativeToken: false,
        balance: 0,
      },
      {
        id: 2,
        symbol: 'USDC',
        name: 'USD Coin',
        contractAddress: '0xf817257fed379853cDe0fa4F97AB987181B1E5Ea',
        icon: '/assets/images/tokens/USDC.png',
        isNativeToken: false,
        balance: 0,
      },
    ],
  },
] // FIXME: UPDATE THIS TO FETCH FROM SERVER

export const secondaryNetworks: INetwork[] = [
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
  {
    chainId: 11155111, // Sepolia Testnet Chain ID
    name: 'Sepolia',
    rpcUrl: 'https://rough-aged-valley.ethereum-sepolia.quiknode.pro/7854d3f5a76f771a510ba06ed1a95a58f1416ee5', // Replace with your actual Infura project ID
    icon: '/assets/images/chains/Sepolia.png',
    tokens: [
      {
        id: 1,
        symbol: 'WUSDC',
        name: 'Winmore USD',
        contractAddress: '0x9dfb350c3253386de5e2fec4dcb959b18f6ee2a1',
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
