import { BorderBeam } from '@/components/common/borderBeam/borderBeam'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import useWalletStateHelper from '@/components/pages/wallet/walletStateHelper'
import { BucketsDataType, PlinkoBallType } from '@/services/games/plinko/physx.types'
import { useDropPlinkoBallsMutation, useFinishPlinkoGameMutation, useGetMePlayingPlinkoGamesQuery } from '@/services/games/plinko/plinko.service'
import { closePlayingPlinkoGame, incDroppedBallsCount } from '@/store/slices/plinko/plinko.slice'
import { useDispatch } from '@/store/store'
import { toFixedEfficient } from '@/utils/numerix'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import usePlinkoGameBoardHelper, { PlinkoSoundsType } from './plinkoGameBoard.hooks'

// TODO: Update buckets colors
// TODO: Add 'Drop Here' Text to canvas; Only show it when user is allowed to drop.

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
  const { refetch: getMyOngoinGame } = useGetMePlayingPlinkoGamesQuery({})

  const dispatch = useDispatch()

  const getGameStateColor = useCallback(() => {
    switch (plinkoConfig.playing?.status) {
      case 'FINISHED':
        return {
          colorFrom: '#1db954',
          colorTo: '#1db954',
        }
      case 'DROPPING':
        return {
          colorFrom: '#ffaa40',
          colorTo: '#ffaa40',
        }
      default:
        return {
          colorFrom: '#ffaa40',
          colorTo: '#ffaa40',
        }
    }
  }, [plinkoConfig.playing])
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

      pegsRef.current.forEach((peg) => {
        ctx.beginPath()
        ctx.arc(peg.x, peg.y, peg.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#798998' // Color for the pegs
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

      for (let i = 0; i < buckets.length; i++) {
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

        // Add subtle inner shadow
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

            sounds.playCollision(+!!(ball.rapidImpacts?.[j] ?? 0))
            ball.rapidImpacts[j] = (ball.rapidImpacts?.[j] ?? 0) + 1
            ball.vy = (Math.sin(angle) * physx.ground.vy) / ball.rapidImpacts[j]
          }
        }

        if (ball.y >= buckets[0].y + bucketSpecs.heightThreshold) {
          let bucketInContactIndex = buckets.findIndex((b) => ball.x >= b.topLeftX && ball.x <= b.topRightX)

          if (bucketInContactIndex === -1) {
            if (ball.x >= buckets[0].topLeftX - bucketSpecs.widthThreshold && ball.x <= buckets[0].topRightX) {
              bucketInContactIndex = 0
            } else if (ball.x <= buckets[buckets.length - 1].topRightX + bucketSpecs.widthThreshold && ball.x >= buckets[buckets.length - 1].topLeftX) {
              bucketInContactIndex = buckets.length - 1
            }
          }
          if (bucketInContactIndex !== -1) {
            ball.x = buckets[bucketInContactIndex].x
            ball.y = buckets[bucketInContactIndex].bottomY - bucketSpecs.widthThreshold
            ball.vx = 0
            ball.vy = 0
            sounds.playLanding()
          }

          dispatch(incDroppedBallsCount())
          return false
        }

        ctx.save()

        // const ballColor = bucketColors[buckets.findIndex((b) => ball.x >= b.topLeftX && ball.x <= b.topRightX)] ?? 'black'
        const bucketIndex = buckets.findIndex((b) => ball.x >= b.topLeftX && ball.x <= b.topRightX)
        const targetColor = bucketColors[bucketIndex] ?? 'black'

        // Update targetColor if needed
        if (targetColor !== ball.targetColor) {
          ball.targetColor = targetColor
        }

        // Smoothly interpolate current color toward target
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

      requestAnimationFrame(update)
    }

    update()
  }, [plinkoConfig.rules, dispatch, plinkoConfig.mode.label])

  const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (
      !canvasRef.current ||
      !plinkoConfig.rules ||
      !plinkoConfig.playing ||
      isDropping ||
      gameRef.current?.length ||
      plinkoConfig.playing.droppedCount >= plinkoConfig.playing.balls.length
    ) {
      return
    }

    sounds.playDrop()
    gameRef.current.push({
      ball: { ...plinkoConfig.playing.balls[plinkoConfig.playing.droppedCount], rapidImpacts: [], color: 'black', targetColor: 'black' },
      physx: {
        ground: { vx: plinkoConfig.rules.horizontalSpeedFactor, vy: plinkoConfig.rules.verticalSpeedFactor },
        g: plinkoConfig.rules.gravity,
        fk: plinkoConfig.rules.friction,
      },
      sounds,
    })
  }

  useEffect(() => {
    if (!plinkoConfig.playing || (plinkoConfig.playing.status !== 'NOT_DROPPED_YET' && !plinkoConfig.playing.balls.length)) {
      getMyOngoinGame()
      return
    }
    if (!plinkoConfig.playing) {
      return
    }
    if (!isDropping && plinkoConfig.playing.status === 'NOT_DROPPED_YET') {
      ;(async () => {
        if (plinkoConfig.playing) {
          await dropPlinkoBallsMutation({
            id: plinkoConfig.playing.id,
          }).unwrap()
        }
      })()
    }
  }, [plinkoConfig.playing, isDropping, plinkoConfig.rules, dropPlinkoBallsMutation, getMyOngoinGame])

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
          await finishPlinkoGameMutation({
            id: plinkoConfig.playing.id,
          }).unwrap()
        }
      })()
    }
  }, [plinkoConfig.playing?.droppedCount, plinkoConfig.playing, isDropping, isFinishing, finishPlinkoGameMutation])

  useEffect(() => {
    if (plinkoConfig.playing && plinkoConfig.playing.status === 'FINISHED') {
      fetchBalance()
      toast.success(`You won ${plinkoConfig.playing.prize}$.`)

      // TODO: Add win animation and sound
      dispatch(closePlayingPlinkoGame())
    }
  }, [plinkoConfig.playing, plinkoConfig.playing?.prize, plinkoConfig.playing?.status, dispatch, fetchBalance])

  return (
    <Card className={`w - full max - w - [${plinkoConfig.rules?.board?.width ?? 600}px] mt - 10`}>
      <CardBody className="p-4 sm:p-6">
        <motion.div className="rounded-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div>
            <canvas ref={canvasRef} onClick={handleCanvasClick} />
          </div>

          <BorderBeam className="rounded-[20px]" duration={3} size={350} borderWidth={3} colorFrom={getGameStateColor().colorFrom} colorTo={getGameStateColor().colorTo} />
        </motion.div>
      </CardBody>
    </Card>
  )
}
