import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import { FormGroup } from '@/components/common/form/formGroup/fromGroup'
import { InputIcon } from '@/components/common/form/inputIcon/inputIcon'
import { Label } from '@/components/common/form/label/label'
import { NumberInput } from '@/components/common/form/numberInput/numberInput'
import { Radio } from '@/components/common/form/radio/radio'
import { RadioGroup } from '@/components/common/form/radioGroup/radioGroup'
import { TextForm } from '@/components/common/form/textForm/textForm'
import CentIcon from '@/components/icons/cent/cent'
import { useAuth } from '@/hooks/useAuth'
import { useHelper } from '@/hooks/usehelper'
import { useGetPlinkoRulesQuery, usePostPlinkoBetMutation } from '@/services/games/plinko/plinko.service'
import { useGetUserInfoQuery } from '@/services/user/user.service'
import { triggerSound } from '@/store/slices/configs/configs.slice'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { setPlinkoConfig } from '@/store/slices/plinko/plinko.slice'
import { useDispatch, useSelector } from '@/store/store'
import { createNumberArray, getMinMaxRows } from '@/utils/numerix'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { IPlinkoConfigForm } from './plinkoConfigForm.types'

const modes = [
  { value: 8, label: '8' },
  { value: 12, label: '12' },
  { value: 16, label: '16' },
]

export default function PlinkoConfigForm() {
  const dispatch = useDispatch()
  const { isAuthorized } = useAuth()
  const { configs } = useSelector((state) => state.configs)
  const { data: rulesData } = useGetPlinkoRulesQuery({})
  const { currentTokenBalance, network, token } = useSelector((state) => state.currency)
  const { plinkoConfig } = useSelector((state) => state.plinko)
  const [rows, setRows] = useState([] as number[])
  const [currentRowsRules, setCurrentRowsRules] = useState(rulesData?.data.find((rules) => rules.rows === plinkoConfig.rows))
  const [plinkoPlaceBetMutation, { isLoading }] = usePostPlinkoBetMutation()

  const { addDecimalNumbers, formatNumber, subDecimalNumbers } = useHelper()

  const {
    control: gameControl,
    handleSubmit: gameFormHandleSubmit,
    setValue: numericFormSetValue,
    formState: { errors },
  } = useForm<IPlinkoConfigForm>({
    defaultValues: {
      betAmount: plinkoConfig.betAmount,
      numberOfBets: plinkoConfig.numberOfBets,
      gameMode: plinkoConfig.mode.value,
      gameRows: plinkoConfig.rows,
    },
  })

  useEffect(() => {
    if (!rulesData?.data?.length) return
    const [min, max] = getMinMaxRows(rulesData?.data)
    setRows(createNumberArray(min, max)) // FIXME: Revise this to not use array
    setCurrentRowsRules(rulesData?.data.find((rules) => rules.rows === plinkoConfig.rows))
  }, [rulesData?.data, plinkoConfig.rows]) // TODO: Check if this required to ne separate useEffecys like MineConfig comp

  const { data: UserData } = useGetUserInfoQuery({}, { skip: !isAuthorized })

  const handleSubmit = async (values: IPlinkoConfigForm) => {
    if (!isAuthorized || !UserData?.data.profile || !UserData?.data.name) {
      dispatch(triggerModal({ modal: 'login', trigger: true }))
    } else {
      const betAmount = plinkoConfig.betAmount.split(',').join('')
      if (+betAmount > 2.0) {
        toast.error('Bets must not exceed 2$ for now!')
        return
      }
      try {
        await plinkoPlaceBetMutation({ betAmount: +betAmount, mode: plinkoConfig.mode.label, rows: plinkoConfig.rows, token: token.symbol, chainId: network.chainId }).unwrap()
        // refetchBalance({ chain: network.chainId, token: token.symbol }) // FIXME: Call fetch balance after last ball falls into bucket.
        // Play drop sound and start dropping balls one by one wit
      } catch (error) {
        // toast.error(error.message)
      }
    }
  }

  const handleOnIncrease = (value: string) => {
    const increasedValue = !isAuthorized ? null : addDecimalNumbers(formatNumber(value || '0'), 1)

    if (!increasedValue) return null
    numericFormSetValue('betAmount', increasedValue)
    dispatch(setPlinkoConfig({ betAmount: increasedValue }))
  }

  const handleOnDecrease = (value: string) => {
    const decreasedValue = !isAuthorized ? null : subDecimalNumbers(formatNumber(value || '0'), 1)

    if (!decreasedValue) return null
    numericFormSetValue('betAmount', decreasedValue)
    dispatch(setPlinkoConfig({ betAmount: decreasedValue }))
  }

  const handleBetsIncrease = (value: number) => {
    if (!isAuthorized) return null
    const newValue = value + 1
    numericFormSetValue('numberOfBets', newValue)
    dispatch(setPlinkoConfig({ numberOfBets: newValue }))
  }

  const handleBetsDecrease = (value: number) => {
    if (!isAuthorized || value <= 1) return null
    const newValue = value - 1
    numericFormSetValue('numberOfBets', newValue)
    dispatch(setPlinkoConfig({ numberOfBets: newValue }))
  }

  const toggleSound = () => dispatch(triggerSound())

  return (
    <Card className="max-w-[390px] lg:max-w-[430px] w-full">
      <CardHeader>
        <CardTitle>MANUAL</CardTitle>
        <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition" onClick={toggleSound} aria-label="Toggle sound">
          {configs.sound ? <SpeakerWaveIcon className="w-6 h-6 text-white" /> : <SpeakerXMarkIcon className="w-6 h-6 text-white" />}
        </button>
      </CardHeader>
      <CardBody>
        <form onSubmit={gameFormHandleSubmit(handleSubmit)} className="flex flex-col gap-y-2">
          <FormGroup>
            <Label htmlFor="bet-amount" className="flex items-center justify-between">
              <span>Bet Amount</span>
              <span className="text-main">
                Available: <span className="text-white">{currentTokenBalance}</span>
              </span>
            </Label>
            <Controller
              name="betAmount"
              control={gameControl}
              rules={{
                required: { value: true, message: "It's required" },
                max: { value: 2, message: 'Bets must not exceed 2$ for now.' },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <>
                  <InputIcon>
                    <NumberInput
                      disabled={(plinkoConfig.playing && plinkoConfig.playing.status !== 'FINISHED') || !isAuthorized}
                      onChange={(event) => {
                        dispatch(setPlinkoConfig({ betAmount: event.target.value }))
                        onChange(event)
                      }}
                      onIncrease={() => handleOnIncrease(value)}
                      onDecrease={() => handleOnDecrease(value)}
                      onBlur={onBlur}
                      value={value}
                      id="bet-amount"
                      placeholder="UP TO 2.0$"
                      invalid={Boolean(errors.betAmount)}
                    />
                    <CentIcon className="text-warning" />
                  </InputIcon>
                  <TextForm variant="invalid">{errors.betAmount?.message}</TextForm>
                </>
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="number-of-bets">Number of Bets</Label>
            <Controller
              name="numberOfBets"
              control={gameControl}
              rules={{
                required: { value: true, message: "It's required" },
                min: { value: 1, message: 'Minimum 1 bet' },
                max: { value: 100, message: 'Maximum 100 bets' },
              }}
              render={({ field: { onChange, value }, fieldState }) => (
                <>
                  <InputIcon>
                    <NumberInput
                      disabled={(plinkoConfig.playing && plinkoConfig.playing.status !== 'FINISHED') || !isAuthorized}
                      onChange={(event) => {
                        const val = parseInt(event.target.value) || 1
                        dispatch(setPlinkoConfig({ numberOfBets: val }))
                        onChange(val)
                      }}
                      onIncrease={() => handleBetsIncrease(value)}
                      onDecrease={() => handleBetsDecrease(value)}
                      value={value.toString()}
                      id="number-of-bets"
                      placeholder="1-100"
                      invalid={Boolean(errors.numberOfBets)}
                    />
                  </InputIcon>
                  <TextForm variant="invalid">{errors.numberOfBets?.message}</TextForm>
                </>
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label>Game mode</Label>
            <RadioGroup>
              {modes.map((mode) => (
                <Controller
                  key={mode.value}
                  name="gameMode"
                  control={gameControl}
                  rules={{
                    required: { value: true, message: "It's required" },
                  }}
                  render={({ field }) => (
                    <>
                      <Radio
                        disabled={(plinkoConfig.playing && plinkoConfig.playing.status !== 'FINISHED') || !isAuthorized}
                        checked={field.value === mode.value}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value))
                          const newMultipliers = [] as number[] /*FIXME: rulesData?.data.find((rules) => rules.rows === +e.target.value)?.coefficients[
                            plinkoConfig.mode.label === 'HARD' ? 'hard' : plinkoConfig.mode.label === 'MEDIUM' ? 'medium' : 'easy'
                          ]*/
                          dispatch(
                            setPlinkoConfig({
                              mode: {
                                ...plinkoConfig.mode,
                                ...(newMultipliers ? { multipliers: newMultipliers } : {}),
                              },
                            }),
                          )
                        }}
                        blockClassName="w-[calc(100/3*1%)]"
                        id={`mode-${mode.value.toString()}`}
                        name={'game-mode'}
                        value={mode.value.toString()}
                      >
                        {mode.label}
                      </Radio>
                      <TextForm variant="invalid">{errors.gameMode?.message}</TextForm>
                    </>
                  )}
                />
              ))}
            </RadioGroup>
          </FormGroup>
        </form>
      </CardBody>
    </Card>
  )
}
