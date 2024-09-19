import MultipleStepModal from '@/components/common/multipleStepModal/multipleStepModal'
import Modal from '../../../common/modal/modal'
import { WalletModalProps } from './walletModal.types'
import WalletModalGroup from './walletModalGroup/walletModalGroup'

export const WalletModal: React.FC<WalletModalProps> = (props) => {
  const { isOpen, onClose } = props

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <MultipleStepModal>
        <WalletModalGroup isOpen onClose={onClose} />
      </MultipleStepModal>
    </Modal>
  )
}
