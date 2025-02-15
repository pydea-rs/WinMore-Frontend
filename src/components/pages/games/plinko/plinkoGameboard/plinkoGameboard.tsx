import { BorderBeam } from '@/components/common/borderBeam/borderBeam'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { IPlinkoStatus } from '@/store/slices/plinko/plinko.slice.types'
import { Nullable } from '@/types/global.types'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import usePlinkoGameBoardHelper from './plinkoGameBoard.hooks'

export default function PlinkoGameBoard() {
  const { onDropBall, plinkoConfig, loadingBlock, isBallDropping } = usePlinkoGameBoardHelper()

  const getGameStateColor = (status: Nullable<IPlinkoStatus>) => {
    switch (status) {
      case 'LOST': {
        return {
          colorFrom: '#F40F46',
          colorTo: '#BF9C2C',
        }
      }

      case 'WON': {
        return {
          colorFrom: '#1db954',
          colorTo: '#1db954',
        }
      }

      case 'NOT_STARTED': {
        return {
          colorFrom: '#ffaa40',
          colorTo: '#ffaa40',
        }
      }

      case 'ONGOING': {
        return {
          colorFrom: '#ffaa40',
          colorTo: '#ffaa40',
        }
      }

      default: {
        return {
          colorFrom: '#ffaa40',
          colorTo: '#ffaa40',
        }
      }
    }
  }

  const canvasRef = useRef(null)
  const ballsRef = useRef<{ x: number; y: number; vx: number; vy: number; radius: number }[]>([])
  const pegsRef = useRef<{ x: number; y: number; radius: number }[]>([])
  const bucketColors = ['#2D305D', '#5E65C3', '#FF4D6D', '#FFC107', '#00C853', '#1E88E5', '#FF6D00']
  const multipliers = [2, 3, 4, 5, 4, 3, 2]

  const gravity = 0.07
  const friction = 0.95

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas: HTMLCanvasElement = canvasRef.current
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
    canvas.width = 600
    canvas.height = 600

    // Generate pegs in a triangular pattern
    const rows = 8
    const pegArray = []
    for (let row = 0; row < rows; row++) {
      for (let i = 0; i <= row + 2; i++) {
        const x = canvas.width / 2 + (i - row / 2) * 50 - 60
        const y = 100 + row * 50
        pegArray.push({ x, y, radius: 9 })
      }
    }
    pegsRef.current = pegArray

    // Function to create gradient for buckets
    const createGradient = (ctx: CanvasRenderingContext2D, colorFrom: string, colorTo: string) => {
      const gradient = ctx.createLinearGradient(0, 0, 53, 74)
      gradient.addColorStop(0, colorFrom)
      gradient.addColorStop(1, colorTo)
      return gradient
    }

    function update() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw pegs
      pegsRef.current.forEach((peg) => {
        ctx.beginPath()
        ctx.arc(peg.x, peg.y, peg.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#798998' // Color for the pegs
        ctx.fill()
        ctx.closePath()
      })

      // Draw balls
      ballsRef.current.forEach((ball) => {
        ball.vy += gravity
        ball.vy *= friction
        ball.vx *= friction
        ball.x += ball.vx
        ball.y += ball.vy

        // Collision with pegs
        pegsRef.current.forEach((peg) => {
          const dx = ball.x - peg.x
          const dy = ball.y - peg.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < ball.radius + peg.radius) {
            const angle = Math.atan2(dy, dx)
            ball.vx = Math.cos(angle) * 2
            ball.vy = Math.sin(angle) * 2
          }
        })

        // Draw ball
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
      })

      // Draw buckets with gradients
      multipliers.forEach((multiplier, index) => {
        const bucketX = index * 70 + 40
        const bucketY = canvas.height - 80
        const gradient = createGradient(ctx, bucketColors[index], bucketColors[index])

        ctx.beginPath()
        ctx.moveTo(bucketX, bucketY)
        ctx.lineTo(bucketX + 53, bucketY)
        ctx.lineTo(bucketX + 40, bucketY + 74)
        ctx.lineTo(bucketX - 13, bucketY + 74)
        ctx.closePath()
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw multiplier text
        ctx.fillStyle = 'white'
        ctx.font = 'bold 16px Arial'
        ctx.fillText(`${multiplier}x`, bucketX + 12, bucketY + 50)
      })

      requestAnimationFrame(update)
    }

    update()
  }, [])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    const canvas: HTMLCanvasElement = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    ballsRef.current.push({ x, y: 50, vx: (Math.random() - 0.5) * 2, vy: 2, radius: 5 })
  }

  return (
    <Card className="w-full max-w-[600px] mt-10">
      <CardBody className="p-4 sm:p-6">
        <motion.div className="rounded-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div>
            <canvas ref={canvasRef} onClick={handleCanvasClick} />
          </div>

          <BorderBeam
            className="rounded-[20px]"
            duration={3}
            size={350}
            borderWidth={3}
            colorFrom={getGameStateColor(plinkoConfig.currentGameStatus).colorFrom}
            colorTo={getGameStateColor(plinkoConfig.currentGameStatus).colorTo}
          />
        </motion.div>
      </CardBody>
    </Card>
  )
}
