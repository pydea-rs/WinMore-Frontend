import Modal from '../../../common/modal/modal'
import { WithdrawCard } from '../../cards/withdraw/withdraw'
// import { WithdrawCard } from '../../cards/deposit/deposit'
import { WithdrawModalProps } from './withdrawModal.types'

export const WithdrawModal: React.FC<WithdrawModalProps> = (props) => {
  const { isOpen, onClose } = props

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <WithdrawCard isOpenModal={isOpen} onCloseModal={onClose} />
    </Modal>
  )
}
