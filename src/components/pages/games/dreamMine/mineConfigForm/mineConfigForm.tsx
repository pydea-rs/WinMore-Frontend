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
import useWalletStateHelper from '@/components/pages/wallet/walletStateHelper'
import { useAuth } from '@/hooks/useAuth'
import { useHelper } from '@/hooks/usehelper'
import { DREAM_MINE_ROCKS_COUNT, IGameDifficultyVariants, IGameMode } from '@/services/games/common/games.types'
import { useGetDreamMineRulesQuery, usePostMineBetMutation } from '@/services/games/mine/mine.service'
import { useGetUserInfoQuery } from '@/services/user/user.service'
import { setDreamMineConfig, setDreamMineGameMode, startMineGame } from '@/store/slices/mine/mine.slice'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import { approximate, createNumberArray, getMinMaxRows } from '@/utils/numerix'
import { Howl } from 'howler'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { IGameConfigForm } from '../../common-games.types'
import { SoundTogglerButton } from '../../common/soundToggler'

const MineConfigForm = () => {
  const { mineConfig } = useSelector((state) => state.mine)
  const { configs } = useSelector((state) => state.configs)
  const dispatch = useDispatch()
  const { isAuthorized } = useAuth()
  const { data: rulesData, refetch, isLoading: isRefetching } = useGetDreamMineRulesQuery({})

  const { fetchBalance, currentToken } = useWalletStateHelper()
  const { data: UserData } = useGetUserInfoQuery({}, { skip: !isAuthorized })
  const [rows, setRows] = useState([] as number[])

  const [mineBetMutation, { isLoading }] = usePostMineBetMutation()
  const placeBetSound = useMemo(() => new Howl({ src: ['/assets/games/common/sounds/place.mp3'], volume: 1.0, preload: true }), [])

  useEffect(() => {
    refetch()
  }, [refetch])

  const onStart = useCallback(() => {
    dispatch(startMineGame())
    if (configs.sound) placeBetSound.play()
  }, [configs, dispatch, placeBetSound])

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
  }, [rulesData?.data, rulesData])

  const [currentRowsRules, setCurrentRowsRules] = useState(rulesData?.data.find((rules) => rules.rows === mineConfig.rows))

  useEffect(() => {
    setCurrentRowsRules(rulesData?.data.find((rules) => rules.rows === mineConfig.rows))
    // TODO: Add betting amount conditions to MineConfig type, then remove the currentRowsRules n its useEffect just like plinkoConfig component did.
  }, [rulesData, mineConfig.rows])

  const [modes, setModes] = useState([] as IGameMode[])

  useEffect(() => {
    const difficulties: IGameDifficultyVariants[] = Object.keys(currentRowsRules?.multipliers ?? {}) as IGameDifficultyVariants[]
    if (!currentRowsRules || !difficulties?.length) {
      setModes([])
      return
    }

    setModes(
      difficulties.map((label) => ({
        label,
        value: DREAM_MINE_ROCKS_COUNT[label],
        multipliers: currentRowsRules.multipliers[label],
      })),
    )
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
      const betAmount = +mineConfig.betAmount.split(',').join('')
      if (currentRowsRules?.maxBetAmount && betAmount > currentRowsRules.maxBetAmount) {
        toast.error('Bets must not exceed 2$ for now!')
        return
      }
      if (currentRowsRules?.minBetAmount && betAmount < currentRowsRules.minBetAmount) {
        toast.error('Bets must not exceed 2$ for now!')
        return
      }
      try {
        await mineBetMutation({ betAmount, mode: mineConfig.mode.label, rows: mineConfig.rows, token: currentToken.symbol, chainId: currentToken.chain }).unwrap()
        fetchBalance()
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

  return (
    <Card className="max-w-[390px] lg:max-w-[430px] w-full">
      <CardHeader>
        <CardTitle>MANUAL</CardTitle>
        <SoundTogglerButton />
      </CardHeader>
      <CardBody>
        <form onSubmit={gameFormHandleSubmit(handleSubmit)} className="flex flex-col gap-y-2">
          <FormGroup>
            <Label htmlFor="id-233" className="flex items-center justify-between">
              <span>Bet Amount</span>
              <span className="text-main">
                Available: <span className="text-white">{approximate(currentToken.balance, 'round', 5)}</span>
              </span>
            </Label>
            <Controller
              name="betAmount"
              control={gameControl}
              rules={{
                required: { value: true, message: "It's required" },
                ...(currentRowsRules?.maxBetAmount ? { max: { value: currentRowsRules?.maxBetAmount, message: `Bets must not exceed ${currentRowsRules}$ for now.` } } : {}),
                ...(currentRowsRules?.minBetAmount ? { min: { value: currentRowsRules?.minBetAmount, message: `Can not bet below ${currentRowsRules.minBetAmount}$.` } } : {}),
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
                      placeholder={currentRowsRules?.maxBetAmount ? `UP TO ${currentRowsRules?.maxBetAmount}$` : ''}
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
                          dispatch(setDreamMineGameMode(mode))
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
                          const newMultipliers = rulesData?.data.find((rules) => rules.rows === +e.target.value)?.multipliers[mineConfig.mode.label || 'EASY']
                          dispatch(
                            setDreamMineConfig({
                              rows: +e.target.value,
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
