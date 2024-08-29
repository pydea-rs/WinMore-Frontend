import { QueryKey, UseQueryOptions } from '@/types/global.types'

export interface IGetNoncePayload {}

export interface IGetNonceResponse {
  nonce: string
}

export interface IGetNoncesHook extends IGetNoncePayload, UseQueryOptions {}

export type IGetNoncesQuery = QueryKey<'get-nonce', IGetNoncePayload>
