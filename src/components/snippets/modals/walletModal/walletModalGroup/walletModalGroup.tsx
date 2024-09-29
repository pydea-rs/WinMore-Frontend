import { useMultiStepModal } from '@/components/common/multipleStepModal/multipleStepModal.hook'
import MultipleStepModalGroup from '@/components/common/multipleStepModal/multipleStepModalGroup/multipleStepModalGroup'
import { CompleteUserDataCard } from '@/components/snippets/cards/completeUserData/completeUserData'
import { ConnectToWalletCard } from '@/components/snippets/cards/connectToWallet/connectToWallet'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import { useEffect } from 'react'
import { WalletModalGroupProps } from './walletModalGroup.types'

const WalletModalGroup: BaseProps<WalletModalGroupProps> = (props) => {
  const { onClose, isOpen } = props
  const { goTo, next } = useMultiStepModal(2)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { modals } = useSelector((state) => state.modal)

  useEffect(() => {
    if (user) {
      if (!user.email || !user.name) {
        goTo(1)
      } else {
        dispatch(triggerModal({ modal: 'login', trigger: false }))
      }
    }
  }, [user])

  return (
    <>
      <MultipleStepModalGroup>
        <ConnectToWalletCard isOpenModal={isOpen} onCloseModal={onClose} onComplete={next} />
        <CompleteUserDataCard isOpenModal={isOpen} onCloseModal={onClose} onComplete={next} />
      </MultipleStepModalGroup>
    </>
  )
}

export default WalletModalGroup
