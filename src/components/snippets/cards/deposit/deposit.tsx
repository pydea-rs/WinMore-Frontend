import { Avatar } from '@/components/common/avatar/avatar'
import { Button } from '@/components/common/button/button'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import { FormGroup } from '@/components/common/form/formGroup/fromGroup'
import { Label } from '@/components/common/form/label/label'
import { NumberInput } from '@/components/common/form/numberInput/numberInput'
import { Radio } from '@/components/common/form/radio/radio'
import { RadioGroup } from '@/components/common/form/radioGroup/radioGroup'
import Select from '@/components/common/form/select/select'
import SelectButton from '@/components/common/form/select/selectButton/selectButton'
import SelectIcon from '@/components/common/form/select/selectIcon/selectIcon'
import SelectList from '@/components/common/form/select/selectList/selectList'
import SelectOption from '@/components/common/form/select/selectOption/selectOption'
import ChevronDownIcon from '@/components/icons/chevronDown/chevronDown'
import DisabledIcon from '@/components/icons/disabled/disabled'
import { networks } from '@/constants/networks'
import useGetWalletBalance from '@/hooks/useGetWalletBalance'
import useSendWalletTransaction from '@/hooks/useSendTransaction'
import { updateNetwork, updateToken } from '@/store/slices/currency/currency.slice'
import { useDispatch, useSelector } from '@/store/store'
import { INetwork, IToken, TType } from '@/types/global.types'
import { Controller, useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'
import { DepositCardProps, DepositForm } from './deposit.types'

export const DepositCard: React.FC<DepositCardProps> = (props) => {
  const { isOpenModal, onCloseModal, onComplete } = props
  const { network, token } = useSelector((state) => state.currency)
  const { address } = useAccount()

  const {
    control: depositFormController,
    handleSubmit: depositFormHandleSubmit,
    watch: depositFormWatch,
    setValue: depositFormSetValue,
    formState: { errors },
  } = useForm<DepositForm>({ defaultValues: { amount: '0.00' } })
  const dispatch = useDispatch()
  const balance = useGetWalletBalance()
  const { sendTransaction } = useSendWalletTransaction()

  const handleChangeChain = (value: TType) => {
    const selectedNetwork = networks.find((net) => net.chainId === value.id) as INetwork
    dispatch(updateNetwork({ network: selectedNetwork }))
    dispatch(updateToken({ token: selectedNetwork.tokens[0] }))
  }

  const handleChangeCoin = (newToken: TType) => {
    const selectedToken = network.tokens.find((t) => t.id === newToken.id) as IToken
    dispatch(updateToken({ token: selectedToken }))
  }

  const handleSubmit = (values: DepositForm) => {
    sendTransaction({ amount: values.amount, decimals: balance.decimals, to: address })
  }
  return (
    <Card size="lg" className="w-full max-w-[430px]">
      <CardHeader>
        <CardTitle>Deposit</CardTitle>
        <button
          onClick={onCloseModal}
          className="appearance-none flex flex-col justify-center items-center p-2.5 focus:bg-primary focus:bg-opacity-60 hover:bg-primary hover:bg-opacity-60 active:bg-opacity-80 transition-all rounded-full "
        >
          <DisabledIcon />
        </button>
      </CardHeader>
      <CardBody>
        <form onSubmit={depositFormHandleSubmit(handleSubmit)}>
          <FormGroup>
            <Label>NETWORK</Label>
            <Select value={{ id: network.chainId, name: network.name }} onChange={handleChangeChain}>
              <SelectButton className="flex items-center justify-between ">
                <div className="flex items-center text-sm text-main font-medium gap-x-2">
                  {/* {network.icon ? <Avatar src={selectedChian.icon} alt="flag" /> : <div className="w-6 h-6 bg-black rounded-full" />} */}
                  <div className="w-6 h-6 bg-black rounded-full" />
                  {network.name}
                </div>
                <ChevronDownIcon className="pointer-events-none size-6 fill-white/60" aria-hidden="true" />
              </SelectButton>
              <SelectList>
                {networks.map((net) => {
                  const { chainId, name } = net
                  return (
                    <SelectOption value={{ id: chainId, name }} key={chainId} className="flex items-center">
                      {/* {icon ? (
                        <SelectIcon>
                          <Avatar className="flex-shrink-0" size="md" src={icon} alt="flag" />
                        </SelectIcon>
                      ) : ( */}
                      <SelectIcon>
                        <div className="w-6 h-6 bg-black rounded-full" />
                      </SelectIcon>
                      {/* )} */}
                      <span className="inline-block text-sm text-main font-medium group-data-[selected]:text-white">{name}</span>
                    </SelectOption>
                  )
                })}
              </SelectList>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Select Coin</Label>
            <div className="mb-2">
              <Select value={{ id: token.id, name: token.name, icon: token.icon }} onChange={handleChangeCoin}>
                <SelectButton className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-main font-medium gap-x-2 w-full">
                    {token.icon ? <Avatar src={token.icon} alt="flag" /> : <div className="w-6 h-6 bg-black rounded-full" />}
                    <span>{token.name}</span>
                    <div className="flex ml-auto gap-x-1">
                      <div className="flex items-center gap-x-1 font-normal text-xs">
                        <span className="text-main">Balance:</span>
                        <span className="text-white">123123123123</span>
                      </div>
                      <ChevronDownIcon className="pointer-events-none size-6 text-white" aria-hidden="true" />
                    </div>
                  </div>
                </SelectButton>
                <SelectList>
                  {network.tokens.map(({ icon, id, name }) => (
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
                      <div className="flex ml-auto gap-x-1">
                        <div className="flex text-main items-center gap-x-1 font-normal text-xs">
                          <span className="">Balance:</span>
                          <span className="group-data-[selected]:text-white">0.000</span>
                        </div>
                        <ChevronDownIcon className="pointer-events-none size-6 text-white" aria-hidden="true" />
                      </div>
                    </SelectOption>
                  ))}
                </SelectList>
              </Select>
            </div>

            <RadioGroup className="flex-wrap">
              {network.tokens.map((coin) => (
                <Radio
                  key={coin.id}
                  name="suggestedCoin"
                  size="sm"
                  id={`prefix-${coin.id}`}
                  value={coin.id.toString()}
                  checked={token.id === coin.id}
                  onClick={() => {
                    handleChangeCoin(coin)
                  }}
                >
                  <div className="flex items-center gap-4">
                    {coin.icon && <Avatar size="md" src={coin.icon} alt={coin.name} />}
                    <span>{coin.name}</span>
                  </div>
                </Radio>
              ))}
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>Your Current Connected Wallet</Label>
            <pre className="px-4 py-2.5 rounded-2xl bg-dark text-sm font-medium text-main">
              <span>{address}</span>
            </pre>
          </FormGroup>
          <FormGroup>
            <Label className="flex items-center justify-between">
              Enter Deposit Amount
              <span className="text-main">
                Available: <span className="text-white">{balance.formattedValue.toFixed(6)}</span>
              </span>
            </Label>
            <Controller
              name="amount"
              control={depositFormController}
              rules={{
                required: { value: true, message: "It's require" },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <div className="relative">
                  <button
                    className="appearance-none w-10 h-10 text-sm font-medium text-main absolute left-3 z-10 top-2.5 active:opacity-70 rounded-full active:bg-white/20"
                    type="button"
                    onClick={() => {
                      depositFormSetValue('amount', '0.1')
                    }}
                  >
                    Min.
                  </button>
                  <button
                    className="appearance-none w-10 h-10 text-sm font-medium text-primary absolute right-3 top-2.5 z-10 active:opacity-70 rounded-full active:bg-white/20"
                    type="button"
                    onClick={() => {
                      depositFormSetValue('amount', balance.formattedValue.toString())
                    }}
                  >
                    Max
                  </button>
                  <NumberInput className="px-16" onChange={onChange} onBlur={onBlur} value={value} id="id-233" placeholder="0" />
                </div>
              )}
            />
          </FormGroup>

          <Button kind="gradient" className="w-36" full type="submit" size="lg">
            Deposit
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
