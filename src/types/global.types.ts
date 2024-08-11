import { UseMutationOptions } from '@tanstack/react-query'
import { ReactElement, ReactNode } from 'react'

export interface IBaseProps {
  children: ReactNode | ReactElement[]
}

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
