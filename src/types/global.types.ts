import { UseMutationOptions } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

export interface BaseProps<T = {}> extends React.FC<PropsWithChildren<T>> {}

export interface HookOptions {
  options?: object
}

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
