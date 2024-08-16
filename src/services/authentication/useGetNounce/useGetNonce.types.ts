import { HookOptions, QueryKey } from '@/types/global.types'

export interface IGetNoncePayload {}

export interface IGetNonceResponse {
  nonce: string
}

export interface IGetNoncesHook extends IGetNoncePayload, HookOptions {}

export type IGetNoncesQuery = QueryKey<'get-nonce', IGetNoncePayload>
