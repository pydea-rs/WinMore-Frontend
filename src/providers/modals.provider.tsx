import { DepositModal } from '@/components/snippets/modals/depositModal/depositModal'
import { SelectCoinModal } from '@/components/snippets/modals/selectModal/selectModal'
import { WalletModal } from '@/components/snippets/modals/walletModal/walletModal'
import { WithdrawModal } from '@/components/snippets/modals/withdrawModal/withdrawModal'
import { triggerModal, triggerWithdrawModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import { Fragment } from 'react'

const Modals = () => {
  const { modals } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  return (
    <Fragment>
      <WalletModal isOpen={modals.login} onClose={() => dispatch(triggerModal({ modal: 'login', trigger: false }))} />
      <SelectCoinModal isOpen={modals.selectCoin} onClose={() => dispatch(triggerModal({ modal: 'selectCoin', trigger: false }))} />
      <DepositModal isOpen={modals.deposit} onClose={() => dispatch(triggerModal({ modal: 'deposit', trigger: false }))} />
      <WithdrawModal isOpen={modals.withdraw.open} onClose={() => dispatch(triggerWithdrawModal({ trigger: false, data: null }))} />
    </Fragment>
  )
}

export default Modals
