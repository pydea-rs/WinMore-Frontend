import { QueryKey, UseQueryOptions } from '@/types/global.types'

export interface IGetUserInfoPayload {
  public_key: string
}

export interface IGetUserInfoResponse {
  user: {
    email: string
    jwt_token: string
    name: string
    signed: boolean
  }
}

export interface IGetUserInfosHook extends IGetUserInfoPayload, UseQueryOptions {}

export type IGetUserInfosQuery = QueryKey<'get-user-info', IGetUserInfoPayload>
