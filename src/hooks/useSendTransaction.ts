import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch } from '@/store/store'
import { IAddress } from '@/types/global.types'
import { toast } from 'react-toastify'
import { useSendTransaction as useWAGMITransaction } from 'wagmi'

interface ISendTransactionPayload {
  amount: string // Amount in human-readable format (e.g., "0.1")
  decimals: number
  to?: IAddress // Recipient address
}

const useSendWalletTransaction = () => {
  const { sendTransactionAsync: WagmiSendTransaction } = useWAGMITransaction()
  const dispatch = useDispatch()
  const sendTransaction = async (params: ISendTransactionPayload) => {
    const { amount, to, decimals } = params

    const amountBigInt = BigInt(Math.floor(Number(amount) * Math.pow(10, decimals)))

    // Send the transaction with the converted amount
    return await WagmiSendTransaction({
      value: amountBigInt, // BigInt value for the amount
      to, // Using the address from IAddress interface
    })
      .then((res) => {
        toast.success(`Deposit Successful:
          ${res}`)
        dispatch(triggerModal({ modal: 'deposit', trigger: false }))
      })
      .catch((err) => toast.error(err.message))
  }

  return {
    sendTransaction,
  }
}

export default useSendWalletTransaction
