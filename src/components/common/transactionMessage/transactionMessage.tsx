import Link from 'next/link'
import { ITransactionMessage } from './transactionMessage.types'

const TransactionMessage = (props: ITransactionMessage) => {
  const { link, message, linkTitle } = props
  return (
    <div>
      <span>{message}</span>
      <br />
      <Link href={link} target="_blank">
        {linkTitle}
      </Link>
    </div>
  )
}

export default TransactionMessage
