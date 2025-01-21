import { UseMutationOptions } from '@tanstack/react-query'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { PropsWithChildren, ReactElement, ReactNode } from 'react'

export interface BaseProps<T = {}> extends React.FC<PropsWithChildren<T>> {}

export interface ErrorResponse extends Response {
  response: {
    data: {
      message: string
    }
  }
}
export type QueryKey<T, Q> = [T] | [T, Q]

export interface MutationOptionHook<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> {
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
}

export interface IBaseQueryOptions {
  enabled?: boolean
}

export interface UseQueryOptions<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> {
  options?: IBaseQueryOptions
}

type NextPageWithLayout = NextPage & {
  layout?: (page: ReactElement) => ReactNode
}
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface IWalletError {
  code: number
  data: unknown
  details: string
  docsPath: unknown
  metaMessages: unknown
  name: string
  shortMessage: string
  version: string
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

export interface IPaginationPayload {
  skip?: number
  take?: number
  sort?: string
  type?: string
  order?: 'asc' | 'desc'
}
