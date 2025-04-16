export interface IEmptyPayload {}

export interface IEndpointWithIdParamPayload {
  id: number
}

export interface IPaginationPayload {
  skip?: number
  take?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface IVoidResponse {}
