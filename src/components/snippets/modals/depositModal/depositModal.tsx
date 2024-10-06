import Modal from '../../../common/modal/modal'
import { DepositCard } from '../../cards/deposit/deposit'
import { DepositModalProps } from './depositModal.types'

export const DepositModal: React.FC<DepositModalProps> = (props) => {
  const { isOpen, onClose } = props

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <DepositCard isOpenModal={isOpen} onCloseModal={onClose} />
    </Modal>
  )
}
