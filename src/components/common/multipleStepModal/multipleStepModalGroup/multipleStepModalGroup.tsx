import { AnimatePresence, motion } from 'framer-motion'
import { useMultipleStepModal } from '../multipleStepModal.hook'
import { MultipleStepModalGroupProps } from './multipleStepModalGroup.types'

const MultipleStepModalGroup: React.FC<MultipleStepModalGroupProps> = (props) => {
  const { children } = props
  const { currentStepIndex } = useMultipleStepModal()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={currentStepIndex} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
        {children[currentStepIndex]}
      </motion.div>
    </AnimatePresence>
  )
}
export default MultipleStepModalGroup
