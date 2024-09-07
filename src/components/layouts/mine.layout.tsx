import { useHelper } from '@/hooks/usehelper'
import { startMineGame, updateMineConfig } from '@/store/slices/games/games.slice'
import { useDispatch, useSelector } from '@/store/store'
import { BaseProps } from '@/types/global.types'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Container from '../common/container/container'
import Footer from '../common/footer/footer'
import FooterMenu from '../common/footer/footer-menu/footer-menu'
import { FormGroup } from '../common/form/formGroup/fromGroup'
import { InputIcon } from '../common/form/inputIcon/inputIcon'
import { Label } from '../common/form/label/label'
import { NumberInput } from '../common/form/numberInput/numberInput'
import { Radio } from '../common/form/radio/radio'
import GameHistory from '../common/gameHistory/gameHistory'
import Header from '../common/header/header'
import MenuSticky from '../common/menuSticky/menuSticky'
import QuickAccess from '../common/quickAccess/quickAccess'
import CentIcon from '../icons/cent/cent'

interface IGameForm {
  betAmount: string
  gameMode: number
  gameRows: number
}

const MineLayout: BaseProps = ({ children }) => {
  const { mineConfig } = useSelector((state) => state.game)
  const dispatch = useDispatch()
  const modes = [
    {
      label: 'Easy',
      value: 4,
    },
    {
      label: 'Medium',
      value: 3,
    },
    {
      label: 'Hard',
      value: 2,
    },
  ]
  const rows = [4, 5, 6, 7, 8]
  const tile = useMemo(() => new Howl({ src: ['/assets/games/mine/sounds/tile.mp3'], volume: 0.7, preload: true }), [])

  const onStart = useCallback(() => {
    dispatch(startMineGame({}))
    tile.play()
  }, [dispatch, tile])

  const {
    control: numericFormController,
    handleSubmit: numericFormHandleSubmit,
    watch,
    setValue: numericFormSetValue,
    formState: { errors },
  } = useForm<IGameForm>({ defaultValues: { betAmount: '', gameMode: 4, gameRows: 4 } })
  const { formatNumber, addDecimalNumbers, subDecimalNumbers } = useHelper()

  const betAmountWatch = watch('betAmount')
  const gameModeWatch = watch('gameMode')
  const gameRowsWatch = watch('gameRows')

  useEffect(() => {
    dispatch(updateMineConfig({ betAmount: betAmountWatch }))
    return () => {}
  }, [betAmountWatch])

  useEffect(() => {
    dispatch(updateMineConfig({ mode: +gameModeWatch as 2 | 3 | 4 }))
    return () => {}
  }, [gameModeWatch])

  useEffect(() => {
    dispatch(updateMineConfig({ rows: +gameRowsWatch }))
    return () => {}
  }, [gameRowsWatch])

  const handleSubmit = (values: IGameForm) => {
    console.log(values)
    onStart()
  }

  return (
    <main className="w-full h-full min-h-svh flex flex-col container">
      <Header />
      <QuickAccess />
      <Container className="z-10 overflow-x-visible">
        <div className="flex flex-wrap z-40">
          <aside className="w-full lg:max-w-[431px] ">
            <form onSubmit={numericFormHandleSubmit(handleSubmit)} className="flex flex-col gap-4">
              <Controller
                name="betAmount"
                control={numericFormController}
                rules={{
                  required: { value: true, message: "It's require" },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState }) => (
                  <>
                    <FormGroup>
                      <Label htmlFor="2-2" className="flex items-center gap-x-2">
                        <span>Bet Amount </span>
                      </Label>

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
                        />
                        <CentIcon className="text-warning" />
                      </InputIcon>
                    </FormGroup>
                  </>
                )}
              />
              <Controller
                name="gameMode"
                control={numericFormController}
                rules={{
                  required: { value: true, message: "It's require" },
                }}
                render={({ field }) => (
                  <>
                    <FormGroup>
                      <Label>Game mode</Label>
                      <div className="grid grid-cols-3 gap-x-2">
                        {modes.map((mode) => {
                          return (
                            <Radio
                              {...field}
                              key={mode.value}
                              id={`mode-${mode.value.toString()}`}
                              name={'game-mode'}
                              defaultChecked={mineConfig.mode === mode.value}
                              value={mode.value.toString()}
                            >
                              {mode.label}
                            </Radio>
                          )
                        })}
                      </div>
                    </FormGroup>
                  </>
                )}
              />
              <Controller
                name="gameRows"
                control={numericFormController}
                rules={{
                  required: { value: true, message: "It's require" },
                }}
                render={({ field }) => (
                  <>
                    <FormGroup>
                      <Label>Rows </Label>
                      <div className="grid grid-cols-5 gap-x-2">
                        {rows.map((row) => {
                          return (
                            <Radio {...field} key={row} id={`row-${row.toString()}`} name="game-rows" defaultChecked={mineConfig.rows === row} value={row.toString()}>
                              {row}
                            </Radio>
                          )
                        })}
                      </div>
                    </FormGroup>
                  </>
                )}
              />

              <motion.button
                type="submit"
                disabled={mineConfig.isStarted && !mineConfig.isGameOver}
                className="h-12 disabled:dark:bg-amber-600/10 disabled:cursor-not-allowed disabled:dark:text-zinc-500 w-full rounded-xl p-1 text-base font-semibold shadow transition-all dark:bg-amber-600 dark:focus:ring-2 dark:focus:ring-amber-600 dark:focus:ring-offset-1 dark:focus:ring-offset-secondary-dark"
              >
                Start
              </motion.button>
            </form>
          </aside>
          <section className="flex justify-center flex-grow ">{children}</section>
        </div>
      </Container>
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
