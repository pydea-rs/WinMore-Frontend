export interface IGetNoncePayload {}

export interface IGetNonceResponse {
  nonce: string
}
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
