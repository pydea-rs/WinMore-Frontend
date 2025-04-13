import { useGetUserTokenBalanceMutation } from '@/services/user/user.service'
import { useSelector } from '@/store/store'

const useWalletStateHelper = () => {
  const [refetchBalance, {}] = useGetUserTokenBalanceMutation()
  const { currentTokenBalance, network, token } = useSelector((state) => state.currency)

  return {
    fetchBalance: () => refetchBalance({ chain: network.chainId, token: token.symbol }),
    currentToken: { ...token, balance: currentTokenBalance, chain: network.chainId },
  }
}

export default useWalletStateHelper
