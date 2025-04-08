import { Button } from '@/components/common/button/button'
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
import { Spinner } from '@/components/common/spinner/spinner'
import CasinoSquareIcon from '@/components/icons/casinoSquare/casinoSquare'
import CentIcon from '@/components/icons/cent/cent'
import { useAuth } from '@/hooks/useAuth'
import { useHelper } from '@/hooks/usehelper'
import { IGameMode } from '@/services/games/common/games.types'
import { useGetDreamMineRulesQuery, usePostMineBetMutation } from '@/services/games/mine/mine.service'
import { useGetUserInfoQuery, useGetUserTokenBalanceMutation } from '@/services/user/user.service'
import { triggerSound } from '@/store/slices/configs/configs.slice'
import { setDreamMineConfig, startMineGame } from '@/store/slices/mine/mine.slice'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import { createNumberArray } from '@/utils/createNumberArray.util'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/20/solid'
import { Howl } from 'howler'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { IGameConfigForm } from '../../common-games.types'

const getMinMaxRows = (data: { rows?: number }[]) => {
  let min = data[0].rows || 0
  let max = data[0].rows || 0
  for (const row of data) {
    if (!row?.rows) continue
    if (row.rows > max) max = row.rows
    if (row.rows < min) min = row.rows
  }
  return [min, max]
}

const MineConfigForm = () => {
  const { currentTokenBalance, network, token } = useSelector((state) => state.currency)
  const { mineConfig } = useSelector((state) => state.mine)
  const { configs } = useSelector((state) => state.configs)
  const dispatch = useDispatch()
  const { isAuthorized } = useAuth()
  const { data: rulesData } = useGetDreamMineRulesQuery({})
  const [refetchBalance] = useGetUserTokenBalanceMutation()
  const { data: UserData } = useGetUserInfoQuery({}, { skip: !isAuthorized })
  const [rows, setRows] = useState([] as number[])

  const [mineBetMutation, { isLoading }] = usePostMineBetMutation()
  const tile = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/tile.mp3'], volume: 0.7, preload: true }), [])

  const onStart = useCallback(() => {
    dispatch(startMineGame())
    if (configs.sound) tile.play()
  }, [mineConfig, rulesData, configs])

  const {
    control: gameControl,
    handleSubmit: gameFormHandleSubmit,
    setValue: numericFormSetValue,
    formState: { errors },
  } = useForm<IGameConfigForm>({
    defaultValues: {
      betAmount: mineConfig.betAmount,
      gameMode: mineConfig.mode.value,
      gameRows: mineConfig.rows,
    },
  })

  useEffect(() => {
    if (!rulesData?.data?.length) return
    const [min, max] = getMinMaxRows(rulesData?.data)
    setRows(createNumberArray(min, max))
  }, [rulesData?.data])

  const [currentRowsRules, setCurrentRowsRules] = useState(rulesData?.data.find((rules) => rules.rows === mineConfig.rows))

  useEffect(() => {
    setCurrentRowsRules(rulesData?.data.find((rules) => rules.rows === mineConfig.rows))
  }, [rulesData, mineConfig.rows])

  const [modes, setModes] = useState([] as IGameMode[])

  useEffect(() => {
    setModes([
      {
        label: 'EASY',
        value: 4,
        multipliers: currentRowsRules?.multipliers.easy || [],
      },
      {
        label: 'MEDIUM',
        value: 3,
        multipliers: currentRowsRules?.multipliers.medium || [],
      },
      {
        label: 'HARD',
        value: 2,
        multipliers: currentRowsRules?.multipliers.hard || [],
      },
    ])
  }, [currentRowsRules])

  const { formatNumber, addDecimalNumbers, subDecimalNumbers } = useHelper()
  const handleSubmit = async (values: IGameConfigForm) => {
    if (!UserData?.data.profile || !UserData?.data.name) {
      dispatch(triggerModal({ modal: 'login', trigger: true }))
    } else {
      if (!isAuthorized) {
        dispatch(triggerModal({ modal: 'login', trigger: true }))
        return
      }
      const betAmount = mineConfig.betAmount.split(',').join('')
      if (+betAmount > 2.0) {
        toast.error('Bets must not exceed 2$ for now!')
        return
      }
      try {
        await mineBetMutation({ betAmount: +betAmount, mode: mineConfig.mode.label, rows: mineConfig.rows, token: token.symbol, chainId: network.chainId }).unwrap()
        refetchBalance({ chain: network.chainId, token: token.symbol })
        onStart()
      } catch (error) {
        // toast.error(error.message)
      }
    }
  }

  const handleOnIncrease = (value: string) => {
    const increasedValue = !isAuthorized ? null : addDecimalNumbers(formatNumber(value || '0'), 1)

    if (!increasedValue) return null
    numericFormSetValue('betAmount', increasedValue)
    dispatch(setDreamMineConfig({ betAmount: increasedValue }))
  }

  const handleOnDecrease = (value: string) => {
    const decreasedValue = !isAuthorized ? null : subDecimalNumbers(formatNumber(value || '0'), 1)

    if (!decreasedValue) return null
    numericFormSetValue('betAmount', decreasedValue)
    dispatch(setDreamMineConfig({ betAmount: decreasedValue }))
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
            <Label htmlFor="id-233" className="flex items-center justify-between">
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
                // validate: (value) => parseFloat(value) <= currentTokenBalance || `Bet amount cannot exceed ${currentTokenBalance}`,
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <>
                  <InputIcon>
                    <NumberInput
                      disabled={mineConfig.isStarted || !isAuthorized}
                      onChange={(event) => {
                        dispatch(setDreamMineConfig({ betAmount: event.target.value }))
                        onChange(event)
                      }}
                      onIncrease={() => handleOnIncrease(value)}
                      onDecrease={() => handleOnDecrease(value)}
                      onBlur={onBlur}
                      value={value}
                      id="id-233"
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
                        disabled={mineConfig.isStarted || !isAuthorized}
                        checked={field.value === mode.value}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value))
                          dispatch(setDreamMineConfig({ mode: mode }))
                        }}
                        blockClassName="w-[calc(100/3*1%)]"
                        // new props end
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

          <FormGroup>
            <RadioGroup>
              {rows.map((row) => {
                return (
                  <Controller
                    key={row}
                    name="gameRows"
                    control={gameControl}
                    rules={{
                      required: { value: true, message: "It's required" },
                    }}
                    render={({ field }) => (
                      <Radio
                        disabled={mineConfig.isStarted || !isAuthorized}
                        // new props
                        checked={field.value === row}
                        onChange={(e) => {
                          dispatch(setDreamMineConfig({ rows: +e.target.value }))
                          const newMultipliers = rulesData?.data.find((rules) => rules.rows === +e.target.value)?.multipliers[
                            mineConfig.mode.label === 'HARD' ? 'hard' : mineConfig.mode.label === 'MEDIUM' ? 'medium' : 'easy'
                          ]
                          dispatch(
                            setDreamMineConfig({
                              mode: {
                                ...mineConfig.mode,
                                ...(newMultipliers ? { multipliers: newMultipliers } : {}),
                              },
                            }),
                          )

                          field.onChange(Number(e.target.value))
                        }}
                        blockClassName="w-[calc(100/5*1%)]"
                        // new props ends
                        id={`row-${row.toString()}`}
                        name="game-rows"
                        value={row.toString()}
                      >
                        {row}
                      </Radio>
                    )}
                  />
                )
              })}
            </RadioGroup>
          </FormGroup>

          <Button
            kind="primary"
            type="submit"
            className="rounded-xl md:rounded-2xl"
            size="lg"
            disabled={(mineConfig.isStarted && !mineConfig.isGameOver && !isLoading) || !isAuthorized}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="flex items-center gap-x-2">
                <CasinoSquareIcon className="w-6" /> <span> Place BET</span>
              </div>
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}

export default MineConfigForm
