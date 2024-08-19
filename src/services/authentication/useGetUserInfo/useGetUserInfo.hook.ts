import getRequest from '@/services/base/get/get-request'
import { BaseResponse } from '@/services/base/request-interface'
import { useGetApiRoutes } from '@/services/base/routes'
import { ErrorResponse } from '@/types/global.types'
import { useMutation } from '@tanstack/react-query'
import { IGetUserInfoPayload, IGetUserInfoResponse } from './useGetUserInfo.types'

export async function GetUserInfo(params: IGetUserInfoPayload) {
  const { auth } = useGetApiRoutes()
  const response = await getRequest<BaseResponse<IGetUserInfoResponse>>({
    url: auth.getUser,
    params,
  })
  return response.data
}

export function useGetUserInfo() {
  return useMutation<BaseResponse<IGetUserInfoResponse>, ErrorResponse, IGetUserInfoPayload>({
    mutationFn: (payload) => GetUserInfo(payload),
  })
}
