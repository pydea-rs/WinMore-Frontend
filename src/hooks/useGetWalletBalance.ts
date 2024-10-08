import { useSelector } from '@/store/store'
import { useAccount, useBalance } from 'wagmi'

export interface IBalance {
  value: number
  decimals: number
  formattedValue: number
  formattedString: string
  symbol: string
}

const useGetWalletBalance = (): IBalance => {
  const { token, network } = useSelector((state) => state.currency)
  const { address } = useAccount()
  const getBalancePayload = token.isNativeToken
    ? {
        address,
        chainId: network.chainId,
      }
    : {
        address,
        token: token.contractAddress,
        chainId: network.chainId,
      }

  const { data } = useBalance(getBalancePayload)

  if (!data) {
    const emptyBalance: IBalance = { decimals: 0, formattedString: '', formattedValue: 0, symbol: '', value: 0 }
    return emptyBalance
  }

  const { decimals, symbol, value } = data
  const formattedValue = Number(Number(value) / Math.pow(10, decimals))
  const balance: IBalance = {
    value: Number(value),
    formattedValue,
    decimals,
    formattedString: `${formattedValue} ${symbol}`,
    symbol,
  }
  return balance
}

export default useGetWalletBalance
