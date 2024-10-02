import Modal from '../../../common/modal/modal'
import { SelectCoinCard } from '../../cards/selectCoin/selectCoin'
import { SelectCoinProps } from './selectCoin.types'

export const SelectCoinModal: React.FC<SelectCoinProps> = (props) => {
  const { isOpen, onClose } = props

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SelectCoinCard isOpenModal={isOpen} onCloseModal={onClose} />
    </Modal>
  )
}
