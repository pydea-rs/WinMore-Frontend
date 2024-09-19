import { WalletModal } from '@/components/snippets/modals/walletModal/walletModal'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'

const Modals = () => {
  const { modals } = useSelector((state) => state.modal)
  const dispatch = useDispatch()

  return <WalletModal isOpen={modals.login} onClose={() => dispatch(triggerModal({ modal: 'login', trigger: false }))} />
}

export default Modals
