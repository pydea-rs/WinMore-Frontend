/* eslint-disable react-hooks/exhaustive-deps */
import { BorderBeam } from '@/components/common/borderBeam/borderBeam'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import useWalletStateHelper from '@/components/pages/wallet/walletStateHelper'
import { useAuth } from '@/hooks/useAuth'
import { IGeneralResponseTemplate } from '@/services/base/common.types'
import { BucketsDataType, PlinkoBallType } from '@/services/games/plinko/physx.types'
import { useDropPlinkoBallsMutation, useFinishPlinkoGameMutation, useGetMePlayingPlinkoGamesQuery } from '@/services/games/plinko/plinko.service'
import { closePlayingPlinkoGame, incDroppedBallsCount, setPlayingPlinkoGameStatus } from '@/store/slices/plinko/plinko.slice'
import { useDispatch } from '@/store/store'
import { approximate, toFixedEfficient } from '@/utils/numerix'
import { AxiosError } from 'axios'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Timeout } from 'react-number-format/types/types'
import { toast } from 'react-toastify'
import { celebratingAnimation } from '../../common/animations'
import usePlinkoGameBoardHelper, { PlinkoSoundsType } from './plinkoGameBoard.hooks'

function lerpColor(a: string, b: string, amount: number) {
  const ah = parseInt(a.replace('#', ''), 16)
  const ar = (ah >> 16) & 0xff,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff

  const bh = parseInt(b.replace('#', ''), 16)
  const br = (bh >> 16) & 0xff,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff

  const rr = Math.round(ar + amount * (br - ar))
  const rg = Math.round(ag + amount * (bg - ag))
  const rb = Math.round(ab + amount * (bb - ab))

  return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb).toString(16).slice(1)
}

export default function PlinkoGameBoard() {
  const { plinkoConfig } = usePlinkoGameBoardHelper()
  const [dropPlinkoBallsMutation, { isLoading: isDropping }] = useDropPlinkoBallsMutation()
  const [finishPlinkoGameMutation, { isLoading: isFinishing }] = useFinishPlinkoGameMutation()
  const { fetchBalance } = useWalletStateHelper()
  const { isAuthorized } = useAuth()
  const { refetch: getMyOngoinGame, isUninitialized } = useGetMePlayingPlinkoGamesQuery({}, { skip: !isAuthorized })
  const dispatch = useDispatch()
  const userStatusRef = useRef<'NONE' | 'PLAYING' | 'DROPPING' | 'FINISHED'>('NONE')
  const [autoplayTimerId, setAutoplayTimerId] = useState<Timeout | null>(null)

  const getGameStateColor = useCallback(() => {
    switch (userStatusRef.current) {
      case 'FINISHED':
        return {
          colorFrom: '#1db954',
          colorTo: 'cyan',
        }
      case 'PLAYING':
        return {
          colorFrom: 'red',
          colorTo: 'lightcoral',
        }
      case 'DROPPING':
        return {
          colorFrom: 'pink',
          colorTo: '#FF00FF',
        }
      default:
        return {
          colorFrom: 'orange',
          colorTo: 'coral',
        }
    }
  }, [userStatusRef])

  const { sounds } = usePlinkoGameBoardHelper()
  const canvasRef = useRef(null)
  const gameRef = useRef<
    {
      ball: PlinkoBallType & {
        color: string // current displayed color
        targetColor: string
      }
      physx: { ground: { vx: number; vy: number }; g: number; fk: number }
      sounds: PlinkoSoundsType
    }[]
  >([])
  const pegsRef = useRef<{ x: number; y: number; radius: number }[]>([])
  const bucketsRef = useRef<BucketsDataType>({} as BucketsDataType)
  const bucketShakeStatesRef = useRef<{ [bucketIndex: number]: { time: number; velocity: number } }>({})
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!canvasRef.current || !plinkoConfig.rules) return
    const bucketColors = ['#2D305D', '#5E65C3', '#FF4D6D', '#FFC107', '#00C853', '#1E88E5', '#FF6D00', '#2D305D', '#5E65C3', '#FF4D6D', '#FFC107']
    const canvas: HTMLCanvasElement = canvasRef.current
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

    canvas.height = plinkoConfig.rules.board.height ?? 200
    canvas.width = plinkoConfig.rules.board.width ?? 600

    pegsRef.current = plinkoConfig.rules.pegs.coords
    bucketsRef.current = plinkoConfig.rules.buckets

    function update() {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!gameRef.current.length && userStatusRef.current === 'PLAYING') {
        ctx.font = 'bolder 16px Arial'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'
        ctx.fillText('Drop Here', pegsRef.current[1].x, 40)
        ctx.font = 'bolder 30px Arial'
        ctx.fillText('↓', pegsRef.current[1].x, 70)
      }

      pegsRef.current.forEach((peg) => {
        ctx.beginPath()
        ctx.arc(peg.x, peg.y, peg.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#798998'
        ctx.fill()
        ctx.closePath()
      })

      if (!plinkoConfig.rules) {
        return
      }

      const { coords: buckets, specs: bucketSpecs } = bucketsRef.current

      const createGradient = (ctx: CanvasRenderingContext2D, colorFrom: string, colorTo: string) => {
        const gradient = ctx.createLinearGradient(0, 0, bucketSpecs.width, bucketSpecs.height)
        gradient.addColorStop(0, colorFrom)
        gradient.addColorStop(1, colorTo)
        return gradient
      }

      const now = Date.now()

      for (let i = 0; i < buckets.length; i++) {
        const shakeStart = bucketShakeStatesRef.current[i]?.time ?? 0
        const velocity = bucketShakeStatesRef.current[i]?.velocity ?? 0
        const timeSinceShake = now - shakeStart
        const baseAmplitude = 5 * (Math.PI / 180)
        const maxAmplitude = 12 * (Math.PI / 180)
        const baseDuration = 600
        const maxDuration = 1200
        const velocityFactor = velocity / 5
        const shakeAngleAmplitude = baseAmplitude + (maxAmplitude - baseAmplitude) * velocityFactor
        const shakeDuration = baseDuration + (maxDuration - baseDuration) * velocityFactor

        const progress = timeSinceShake / shakeDuration

        let shakeAngle = 0

        if (progress < 1) {
          shakeAngle = Math.sin(progress * Math.PI * 4) * shakeAngleAmplitude * (1 - progress)
        }

        ctx.save()

        const pivotX = (buckets[i].topLeftX + buckets[i].topRightX) / 2
        const pivotY = buckets[i].y

        // Apply rotation around top center
        ctx.translate(pivotX, pivotY)
        ctx.rotate(shakeAngle)
        ctx.translate(-pivotX, -pivotY)

        ctx.beginPath()
        ctx.moveTo(buckets[i].topLeftX, buckets[i].y)
        ctx.lineTo(buckets[i].topRightX, buckets[i].y)

        ctx.lineTo(buckets[i].bottomRightX, buckets[i].y + bucketSpecs.height - bucketSpecs.cornerRadius)
        ctx.arcTo(
          buckets[i].bottomRightX,
          buckets[i].y + bucketSpecs.height,
          buckets[i].bottomRightX - bucketSpecs.cornerRadius,
          buckets[i].y + bucketSpecs.height,
          bucketSpecs.cornerRadius,
        )

        ctx.lineTo(buckets[i].bottomLeftX + bucketSpecs.cornerRadius, buckets[i].y + bucketSpecs.height)
        ctx.arcTo(
          buckets[i].bottomLeftX,
          buckets[i].y + bucketSpecs.height,
          buckets[i].bottomLeftX,
          buckets[i].y + bucketSpecs.height - bucketSpecs.cornerRadius,
          bucketSpecs.cornerRadius,
        )
        ctx.lineTo(buckets[i].topLeftX, buckets[i].y)
        ctx.closePath()

        ctx.fillStyle = createGradient(ctx, bucketColors[i], bucketColors[i])
        ctx.fill()

        // Shadow
        ctx.save()
        ctx.clip()
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(0,0,0,0.5)'
        ctx.shadowOffsetY = 5
        ctx.fill()
        ctx.restore()

        ctx.fillStyle = 'white'
        ctx.font = 'bold 16px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(`${toFixedEfficient(plinkoConfig.rules.multipliers[plinkoConfig.mode.label][i])}`, buckets[i].x, buckets[i].y + bucketSpecs.heightThreshold + 5)
        ctx.fillText('X', buckets[i].x, buckets[i].y + bucketSpecs.heightThreshold + 30)

        ctx.restore()
      }

      gameRef.current = gameRef.current.filter(({ ball, physx, sounds }) => {
        ball.vy += physx.g
        ball.vy *= physx.fk
        ball.vx *= physx.fk
        ball.x += ball.vx * physx.ground.vx
        ball.y += ball.vy * physx.ground.vy

        // Collision with pegs
        for (let j = 0; j < pegsRef.current.length; j++) {
          const dx = ball.x - pegsRef.current[j].x
          const dy = ball.y - pegsRef.current[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (!ball.rapidImpacts) {
            ball.rapidImpacts = []
          }

          if (dist < ball.radius + pegsRef.current[j].radius) {
            const angle = Math.atan2(dy, dx)
            ball.vx = Math.cos(angle) * physx.ground.vx
            if (ball.vx >= 0) {
              ball.vx = Math.max(ball.vx, 0.001)
            } else {
              ball.vx = Math.min(ball.vx, -0.001)
            }
            if (!ball.rapidImpacts?.[j] || ball.rapidImpacts?.[j] < 5) {
              sounds.playCollision(+!!(ball.rapidImpacts?.[j] ?? 0))
            } // TODO: Or maybe player another sound?
            ball.rapidImpacts[j] = (ball.rapidImpacts?.[j] ?? 0) + 1
            ball.vy = (Math.sin(angle) * physx.ground.vy) / ball.rapidImpacts[j]
          }
        }

        if (ball.y >= buckets[0].y + bucketSpecs.heightThreshold) {
          let landingBucketIndex = buckets.findIndex((b) => ball.x >= b.topLeftX && ball.x <= b.topRightX)

          if (landingBucketIndex === -1) {
            if (ball.x >= buckets[0].topLeftX - bucketSpecs.widthThreshold && ball.x <= buckets[0].topRightX) {
              landingBucketIndex = 0
            } else if (ball.x <= buckets[buckets.length - 1].topRightX + bucketSpecs.widthThreshold && ball.x >= buckets[buckets.length - 1].topLeftX) {
              landingBucketIndex = buckets.length - 1
            }
          }
          if (landingBucketIndex !== -1) {
            sounds.playLanding()
            ball.x = buckets[landingBucketIndex].x
            ball.y = buckets[landingBucketIndex].bottomY - bucketSpecs.widthThreshold
            const velocityAtImpact = Math.sqrt(ball.vx ** 2 + ball.vy ** 2)
            bucketShakeStatesRef.current[landingBucketIndex] = {
              time: Date.now(),
              velocity: velocityAtImpact,
            }
            ball.vx = 0
            ball.vy = 0
          }

          dispatch(incDroppedBallsCount(landingBucketIndex))
          userStatusRef.current = 'PLAYING'
          return false
        }

        ctx.save()

        const targetColor = bucketColors[buckets.findIndex((b) => ball.x >= b.topLeftX && ball.x <= b.topRightX)] ?? 'black'
        if (targetColor !== ball.targetColor) {
          ball.targetColor = targetColor
        }

        ball.color = lerpColor(ball.color, ball.targetColor, 0.1)
        const ballColor = ball.color

        const blinkFactor = Math.sin(Date.now() / 300) * 0.2 + 0.5 // Makes it blink in and out
        ctx.globalAlpha = blinkFactor // Adjust opacity

        // Draw solid ball to maintain size
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fillStyle = ballColor
        ctx.fill()
        ctx.closePath()

        // Add glow effect
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.shadowBlur = 15
        ctx.shadowColor = ballColor
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fillStyle = ballColor
        ctx.fill()
        ctx.closePath()
        ctx.restore()

        // Optional blinking outline
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius + 1, 0, Math.PI * 2)
        ctx.strokeStyle = `${ballColor}AA` // Slightly transparent stroke
        ctx.lineWidth = 1 + Math.sin(Date.now() / 150) * 1.5 // pulsating stroke width
        ctx.stroke()
        ctx.closePath()

        ctx.restore()

        return true
      })

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = undefined
      }
      animationRef.current = requestAnimationFrame(update)
    }

    update()
  }, [plinkoConfig.rules, dispatch, plinkoConfig.mode.label])

  const handleCanvasClick = (skipErrorSound = false) => {
    const totalBallsFell = (plinkoConfig.playing?.droppedCount ?? 0) + gameRef.current.length
    if (
      !canvasRef.current ||
      !plinkoConfig.rules ||
      !plinkoConfig.playing ||
      isDropping ||
      totalBallsFell >= plinkoConfig.playing.balls.length ||
      (!plinkoConfig.autoplay && gameRef.current?.length)
    ) {
      if (!skipErrorSound) sounds.playError()
      return false
    }

    sounds.playDrop()
    gameRef.current.push({
      ball: { ...plinkoConfig.playing.balls[totalBallsFell], rapidImpacts: [], color: 'black', targetColor: 'black' },
      physx: {
        ground: { vx: plinkoConfig.rules.horizontalSpeedFactor, vy: plinkoConfig.rules.verticalSpeedFactor },
        g: plinkoConfig.rules.gravity,
        fk: plinkoConfig.rules.friction,
      },
      sounds,
    })

    userStatusRef.current = 'DROPPING'
    return true
  }

  useEffect(() => {
    const totalBallsFell = (plinkoConfig.playing?.droppedCount ?? 0) + gameRef.current.length
    if (!plinkoConfig.playing || plinkoConfig.playing.status === 'FINISHED' || !plinkoConfig.playing.balls.length || totalBallsFell >= plinkoConfig.numberOfBets) {
      if (autoplayTimerId) {
        clearInterval(autoplayTimerId)
        setAutoplayTimerId(null)
      }
      return
    }
    if (plinkoConfig.autoplay && totalBallsFell < plinkoConfig.numberOfBets) {
      if (!autoplayTimerId) {
        setAutoplayTimerId(
          setInterval(() => {
            if (!handleCanvasClick(true) && autoplayTimerId) {
              clearInterval(autoplayTimerId)
              setAutoplayTimerId(null)
            }
          }, 1500),
        )
      }
    } else if (autoplayTimerId) {
      clearInterval(autoplayTimerId)
      setAutoplayTimerId(null)
    }
  }, [plinkoConfig.autoplay, plinkoConfig.playing, plinkoConfig.playing?.droppedCount, plinkoConfig.playing?.balls])

  const handleUnexpectedEvents = (ex?: AxiosError<IGeneralResponseTemplate>, specialStatusToFinish: number | null = null) => {
    const error = ex?.response?.data
    if (error?.status === 400) {
      const message = error.message instanceof Array ? error.message[0] : error.message
      if (message.toLowerCase().includes('finished')) {
        dispatch(setPlayingPlinkoGameStatus('FINISHED'))
      } else if (!isUninitialized) {
        getMyOngoinGame()
      }
    } else if (specialStatusToFinish && error?.status === specialStatusToFinish) {
      dispatch(setPlayingPlinkoGameStatus('FINISHED'))
    } else {
      dispatch(closePlayingPlinkoGame())
    }
  }

  useEffect(() => {
    if (!plinkoConfig.playing || (plinkoConfig.playing.status !== 'NOT_DROPPED_YET' && !plinkoConfig.playing.balls.length)) {
      !isUninitialized && getMyOngoinGame()
      return
    }
    if (!plinkoConfig.playing) {
      return
    }

    if (!isDropping && plinkoConfig.playing.status === 'NOT_DROPPED_YET') {
      userStatusRef.current = 'PLAYING'
      ;(async () => {
        if (plinkoConfig.playing) {
          try {
            await dropPlinkoBallsMutation({
              id: plinkoConfig.playing.id,
            }).unwrap()
          } catch (ex) {
            handleUnexpectedEvents(ex as AxiosError<IGeneralResponseTemplate>)
          }
        }
      })()
    }
  }, [plinkoConfig.playing, plinkoConfig.rules])

  useEffect(() => {
    if (plinkoConfig.playing && userStatusRef.current === 'NONE') {
      userStatusRef.current = 'PLAYING'
    }
  }, [plinkoConfig.playing])

  useEffect(() => {
    if (!plinkoConfig.playing) return
    if (
      !isDropping &&
      !isFinishing &&
      plinkoConfig.playing.balls.length &&
      plinkoConfig.playing.droppedCount === plinkoConfig.playing.balls.length &&
      plinkoConfig.playing.status !== 'FINISHED'
    ) {
      ;(async () => {
        if (plinkoConfig.playing) {
          try {
            await finishPlinkoGameMutation({
              id: plinkoConfig.playing.id,
            }).unwrap()
          } catch (ex) {
            handleUnexpectedEvents(ex as AxiosError<IGeneralResponseTemplate>)
          }
        }
      })()
    }
  }, [plinkoConfig.playing?.droppedCount, plinkoConfig.playing])

  useEffect(() => {
    if (plinkoConfig.playing && plinkoConfig.playing.status === 'FINISHED') {
      fetchBalance()
      if (plinkoConfig.playing.prize) {
        toast.success(`You won ${approximate(plinkoConfig.playing.prize, 'floor', 4)}$.`)
        if (plinkoConfig.playing.prize && plinkoConfig.playing.prize > +plinkoConfig.betAmount * plinkoConfig.numberOfBets) {
          sounds.playCelebration()
          celebratingAnimation()
        }
      }
      userStatusRef.current = 'FINISHED'
      dispatch(closePlayingPlinkoGame())
    }
  }, [plinkoConfig.playing, plinkoConfig.playing?.prize, plinkoConfig.playing?.status, dispatch, fetchBalance])

  return (
    <Card className={`w - full max - w - [${plinkoConfig.rules?.board?.width ?? 600}px] mt - 10`}>
      <CardBody className="p-1 sm:p-6 bg-opacity-60">
        <motion.div className="rounded-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="p-4">
            <canvas ref={canvasRef} onClick={() => (!plinkoConfig.autoplay ? handleCanvasClick() : sounds.playError())} />
          </div>

          <BorderBeam
            className="rounded-[20px]"
            duration={3}
            anchor={65}
            size={400}
            borderWidth={4}
            colorFrom={getGameStateColor().colorFrom}
            colorTo={getGameStateColor().colorTo}
          />
        </motion.div>
      </CardBody>
    </Card>
  )
}
