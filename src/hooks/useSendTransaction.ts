import TransactionMessage from '@/components/common/transactionMessage/transactionMessage'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import { IAddress } from '@/types/global.types'
import { toast } from 'react-toastify'
import { useWriteContract } from 'wagmi'

interface ISendTransactionPayload {
  amount: string // Amount in human-readable format (e.g., "0.1")
  decimals: number
  to: IAddress // Recipient address
}

// const useSendWalletTransaction = () => {
//   const { sendTransactionAsync: WagmiSendTransaction } = useWAGMITransaction()
//   const dispatch = useDispatch()
//   const sendTransaction = async (params: ISendTransactionPayload) => {
//     const { amount, to, decimals } = params

//     // const amountBigInt = BigInt(Math.floor(Number(amount) * Math.pow(10, decimals)))
//     const amountBigInt = BigInt(amount)

//     // Send the transaction with the converted amount
//     return await WagmiSendTransaction({
//       value: amountBigInt, // BigInt value for the amount
//       to, // Using the address from IAddress interface
//     })
//       .then((res) => {
//         console.log(res)
//         toast.success(`Deposit Successful:
//           ${res}`)
//         dispatch(triggerModal({ modal: 'deposit', trigger: false }))
//       })
//       .catch((err) => toast.error(err.message))
//   }

//   return {
//     sendTransaction,
//   }
// }

const useSendWalletTransaction = () => {
  const { contractAddress } = useSelector((state) => state.currency.token)
  const { writeContractAsync: sendTokenTransaction } = useWriteContract()

  const dispatch = useDispatch()

  const sendTransaction = async (params: ISendTransactionPayload) => {
    const { amount, to, decimals } = params

    // Convert human-readable amount to BigInt with token decimals
    const amountBigInt = BigInt(Math.floor(Number(amount) * 10 ** decimals))

    try {
      const transaction = await sendTokenTransaction({
        args: [to, amountBigInt],
        address: contractAddress,
        abi: [
          {
            name: 'transfer',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'recipient', type: 'address' },
              { name: 'amount', type: 'uint256' },
            ],
            outputs: [{ name: '', type: 'bool' }],
          },
        ],
        functionName: 'transfer',
      })
      // toast.success(`Deposit Successful!
      //   Transaction Link: <a href="https://sepolia.etherscan.io/tx/${transaction}" target="_blank">${transaction}</a>`)
      toast.success(
        () =>
          TransactionMessage({
            link: `https://sepolia.etherscan.io/tx/${transaction}`,
            linkTitle: transaction,
            message: `Deposit Successful!  
           Transaction Link: `,
          }),
        { autoClose: 10000 },
      )
      dispatch(triggerModal({ modal: 'deposit', trigger: false }))
    } catch (error: any) {
      toast.error(`Transaction failed: ${error.message}`)
    }
  }

  return { sendTransaction }
}

export default useSendWalletTransaction
