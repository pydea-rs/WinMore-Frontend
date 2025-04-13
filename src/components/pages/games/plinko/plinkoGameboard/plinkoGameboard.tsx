import { BorderBeam } from '@/components/common/borderBeam/borderBeam'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { BucketsDataType, PlinkoBallType } from '@/services/games/plinko/physx.types'
import { useDropPlinkoBallsMutation, useFinishPlinkoGameMutation, useGetMePlayingPlinkoGamesQuery } from '@/services/games/plinko/plinko.service'
import { closePlayingPlinkoGame, incDroppedBallsCount } from '@/store/slices/plinko/plinko.slice'
import { useDispatch } from '@/store/store'
import { toFixedEfficient } from '@/utils/numerix'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import usePlinkoGameBoardHelper from './plinkoGameBoard.hooks'

// TODO: Update buckets colors
// TODO: Add sounds for droppinh, collisions, etc
// TODO: Dynamic ball color based on ball.x (change to color of the bucket with same x)
// TODO: Add 'Drop Here' Text to canvas; Only show it when user is allowed to drop.
export default function PlinkoGameBoard() {
  const { plinkoConfig } = usePlinkoGameBoardHelper()
  const [dropPlinkoBallsMutation, { isLoading: isDropping }] = useDropPlinkoBallsMutation()
  const [finishPlinkoGameMutation, { isLoading: isFinishing }] = useFinishPlinkoGameMutation()

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

  const canvasRef = useRef(null)
  const gameRef = useRef<{ ball: PlinkoBallType; physx: { ground: { vx: number; vy: number }; g: number; fk: number } }[]>([])
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

      gameRef.current = gameRef.current.filter(({ ball, physx }) => {
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

            ball.rapidImpacts[j] = (ball.rapidImpacts?.[j] ?? 0) + 1
            ball.vy = (Math.sin(angle) * physx.ground.vy) / ball.rapidImpacts[j]
          }
        }

        if (ball.y >= buckets[0].y + bucketSpecs.heightThreshold) {
          // Find the closest bucket
          let bucketInContactIndex = -1
          if (ball.x >= buckets[0].topLeftX - bucketSpecs.widthThreshold && ball.x <= buckets[buckets.length - 1].topRightX + bucketSpecs.widthThreshold) {
            for (let i = 0; i < buckets.length - 1; i++) {
              if (ball.x >= buckets[i].topLeftX && ball.x < buckets[i + 1].topLeftX) {
                bucketInContactIndex = i
                break
              }
            }
            if (bucketInContactIndex === -1) {
              // ball fell into the first or last bucket threshold
              bucketInContactIndex =
                ball.x >= buckets[buckets.length - 1].topLeftX && ball.x <= buckets[buckets.length - 1].topRightX + bucketSpecs.widthThreshold ? buckets.length - 1 : 0
            }
            if (bucketInContactIndex !== -1) {
              ball.x = buckets[bucketInContactIndex].x
              ball.y = buckets[bucketInContactIndex].bottomY - bucketSpecs.widthThreshold
              ball.vx = 0
              ball.vy = 0
            }
          }
          dispatch(incDroppedBallsCount())
          return false
        }
        // Draw ball
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
        return true
      })

      requestAnimationFrame(update)
    }

    update()
  }, [plinkoConfig.rules, dispatch, plinkoConfig.mode.label, plinkoConfig.rows])

  const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !plinkoConfig.rules || !plinkoConfig.playing) {
      return
    }

    if (isDropping || gameRef.current?.length) {
      // only drop if no ball is dropping in app and no api call is in progress
      return
    }

    if (plinkoConfig.playing.droppedCount >= plinkoConfig.playing.balls.length) {
      // TODO: Which is better for finishing the game, playing = null or playing.status = FINISHED?
      return
    }

    gameRef.current.push({
      ball: { ...plinkoConfig.playing.balls[plinkoConfig.playing.droppedCount], rapidImpacts: [] },
      physx: {
        ground: { vx: plinkoConfig.rules.horizontalSpeedFactor, vy: plinkoConfig.rules.verticalSpeedFactor },
        g: plinkoConfig.rules.gravity,
        fk: plinkoConfig.rules.friction,
      },
    }) // TODO: Is it correct updating dropCount like that? or it requires dispatch?
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
        console.log('HERE AGAIN')
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
      toast.success(`You won ${plinkoConfig.playing.prize}$.`)
      dispatch(closePlayingPlinkoGame())
    }
  }, [plinkoConfig.playing, plinkoConfig.playing?.prize, plinkoConfig.playing?.status, dispatch])

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
