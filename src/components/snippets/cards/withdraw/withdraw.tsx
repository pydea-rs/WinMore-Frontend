import { Alert } from '@/components/common/alert/alert'
import { Avatar } from '@/components/common/avatar/avatar'
import { Button } from '@/components/common/button/button'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import { FormGroup } from '@/components/common/form/formGroup/fromGroup'
import { Label } from '@/components/common/form/label/label'
import { NumberInput } from '@/components/common/form/numberInput/numberInput'
import Select from '@/components/common/form/select/select'
import SelectButton from '@/components/common/form/select/selectButton/selectButton'
import SelectIcon from '@/components/common/form/select/selectIcon/selectIcon'
import SelectList from '@/components/common/form/select/selectList/selectList'
import SelectOption from '@/components/common/form/select/selectOption/selectOption'
import { TextForm } from '@/components/common/form/textForm/textForm'
import { Input } from '@/components/common/form/textInput/textInput'
import ChevronDownIcon from '@/components/icons/chevronDown/chevronDown'
import DisabledIcon from '@/components/icons/disabled/disabled'
import FinanceIcon from '@/components/icons/finance/finance.icon'
import WalletIcon from '@/components/icons/wallet/walet.icon'
import WarningIcon from '@/components/icons/warning/warning'
import { TType } from '@/types/global.types'
import { Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { WithdrawCardProps, WithdrawForm } from './withdraw.types'

const chainList: Array<TType> = [
  { id: 0, name: 'All', icon: undefined },
  { id: 1, name: 'Ethereum', icon: '/assets/images/dollar.png' },
  { id: 2, name: 'Polygon', icon: '/assets/images/tether.png' },
  { id: 3, name: 'Binance Coin', icon: '/assets/images/dollar.png' },
  { id: 4, name: 'Avalanche', icon: '/assets/images/tether.png' },
  { id: 5, name: 'Doge', icon: '/assets/images/dollar.png' },
]

const coinList: Array<TType> = [
  { id: 0, name: 'All', icon: undefined },
  { id: 1, name: 'Bitcoin', icon: '/assets/images/dollar.png' },
  { id: 2, name: 'ETH', icon: '/assets/images/tether.png' },
  { id: 3, name: 'SOL', icon: '/assets/images/dollar.png' },
  { id: 4, name: 'USDT', icon: '/assets/images/tether.png' },
  { id: 5, name: 'SOL', icon: '/assets/images/sol.png' },
]

const suggestedCoinList: Array<TType> = [
  { id: 4, name: 'USDT', icon: '/assets/images/tether.png' },
  { id: 5, name: 'SOL', icon: '/assets/images/sol.png' },
]

function arrayToObject(array: TType[]): Record<number, TType> {
  return array.reduce((obj: Record<number, TType>, item: TType) => {
    obj[`${item.id}`] = item
    return obj
  }, {})
}

export const WithdrawCard: React.FC<WithdrawCardProps> = (props) => {
  const { isOpenModal, onCloseModal, onComplete } = props

  const {
    control: withdrawFormController,
    handleSubmit: withdrawFormHandleSubmit,
    watch: withdrawFormWatch,
    setValue: withdrawFormSetValue,
    formState: { errors },
  } = useForm<WithdrawForm>({ defaultValues: { chain: '1', coin: '', gas_level: '3', wallet: '3' } })

  const handleSubmit = (values: WithdrawForm) => {
    console.log(values)
  }

  const coinObject: any = arrayToObject(coinList)
  const chainObject: any = arrayToObject(chainList)

  return (
    <Card size="lg" className="w-full max-w-[430px]">
      <CardHeader>
        <CardTitle>Withdraw</CardTitle>
        <button
          onClick={onCloseModal}
          className="appearance-none flex flex-col justify-center items-center p-2.5 focus:bg-primary focus:bg-opacity-60 hover:bg-primary hover:bg-opacity-60 active:bg-opacity-80 transition-all rounded-full "
        >
          <DisabledIcon />
        </button>
      </CardHeader>
      <CardBody>
        <form onSubmit={withdrawFormHandleSubmit(handleSubmit)}>
          <FormGroup>
            <Label className="flex items-center justify-between">
              Chain
              <span className="text-sm font-medium text-[#2A323A]">24h remaining limit: 0.00 / 9900 USDT</span>
            </Label>

            <Controller
              name="chain"
              control={withdrawFormController}
              rules={{
                required: { value: true, message: "It's require" },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <Select
                  value={chainObject[value]}
                  onChange={(op) => {
                    onChange(op.id.toString())
                    console.log('chain', op.id)
                  }}
                >
                  <SelectButton className="flex items-center justify-between ">
                    <div className="flex items-center text-sm text-main font-medium gap-x-2">
                      {chainObject[value]?.icon ? <Avatar src={chainObject[value]?.icon} alt="flag" /> : <div className="w-6 h-6 bg-black rounded-full" />}
                      {chainObject[value]?.name}
                    </div>
                    <ChevronDownIcon className="pointer-events-none size-6 fill-white/60" aria-hidden="true" />
                  </SelectButton>
                  <SelectList>
                    {chainList.map(({ icon, id, name }) => (
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
                  {fieldState.invalid && <TextForm variant="invalid">put your error message</TextForm>}
                </Select>
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label className="flex items-center justify-between">
              Coin
              <span className="text-main">
                Available: <span className="text-white">10.22</span>
              </span>
            </Label>
            <Controller
              name="coin"
              control={withdrawFormController}
              rules={{
                required: { value: true, message: "It's require" },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <Fragment>
                  <div className="relative">
                    <button
                      className="appearance-none w-10 h-10 text-sm font-medium text-main absolute left-3 z-10 top-2.5 active:opacity-70 rounded-full active:bg-white/20"
                      type="button"
                    >
                      Min.
                    </button>
                    <button
                      className="appearance-none w-10 h-10 text-sm font-medium text-primary absolute right-3 top-2.5 z-10 active:opacity-70 rounded-full active:bg-white/20"
                      type="button"
                    >
                      Max
                    </button>
                    <NumberInput className="px-16" onChange={onChange} onBlur={onBlur} value={value} id="id-233" placeholder="0" />
                  </div>
                  {fieldState.invalid && <TextForm variant="invalid">put your error message</TextForm>}
                </Fragment>
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label className="flex items-center gap-x-2">
              <FinanceIcon />
              <span>Gas level</span>
            </Label>

            <Controller
              name="gas_level"
              control={withdrawFormController}
              rules={{
                required: { value: true, message: "It's require" },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <Select
                  value={coinObject[value]}
                  onChange={(op) => {
                    console.log(op.id)
                    onChange(op.id.toString())
                  }}
                >
                  <SelectButton className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-main font-medium gap-x-2 w-full">
                      <span>{coinObject[value]?.name}</span>
                      <div className="flex ml-auto gap-x-1">
                        <ChevronDownIcon className="pointer-events-none size-6 text-white" aria-hidden="true" />
                      </div>
                    </div>
                  </SelectButton>
                  <SelectList>
                    {coinList.map(({ icon, id, name }) => (
                      <SelectOption value={{ id, name, icon }} key={id} className="flex items-center">
                        <span className="inline-block text-sm text-main font-medium group-data-[selected]:text-white">{name}</span>
                        <div className="flex ml-auto gap-x-1">
                          <ChevronDownIcon className="pointer-events-none size-6 text-white" aria-hidden="true" />
                        </div>
                      </SelectOption>
                    ))}
                  </SelectList>
                  {fieldState.invalid && <TextForm variant="invalid">put your error message</TextForm>}
                </Select>
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label className="flex items-center gap-x-2">
              <WalletIcon />
              <span>USDC Wallet</span>
            </Label>
            <Controller
              name="wallet"
              control={withdrawFormController}
              rules={{
                required: { value: true, message: "It's require" },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <Fragment>
                  <div className="relative">
                    <button
                      className="appearance-none w-16 h-10 text-sm font-medium text-primary absolute right-3 top-2.5 z-10 active:opacity-70 rounded-full active:bg-white/20"
                      type="button"
                    >
                      AutoSet
                    </button>
                    <Input className="pr-20" onChange={onChange} onBlur={onBlur} value={value} id="id-233" placeholder="type here" />
                  </div>
                  {fieldState.invalid && <TextForm variant="invalid">put your error message</TextForm>}
                </Fragment>
              )}
            />
            <span className="text-sm text-main font-medium block pt-[2px]">
              You will receive: <span className="text-white">USDC</span>
            </span>
          </FormGroup>

          <Alert variant="warning" className="flex gap-2 mb-4 ">
            <WarningIcon className="flex-shrink-0" />
            <span>To ensure security, large or suspicious withdrawal may take 1-24 hours for audit. Thank you for your patience</span>
          </Alert>

          {/* check the demo button page to find the loading examples */}
          <Button kind="gradient" className="w-36" full type="submit" size="lg">
            Withdraw
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
