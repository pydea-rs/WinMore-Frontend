import getRequest from '@/services/base/get/get-request'
import { BaseResponse } from '@/services/base/request-interface'
import { useGetApiRoutes } from '@/services/base/routes'
import { ErrorResponse } from '@/types/global.types'
import { useQuery } from '@tanstack/react-query'
import { IGetNoncePayload, IGetNonceResponse, IGetNoncesHook, IGetNoncesQuery } from './useGetNonce.types'

export async function GetNonce(params: IGetNoncePayload) {
  const { auth } = useGetApiRoutes()
  const response = await getRequest<BaseResponse<IGetNonceResponse>>({
    url: auth.nonce,
  })
  return response.data
}

export const useGetNonce = (query: IGetNoncesHook) => {
  const { options, ...payload } = query
  return useQuery<BaseResponse<IGetNonceResponse>, ErrorResponse, BaseResponse<IGetNonceResponse>, IGetNoncesQuery>({
    queryKey: ['get-nonce', payload],
    queryFn: () => GetNonce(payload),
    ...options,
  })
}
