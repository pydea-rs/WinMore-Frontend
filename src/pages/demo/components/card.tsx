import Container from '@/components/common/container/container'
import { DepositCard } from '@/components/snippets/cards/deposit/deposit'
import { SelectCoinCard } from '@/components/snippets/cards/selectCoin/selectCoin'

const CardComponentDemo = () => {
  const isOpenModal = true
  const handleCloseModal = () => {}
  const handleCompleteModal = () => {}

  return (
    <Container>
      <div className="flex gap-4 p-5 flex-wrap">
        <div className="px-4 flex-grow">
          <SelectCoinCard isOpenModal={isOpenModal} onCloseModal={handleCloseModal} onComplete={handleCompleteModal} />
        </div>
        <div className="px-4 flex-grow">
          <DepositCard isOpenModal={isOpenModal} onCloseModal={handleCloseModal} onComplete={handleCompleteModal} />
        </div>
      </div>
    </Container>
  )
}

export default CardComponentDemo
