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
import { TType } from '@/types/global.types'
import classNames from 'classnames'
import { useState } from 'react'
import { SelectCoinProps } from './selectCoin.types'

const coinList = [
  { id: 0, name: 'All', icon: undefined },
  { id: 1, name: 'Durward Reynolds', icon: '/assets/images/dollar.png' },
  { id: 2, name: 'Kenton Towne', icon: '/assets/images/tether.png' },
  { id: 3, name: 'Therese Wunsch', icon: '/assets/images/dollar.png' },
  { id: 4, name: 'Benedict Kessler', icon: '/assets/images/tether.png' },
  { id: 5, name: 'Katelyn Rohan', icon: '/assets/images/dollar.png' },
]

export const SelectCoinCard: React.FC<SelectCoinProps> = (props) => {
  const { isOpenModal, onCloseModal, onComplete } = props

  const [selected, setSelected] = useState<TType>(coinList[0])
  const isChecked = '2'

  const coinItems = [
    {
      id: '1',
      title: 'USDT',
      amount: '0.00',
      coins: [
        {
          id: '11',
          title: 'dollar',
          src: '/assets/images/dollar.png',
        },
        {
          id: '12',
          title: 'tether',
          src: '/assets/images/tether.png',
        },
      ],
    },
    {
      id: '2',
      title: 'USDT',
      amount: '0.00',
      coins: [
        {
          id: '21',
          title: 'dollar',
          src: '/assets/images/dollar.png',
        },
        {
          id: '22',
          title: 'tether',
          src: '/assets/images/tether.png',
        },
      ],
    },
  ]

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
          <Label></Label>
          <Select value={selected} onChange={setSelected}>
            <SelectButton className="flex items-center justify-between ">
              <div className="flex items-center text-sm text-main font-medium gap-x-2">
                {selected.icon ? <Avatar src={selected.icon} alt="flag" /> : <div className="w-6 h-6 bg-black rounded-full" />}
                {selected.name}
              </div>
              <ChevronDownIcon className="pointer-events-none size-6 fill-white/60" aria-hidden="true" />
            </SelectButton>
            <SelectList>
              {coinList.map(({ icon, id, name }) => (
                <SelectOption value={{ id, name, icon }} key={id} className="flex items-center">
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
          <Label>Select coin</Label>
          <RadioCardGroup>
            {coinItems.map(({ id, coins, amount, title }) => (
              <RadioCard id="64" name="5" value="64" key={id} checked={id === isChecked}>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {coins.map((coin, inx, arr) => (
                      <Avatar key={coin.id} size="md" src={coin.src} alt={coin.title} className={classNames({ '-ml-2': inx === arr.length - 1 })} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between flex-grow px-2">
                    <span className="font-medium">{title}</span>
                    <span className="text-xs text-white font-normal ml-auto">{amount}</span>
                  </div>
                </div>
              </RadioCard>
            ))}
          </RadioCardGroup>
        </FormGroup>
      </CardBody>
    </Card>
  )
}
