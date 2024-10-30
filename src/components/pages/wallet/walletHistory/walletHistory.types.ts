import { IUserTransactionHistoryResponse } from '@/services/user/user.service.types'

export interface WalletHistoryProps {
  data: IUserTransactionHistoryResponse | undefined
}
