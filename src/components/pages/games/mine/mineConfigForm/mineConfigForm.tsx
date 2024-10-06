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
import CentIcon from '@/components/icons/cent/cent'
import { useAuth } from '@/hooks/useAuth'
import { useHelper } from '@/hooks/usehelper'
import { useGetRulesQuery, usePostMineBetMutation } from '@/services/games/mine/mine.service'
import { startMineGame, updateMineConfig } from '@/store/slices/mine/mine.slice'
import { IMineMode } from '@/store/slices/mine/mine.slice.types'
import { triggerModal } from '@/store/slices/modal/modal.slice'
import { useDispatch, useSelector } from '@/store/store'
import { createNumberArray } from '@/utils/createNumberArray.util'
import { Howl } from 'howler'
import { useCallback, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IGameForm } from './mineConfigForm.types'

const MineConfigForm = () => {
  const { mineConfig } = useSelector((state) => state.mine)
  const dispatch = useDispatch()
  const { isAuthorized } = useAuth()
  const { data: rulesData, isLoading: IsLoadingGameData } = useGetRulesQuery({})

  const modes: IMineMode[] = [
    {
      label: 'EASY',
      value: 4,
      coefficient: rulesData?.data.coefficients.easy || [],
    },
    {
      label: 'MEDIUM',
      value: 3,
      coefficient: rulesData?.data.coefficients.medium || [],
    },
    {
      label: 'HARD',
      value: 2,
      coefficient: rulesData?.data.coefficients.hard || [],
    },
  ]

  const [mineBetMutation, { isLoading }] = usePostMineBetMutation()
  const tile = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/tile.mp3'], volume: 0.7, preload: true }), [])

  const onStart = useCallback(() => {
    dispatch(startMineGame())
    tile.play()
  }, [mineConfig, rulesData])

  const rows = createNumberArray(rulesData?.data.minRows || 8, rulesData?.data.maxRows || 12)

  const {
    control: gameControl,
    handleSubmit: gameFormHandleSubmit,
    setValue: numericFormSetValue,
    formState: { errors },
  } = useForm<IGameForm>({
    defaultValues: {
      betAmount: mineConfig.betAmount,
      gameMode: mineConfig.mode.value,
      gameRows: mineConfig.rows,
    },
  })

  const { formatNumber, addDecimalNumbers, subDecimalNumbers } = useHelper()

  const handleSubmit = async (values: IGameForm) => {
    if (!isAuthorized) {
      dispatch(triggerModal({ modal: 'login', trigger: true }))
      return
    }
    const betAmount = mineConfig.betAmount.split(',').join('')
    try {
      await mineBetMutation({ betAmount: +betAmount, mode: mineConfig.mode.label, rows: mineConfig.rows }).unwrap()
      onStart()
    } catch (error) {
      // toast.error(error.message)
      // console.log(first)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>MANUAL</CardTitle>
      </CardHeader>
      <CardBody>
        <form onSubmit={gameFormHandleSubmit(handleSubmit)} className="flex flex-col gap-y-2">
          <FormGroup>
            <Label htmlFor="id-233">
              <span>Bet Amount </span>
            </Label>
            <Controller
              name="betAmount"
              control={gameControl}
              rules={{
                required: { value: true, message: "It's require" },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <>
                  <InputIcon>
                    <NumberInput
                      disabled={mineConfig.isStarted || !isAuthorized}
                      onChange={(event) => {
                        dispatch(updateMineConfig({ betAmount: event.target.value }))
                        onChange(event)
                      }}
                      onIncrease={() => (!isAuthorized ? null : numericFormSetValue('betAmount', addDecimalNumbers(formatNumber(value || '0'), 1)))}
                      onDecrease={() => (!isAuthorized ? null : numericFormSetValue('betAmount', subDecimalNumbers(formatNumber(value || '0'), 1)))}
                      onBlur={onBlur}
                      value={value}
                      id="id-233"
                      placeholder="0.00$"
                      invalid={!!errors.betAmount}
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
                    required: { value: true, message: "It's require" },
                  }}
                  render={({ field }) => (
                    <>
                      <Radio
                        disabled={mineConfig.isStarted || !isAuthorized}
                        checked={field.value === mode.value}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value))

                          dispatch(updateMineConfig({ mode: mode }))
                          dispatch(updateMineConfig({ coefficients: mode.coefficient }))
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
                      required: { value: true, message: "It's require" },
                    }}
                    render={({ field }) => (
                      <Radio
                        disabled={mineConfig.isStarted || !isAuthorized}
                        // new props
                        checked={field.value === row}
                        onChange={(e) => {
                          dispatch(updateMineConfig({ rows: +e.target.value }))
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

          <Button kind="primary" type="submit" disabled={mineConfig.isStarted && !mineConfig.isGameOver && !isLoading}>
            {isLoading ? <Spinner /> : 'Start'}
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}

export default MineConfigForm
