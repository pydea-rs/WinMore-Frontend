import {
  IGetExamPayload,
  IGetExamResponse,
  IGetExamsHook,
  IGetExamsQuery,
} from "./useRegister.types";
import { useGetApiRoutes } from "@/services/base/routes";
import getRequest from "@/services/base/get/get-request";
import { ErrorResponse } from "@/types/global.types";
import { useQuery } from "@tanstack/react-query";
import postRequest from "@/services/base/post/post-request";

export async function GetExam(params: IGetExamPayload) {
  const { example2 } = useGetApiRoutes(params.slug);
  const response = await getRequest<IGetExamResponse>({
    url: example2,
  });
  return response.data;
}

export const useGetExam = (query: IGetExamsHook) => {
  const { options, ...payload } = query;
  return useQuery<
    IGetExamResponse,
    ErrorResponse,
    IGetExamResponse,
    IGetExamsQuery
  >({
    queryKey: ["get-exam", payload],
    queryFn: () => GetExam(payload),
    ...options,
  });
};
