export function simulate(
  buckets: Record<string, number>[],
  pegsArray: Record<string, number>[],
  ball: Record<string, number>,
  friction: number,
  gravity: number,
  bucketWidthThreshold: number,
  BALL_HORIZONTAL_SPEED: number,
  BALL_DROP_SPEED: number,
  MAX_SPEED: number,
) {
  while (true) {
    ball.vy = Math.min(ball.vy + gravity, MAX_SPEED)
    ball.vy *= friction
    ball.vx *= friction
    ball.x += ball.vx * BALL_HORIZONTAL_SPEED
    ball.y += ball.vy * BALL_DROP_SPEED

    // Collision with pegs
    pegsArray.forEach((peg) => {
      const dx = ball.x - peg.x
      const dy = ball.y - peg.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < ball.radius + peg.radius) {
        const angle = Math.atan2(dy, dx)
        ball.vx = Math.cos(angle) * 2
        ball.vy = Math.sin(angle) * 2
      }
    })

    const bucketYThreshold = 20
    if (ball.y >= buckets[0].y + bucketYThreshold) {
      // Find the closest bucket
      let bucketInContactIndex = -1

      if (ball.x >= buckets[0].topLeftX - bucketWidthThreshold && ball.x <= buckets[buckets.length - 1].topRightX + bucketWidthThreshold) {
        for (let i = 0; i < buckets.length - 1; i++) {
          if (ball.x >= buckets[i].topLeftX && ball.x < buckets[i + 1].topLeftX) {
            bucketInContactIndex = i
            break
          }
        }
        if (bucketInContactIndex === -1) {
          // ball fell into the first or last bucket threshold
          bucketInContactIndex = ball.x >= buckets[buckets.length - 1].topLeftX && ball.x <= buckets[buckets.length - 1].topRightX + bucketWidthThreshold ? buckets.length - 1 : 0
        }
        if (bucketInContactIndex !== -1) {
          ball.x = buckets[bucketInContactIndex].x
          ball.y = buckets[bucketInContactIndex].bottomY - bucketWidthThreshold
          ball.vx = 0
          ball.vy = 0
        }
        return bucketInContactIndex
      }
    }
  }
}

export function backwardSimulation(
  targetBucket: Record<string, number>,
  dropPointY: number,
  pegsArray: Record<string, number>[],
  friction: number,
  gravity: number,
  BALL_HORIZONTAL_SPEED: number,
  BALL_DROP_SPEED: number,
  MAX_SPEED: number,
) {
  const ball = { x: targetBucket.x, y: targetBucket.y, vx: 0.5, vy: MAX_SPEED / 2, radius: 7.5 }
  while (true) {
    // Collision with pegs
    pegsArray.forEach((peg) => {
      const dx = ball.x - peg.x
      const dy = ball.y - peg.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < ball.radius + peg.radius) {
        const angle = Math.atan2(dy, dx)
        ball.vx = Math.cos(angle) * 2
        ball.vy = Math.sin(angle) * 2
      }
    })

    ball.y -= ball.vy * BALL_DROP_SPEED
    if (ball.y <= dropPointY) break
    ball.x -= ball.vx * BALL_HORIZONTAL_SPEED
    ball.vy /= friction
    ball.vx /= friction
    ball.vy = Math.max(ball.vy - gravity, 1)
    console.log(ball.vy)
  }
  return { ...ball, vy: 1 }
}

export function computeDropPointForBucketProb(targetBucketIndex: number, pegs: Record<string, number>[], buckets: Record<string, number>[]) {
  let bucketX = buckets[targetBucketIndex].x // Target bucket x position
  let y = pegs[pegs.length - 1].y // Start from last row of pegs
  let x = bucketX // Work backwards from the bucket

  // Trace back up through the peg layers
  for (let row = pegs.length - 1; row >= 0; row--) {
    let pegsInRow = pegs.filter((p) => p.y === y)

    if (pegsInRow.length === 0) break

    // Find the nearest peg to the current x position
    let closestPeg = pegsInRow.reduce((closest, peg) => (Math.abs(peg.x - x) < Math.abs(closest.x - x) ? peg : closest), pegsInRow[0])

    // Reverse the bounce (assuming 50% chance left/right)
    let direction = Math.random() > 0.5 ? 1 : -1
    x -= direction * (closestPeg.radius * 2)

    // Move up to the previous row
    y -= 50
  }

  return x // Computed initial drop position
}

export function computeDropPointForBucket(targetBucketIndex: number, pegs: Record<string, number>[], buckets: Record<string, number>[], gravity = 0.1, friction = 0.9) {
  const bucketX = buckets[targetBucketIndex].topLeftX // Target bucket position
  const rows = 9 // Number of peg rows
  const pegSpacingX = 50 // Horizontal distance between pegs
  const pegSpacingY = 50 // Vertical distance between rows

  let x = bucketX // Start at the bucket and work upwards
  let y = pegs[pegs.length - 1].y // Start at last row of pegs

  let vx = 0 // Assume ball reaches bucket with vx = 0 (at rest)
  let vy = Math.sqrt(2 * gravity * (rows * pegSpacingY)) // Approximate downward speed

  // Work upwards row-by-row, finding the correct peg bounce path
  for (let row = rows - 1; row >= 0; row--) {
    let pegsInRow = pegs.filter((p) => Math.abs(p.y - y) < 5)

    if (pegsInRow.length === 0) break

    // Find the nearest peg to current x position
    let closestPeg = pegsInRow.reduce((closest, peg) => (Math.abs(peg.x - x) < Math.abs(closest.x - x) ? peg : closest), pegsInRow[0])

    // Determine which direction the ball must have come from
    let bounceDirection = vx > 0 ? -1 : 1 // Reverse horizontal movement
    vx = bounceDirection * Math.sqrt(Math.abs(vx) * friction) // Apply friction

    // Move upwards
    x -= (bounceDirection * pegSpacingX) / 2
    y -= pegSpacingY
  }

  return x // Computed initial drop position
}
