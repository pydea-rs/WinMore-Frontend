import getRequest from '@/services/base/get/get-request'
import { BaseResponse } from '@/services/base/request-interface'
import { useGetApiRoutes } from '@/services/base/routes'
import { ErrorResponse } from '@/types/global.types'
import { useMutation } from '@tanstack/react-query'
import { IGetNoncePayload, IGetNonceResponse } from './useGetNonce.types'

export async function GetNonce(params: IGetNoncePayload) {
  const { auth } = useGetApiRoutes()
  const response = await getRequest<BaseResponse<IGetNonceResponse>>({
    url: auth.nonce,
  })
  return response.data
}

export const useGetNonce = () => {
  return useMutation<BaseResponse<IGetNonceResponse>, ErrorResponse, IGetNoncePayload>({
    mutationFn: (payload) => GetNonce(payload),
  })
}
