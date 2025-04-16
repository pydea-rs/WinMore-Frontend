import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { PropsWithChildren, ReactElement, ReactNode } from 'react'

export interface BaseProps<T = {}> extends React.FC<PropsWithChildren<T>> {}

type NextPageWithLayout = NextPage & {
  layout?: (page: ReactElement) => ReactNode
}
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type TType = { id: number; name: string; icon?: string }

export type IAddress = `0x${string}`

export type IAvailableTokens = 'USDC' | 'USDT' | 'WUSDC' | 'MATIC' | 'ETH'

export type Nullable<T> = T | null

export type INetwork = {
  chainId: number
  name: string
  rpcUrl: string
  icon: string
  tokens: IToken[]
}
export type IToken = {
  id: number
  symbol: IAvailableTokens
  name: string
  contractAddress: IAddress
  icon: string
  isNativeToken: boolean
  balance: number
}
