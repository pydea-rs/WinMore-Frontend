import { useMultiStepModal } from '@/components/common/multipleStepModal/multipleStepModal.hook'
import MultipleStepModalGroup from '@/components/common/multipleStepModal/multipleStepModalGroup/multipleStepModalGroup'
import { CompleteUserDataCard } from '@/components/snippets/cards/completeUserData/completeUserData'
import { ConnectToWalletCard } from '@/components/snippets/cards/connectToWallet/connectToWallet'
import { BaseProps } from '@/types/global.types'
import { WalletModalGroupProps } from './walletModalGroup.types'

const WalletModalGroup: BaseProps<WalletModalGroupProps> = (props) => {
  const { onClose, isOpen } = props
  const { back, currentStepIndex, goTo, isFirstStep, isLastStep, next, reset } = useMultiStepModal(3)

  return (
    <>
      <div className="fixed  p-10 bg-slate-500 rounded-lg left-0 top-0 flex gap-2 flex-col z-40">
        <button className="block p-2 border border-red-300" onClick={next}>
          next
        </button>
        <button className="block p-2 border border-red-300" onClick={back}>
          back
        </button>
        <button className="block p-2 border border-red-300" onClick={() => goTo(1)}>
          goTo1
        </button>
        <button className="block p-2 border border-red-300" onClick={() => reset()}>
          reset
        </button>

        <span className="block p-2 border border-red-300">currentStepIndex: {currentStepIndex}</span>
        <span className="block p-2 border border-red-300">isFirstStep: {isFirstStep ? 'Yes' : 'No'}</span>
        <span className="block p-2 border border-red-300">isLastStep: {isLastStep ? 'Yes' : 'No'}</span>
      </div>

      <MultipleStepModalGroup>
        <ConnectToWalletCard isOpenModal={isOpen} onCloseModal={onClose} onComplete={next} />
        <CompleteUserDataCard isOpenModal={isOpen} onCloseModal={onClose} onComplete={next} />
        <div
          className="bg-slate-400 p-4 rounded-lg w-72 text-dark text-center py-6"
          onClick={() => {
            onClose()
          }}
        >
          Thanks
        </div>
      </MultipleStepModalGroup>
    </>
  )
}

export default WalletModalGroup
