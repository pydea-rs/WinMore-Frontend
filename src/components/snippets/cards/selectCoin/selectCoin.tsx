import { Avatar } from '@/components/common/avatar/avatar'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import { FormGroup } from '@/components/common/form/formGroup/fromGroup'
import { Label } from '@/components/common/form/label/label'
import { RadioCard } from '@/components/common/form/radioCard/radioCard'
import { RadioCardGroup } from '@/components/common/form/radioCardGroup/radioCardGroup'
import Select from '@/components/common/form/select/select'
import SelectButton from '@/components/common/form/select/selectButton/selectButton'
import SelectIcon from '@/components/common/form/select/selectIcon/selectIcon'
import SelectList from '@/components/common/form/select/selectList/selectList'
import SelectOption from '@/components/common/form/select/selectOption/selectOption'
import ChevronDownIcon from '@/components/icons/chevronDown/chevronDown'
import DisabledIcon from '@/components/icons/disabled/disabled'

import { updateCurrentTokenBalance, updateNetwork, updateToken } from '@/store/slices/currency/currency.slice'
import { useDispatch, useSelector } from '@/store/store'
import { INetwork, IToken, TType } from '@/types/global.types'
import { SelectCoinProps } from './selectCoin.types'

export const SelectCoinCard: React.FC<SelectCoinProps> = (props) => {
  const { network, token } = useSelector((state) => state.currency)
  const dispatch = useDispatch()
  const { isOpenModal, onCloseModal, onComplete } = props
  const { networks } = useSelector((state) => state.networks)

  const handleChangeNetwork = ({ id }: TType) => {
    const selectedNetwork = networks.find((net) => net.chainId === id) as INetwork
    dispatch(updateNetwork({ network: selectedNetwork }))
    dispatch(updateToken({ token: selectedNetwork.tokens[0] }))
    dispatch(updateCurrentTokenBalance(selectedNetwork.tokens[0].balance))
  }
  const handleChangeToken = (token: IToken) => {
    const selectedNetwork = networks.find((net) => net.chainId === network.chainId) as INetwork
    const tokenBalance = selectedNetwork.tokens.find((tk) => tk.id === token.id)
    dispatch(updateToken({ token }))
    dispatch(updateCurrentTokenBalance(tokenBalance?.balance || 0))
  }
  const currentChainTokenList = networks.find((item) => item.chainId === network.chainId)?.tokens as IToken[]
  console.log(currentChainTokenList)
  return (
    <Card size="lg" className="w-full max-w-[380px]">
      <CardHeader>
        <CardTitle> Coin</CardTitle>
        <button
          onClick={onCloseModal}
          className="appearance-none flex flex-col justify-center items-center p-2.5 focus:bg-primary focus:bg-opacity-60 hover:bg-primary hover:bg-opacity-60 active:bg-opacity-80 transition-all rounded-full "
        >
          <DisabledIcon />
        </button>
      </CardHeader>
      <CardBody>
        <FormGroup>
          <Label>Select Chain</Label>
          <Select value={{ id: network.chainId, name: network.name }} onChange={handleChangeNetwork}>
            <SelectButton className="flex items-center justify-between ">
              <div className="flex items-center text-sm text-main font-medium gap-x-2">
                {network.icon ? <Avatar src={network.icon} alt="flag" /> : <div className="w-6 h-6 bg-black rounded-full" />}
                {/* <div className="w-6 h-6 bg-black rounded-full" /> */}
                {network.name}
              </div>
              <ChevronDownIcon className="pointer-events-none size-6 fill-white/60" aria-hidden="true" />
            </SelectButton>
            <SelectList>
              {networks.map(({ chainId: id, name, icon }) => (
                <SelectOption value={{ id, name }} key={id} className="flex items-center">
                  {icon ? (
                    <SelectIcon>
                      <Avatar className="flex-shrink-0" size="md" src={icon} alt="flag" />
                    </SelectIcon>
                  ) : (
                    <SelectIcon>
                      <div className="w-6 h-6 bg-black rounded-full" />
                    </SelectIcon>
                  )}

                  <span className="inline-block text-sm text-main font-medium group-data-[selected]:text-white">{name}</span>
                </SelectOption>
              ))}
            </SelectList>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Select Coin</Label>
          <RadioCardGroup>
            {currentChainTokenList.map((currency) => {
              const { name, icon, symbol, id, balance } = currency
              return (
                <RadioCard id={symbol} name="tokens" value={id.toString()} key={id} checked={id === token.id} onChange={(e) => handleChangeToken(currency)}>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <Avatar size="md" src={icon} alt={name} />
                    </div>
                    <div className="flex items-center justify-between flex-grow px-2">
                      <span className="font-medium">{name}</span>
                      <span className="text-xs text-white font-normal ml-auto">{balance}</span>
                    </div>
                  </div>
                </RadioCard>
              )
            })}
          </RadioCardGroup>
        </FormGroup>
      </CardBody>
    </Card>
  )
}
