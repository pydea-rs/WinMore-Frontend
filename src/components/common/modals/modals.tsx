import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import { WalletModal } from '../walletModal/walletModal'

const Modals = () => {
  const { modals } = useSelector((state) => state.modal)
  const dispatch = useDispatch()

  return (
    <>
      <WalletModal isOpen={modals.login} onClose={() => dispatch(triggerModal({ modal: 'login', trigger: false }))} />
    </>
  )
}

export default Modals
