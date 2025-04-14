function draw3DBucket(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, angle: number) {
  const rimHeight = 8
  const baseEllipseHeight = 6

  ctx.save()
  ctx.translate(x + width / 2, y)
  ctx.rotate(angle)

  // Draw inner shadow
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, '#444')
  gradient.addColorStop(1, '#111')

  // Draw bucket body with gradient
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.moveTo(-width / 2, rimHeight)
  ctx.lineTo(-width / 2, height - baseEllipseHeight)
  ctx.lineTo(width / 2, height - baseEllipseHeight)
  ctx.lineTo(width / 2, rimHeight)
  ctx.closePath()
  ctx.fill()

  // Draw top rim (ellipse)
  ctx.beginPath()
  ctx.ellipse(0, rimHeight / 2, width / 2, rimHeight / 2, 0, 0, 2 * Math.PI)
  ctx.fillStyle = '#888'
  ctx.fill()

  // Draw bottom ellipse (base)
  ctx.beginPath()
  ctx.ellipse(0, height - baseEllipseHeight / 2, width / 2, baseEllipseHeight / 2, 0, 0, 2 * Math.PI)
  ctx.fillStyle = '#333'
  ctx.fill()

  ctx.restore()
}
