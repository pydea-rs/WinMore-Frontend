import { useHelper } from '@/hooks/usehelper'
import { useGetRulesQuery, usePostMineBetMutation } from '@/services/games/mine/mine.service'
import { CURRENT_MINE, startMineGame, updateCurrentGame, updateMineConfig } from '@/store/slices/mine/mine.slice'
import { IMineMode } from '@/store/slices/mine/mine.slice.types'
import { useDispatch, useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import { createNumberArray } from '@/utils/createNumberArray.util'
import { useCallback, useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '../common/button/button'
import { Card } from '../common/card/card'
import { CardBody } from '../common/card/card-body/card-body'
import { CardHeader } from '../common/card/card-header/card-header'
import { CardTitle } from '../common/card/card-title/card-title'
import Container from '../common/container/container'
import Footer from '../common/footer/footer'
import FooterMenu from '../common/footer/footer-menu/footer-menu'
import { FormGroup } from '../common/form/formGroup/fromGroup'
import { InputIcon } from '../common/form/inputIcon/inputIcon'
import { Label } from '../common/form/label/label'
import { NumberInput } from '../common/form/numberInput/numberInput'
import { Radio } from '../common/form/radio/radio'
import { RadioGroup } from '../common/form/radioGroup/radioGroup'
import { TextForm } from '../common/form/textForm/textForm'
import Header from '../common/header/header'
import MenuSticky from '../common/menuSticky/menuSticky'
import QuickAccess from '../common/quickAccess/quickAccess'
import { Spinner } from '../common/spinner/spinner'
import CentIcon from '../icons/cent/cent'
import GameHistory from '../snippets/gameHistory/gameHistory'

interface IGameForm {
  betAmount: string
  gameMode: number
  gameRows: number
}

const MineLayout: BaseProps = ({ children }) => {
  const { mineConfig, currentGame } = useSelector((state) => state.mine)
  const dispatch = useDispatch()
  const { data, isLoading: IsLoadingGameData } = useGetRulesQuery({})

  const modes: IMineMode[] = [
    {
      label: 'EASY',
      value: 4,
      coefficient: data?.data.coefficients.easy || [],
    },
    {
      label: 'MEDIUM',
      value: 3,
      coefficient: data?.data.coefficients.medium || [],
    },
    {
      label: 'HARD',
      value: 2,
      coefficient: data?.data.coefficients.hard || [],
    },
  ]
  const [mineBetMutation, { isLoading }] = usePostMineBetMutation()
  const tile = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/tile.mp3'], volume: 0.7, preload: true }), [])

  const onStart = useCallback(() => {
    dispatch(startMineGame())
    tile.play()
  }, [mineConfig, data])
  const rows = createNumberArray(data?.data.minRows || 0, data?.data.maxRows || 4)

  const {
    control: gameControl,
    handleSubmit: gameFormHandleSubmit,
    watch,
    setValue: numericFormSetValue,
    formState: { errors },
  } = useForm<IGameForm>()
  const { formatNumber, addDecimalNumbers, subDecimalNumbers } = useHelper()

  const betAmountWatch = watch('betAmount')
  const gameRowsWatch = watch('gameRows')

  useEffect(() => {
    if (!currentGame && data) {
      numericFormSetValue('gameRows', data.data.minRows)
    }
    if (currentGame) {
      numericFormSetValue('betAmount', currentGame.initialBet.toString())
      numericFormSetValue('gameMode', modes.find((mode) => mode.label === currentGame.mode)?.value as number)
      numericFormSetValue('gameRows', currentGame.rowsCount)
    }

    return () => {}
  }, [data, currentGame])

  useEffect(() => {
    dispatch(updateMineConfig({ betAmount: betAmountWatch }))
    return () => {}
  }, [betAmountWatch])

  useEffect(() => {
    dispatch(updateMineConfig({ rows: +gameRowsWatch }))
    return () => {}
  }, [gameRowsWatch])
  useEffect(() => {
    const currentMineDataLocalStorage = localStorage.getItem(CURRENT_MINE)

    if (currentMineDataLocalStorage) {
      dispatch(updateCurrentGame(JSON.parse(currentMineDataLocalStorage)))
    }
    return () => {}
  }, [])

  const handleSubmit = async (values: IGameForm) => {
    const betAmount = mineConfig.betAmount.split(',').join('')
    await mineBetMutation({ betAmount: +betAmount, mode: mineConfig.mode.label, rows: mineConfig.rows })
    onStart()
  }

  return (
    <main className="w-full h-full min-h-svh flex flex-col container">
      <Header />
      <QuickAccess />

      <section className="relative z-40 mb-20">
        <Container className="z-10 overflow-x-visible">
          {IsLoadingGameData ? (
            <Spinner />
          ) : (
            <div className="flex flex-wrap">
              <aside className="w-full lg:max-w-[430px] lg:pt-[6vmax]">
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
                                  disabled={mineConfig.isStarted}
                                  onChange={onChange}
                                  onIncrease={() => numericFormSetValue('betAmount', addDecimalNumbers(formatNumber(betAmountWatch || '0'), 1))}
                                  onDecrease={() => numericFormSetValue('betAmount', subDecimalNumbers(formatNumber(betAmountWatch || '0'), 1))}
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
                                    disabled={mineConfig.isStarted}
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
                                    disabled={mineConfig.isStarted}
                                    // new props
                                    checked={field.value === row}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
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
              </aside>
              <div className="flex justify-end flex-grow">{children}</div>
            </div>
          )}
        </Container>
      </section>

      <section>
        <GameHistory />
      </section>
      <Footer className="relative z-20 flex-grow-0 hidden md:block">
        <FooterMenu className="relative" />
      </Footer>
      <MenuSticky className="md:hidden" />
    </main>
  )
}

export default MineLayout
