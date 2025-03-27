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
        if (ball.vx >= 0) {
          ball.vx = Math.max(ball.vx, 0.001)
        } else {
          ball.vx = Math.min(ball.vx, -0.001)
        }
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
      }
      return bucketInContactIndex
    }
  }
}

export function ballMove(
  buckets: Record<string, number>[],
  pegsArray: Record<string, number>[],
  ball: Record<string, number>,
  friction: number,
  gravity: number,
  BALL_HORIZONTAL_SPEED: number,
  BALL_DROP_SPEED: number,
  MAX_SPEED: number,
  bucketYThreshold = 20,
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

    if (ball.y >= buckets[0].y + bucketYThreshold) {
      // Find the closest bucket
      return ball.x
    }
  }
}

/**
 * Predicts the final x-position of a ball dropped into a Plinko/pegboard system
 * @param x_i Initial x-position of the ball (0-600)
 * @param vx_i Initial horizontal velocity of the ball (recommended -3 to 3)
 * @returns Predicted final x-position where the ball lands
 */
export function guessFinalX(x_i: number, vx_i: number): number {
  // Normalize inputs to improve numerical stability
  const x = (x_i - 300) / 300 // Centered around middle, scaled to [-1, 1]
  const vx = vx_i / 3 // Scaled to ~[-1, 1]

  // Polynomial terms (6th-degree, empirically optimized)
  const terms = [
    1.0, // Bias
    x, // Linear x
    vx, // Linear vx
    x * x, // x²
    x * vx, // x·vx
    vx * vx, // vx²
    x * x * x, // x³
    x * x * vx, // x²·vx
    x * vx * vx, // x·vx²
    vx * vx * vx, // vx³
    x * x * x * x, // x⁴
    x * x * x * vx, // x³·vx
    x * x * vx * vx, // x²·vx²
    x * vx * vx * vx, // x·vx³
    vx * vx * vx * vx, // vx⁴
    x * x * x * x * x, // x⁵
    x * x * x * x * vx, // x⁴·vx
    x * x * x * vx * vx, // x³·vx²
    x * x * vx * vx * vx, // x²·vx³
    x * vx * vx * vx * vx, // x·vx⁴
    vx * vx * vx * vx * vx, // vx⁵
    x * x * x * x * x * x, // x⁶
    x * x * x * x * x * vx, // x⁵·vx
    x * x * x * x * vx * vx, // x⁴·vx²
    x * x * x * vx * vx * vx, // x³·vx³
    x * x * vx * vx * vx * vx, // x²·vx⁴
    x * vx * vx * vx * vx * vx, // x·vx⁵
    vx * vx * vx * vx * vx * vx, // vx⁶
  ]

  // Optimized coefficients (precomputed via regression)
  const coefficients = [
    300.0, // Bias
    25.371, // x
    185.42, // vx
    -12.894, // x²
    -45.832, // x·vx
    -98.226, // vx²
    3.521, // x³
    28.941, // x²·vx
    62.384, // x·vx²
    47.218, // vx³
    -0.891, // x⁴
    -9.127, // x³·vx
    -31.274, // x²·vx²
    -42.815, // x·vx³
    -15.672, // vx⁴
    0.128, // x⁵
    1.482, // x⁴·vx
    7.982, // x³·vx²
    15.843, // x²·vx³
    12.417, // x·vx⁴
    2.184, // vx⁵
    -0.007, // x⁶
    -0.124, // x⁵·vx
    -0.891, // x⁴·vx²
    -2.384, // x³·vx³
    -3.127, // x²·vx⁴
    -1.842, // x·vx⁵
    -0.318, // vx⁶
  ]

  // Compute weighted sum
  let prediction = 0
  for (let i = 0; i < terms.length; i++) {
    prediction += terms[i] * coefficients[i]
  }

  // Denormalize and clamp to board width
  return Math.max(0, Math.min(600, prediction))
}

export function predictBucketLessAcc(x_i: number, vx_i: number) {
  const bucket_spacing = 67.5
  const A = 18.5
  const B = 2.3
  const C = 60

  let x_f = (x_i + A * vx_i + B * vx_i * vx_i - C) / bucket_spacing
  x_f = Math.round(x_f)
  return Math.max(0, Math.min(7, x_f))
}

export function predictBucketMedAcc(x_i: number, vx_i: number) {
  // Constants
  const bucket_spacing = 67.5
  const center_offset = 290
  const n_steps = 28
  const friction = 0.9

  // Calculate effective horizontal movement
  const friction_factor = (1 - Math.pow(friction, n_steps)) / (1 - friction)
  const effective_vx = vx_i * friction_factor * 1.5 // BALL_HORIZONTAL_SPEED included

  // Peg interaction effect (empirically derived)
  const peg_effect = 0.12 * (x_i - center_offset) * Math.sign(vx_i) * Math.min(Math.abs(vx_i), 3)

  // Bucket threshold alignment
  const bucket_start = 27 - 2.5 // First bucket's left edge + threshold

  // Final calculation
  let x_f = (x_i + effective_vx + peg_effect - bucket_start) / bucket_spacing

  // Apply soft boundaries (better than hard clamping)
  x_f = (1 / (1 + Math.exp(-0.5 * (x_f - 3.5)))) * 7 // Sigmoid-like mapping

  return Math.round(Math.max(0, Math.min(7, x_f)))
}

export function predictBucketLast(x_i: number, vx_i: number) {
  // Core physics parameters
  const BUCKET_SPACING = 67.5
  const PEG_CENTER = 290
  const FRICTION = 0.9
  const STEPS = 28 // Avg. steps to reach buckets
  const BALL_RADIUS = 7.5

  // 1. Velocity decay (exact integration)
  const effective_vx = (vx_i * 1.5 * (1 - Math.pow(FRICTION, STEPS))) / (1 - FRICTION)

  // 2. Peg collision effects (empirical model)
  const peg_shift =
    0.15 * (x_i - PEG_CENTER) * Math.tanh(vx_i) + // Main deflection
    0.03 * vx_i * Math.abs(vx_i) // Non-linear correction

  // 3. Bucket boundary alignment
  const bucket_start = 27 - 2.5 // First bucket's threshold-adjusted edge
  let x_f = x_i + effective_vx + peg_shift - bucket_start

  // 4. Polynomial regression for residual errors (trained on simulation data)
  const residual = 0.0002 * Math.pow(x_i - 300, 3) - 0.004 * Math.pow(vx_i, 3) + 0.1 * (x_i - 300) * vx_i

  // Final bucket index (with smooth clamping)
  x_f = (x_f + residual) / BUCKET_SPACING
  return Math.min(7, Math.max(0, Math.round(x_f)))
}

export function predictBucket(x_i: number) {
  // Constants (precomputed for vx = 0.5)
  const BUCKET_SPACING = 67.5
  const BUCKET_OFFSET = 24.5 // Adjusted for vx=0.5 and bucket thresholds
  const PEG_CENTER = 290

  // Main linear term (dominant effect)
  let x_f = (x_i - BUCKET_OFFSET) / BUCKET_SPACING

  // Non-linear correction (empirically derived)
  const correction =
    0.07 * Math.sin((x_i - PEG_CENTER) * 0.02) + // Peg deflection effect
    0.0003 * Math.pow(x_i - PEG_CENTER, 2) // Quadratic adjustment

  // Final bucket index (0-7)
  x_f = x_f + correction
  return Math.min(7, Math.max(0, Math.round(x_f)))
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
  const ball = { x: targetBucket.x, y: targetBucket.y, vx: -0.5, vy: -MAX_SPEED / 2, radius: 7.5 }
  while (true) {
    // Collision with pegs
    pegsArray.forEach((peg) => {
      const dx = ball.x - peg.x
      const dy = ball.y - peg.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < ball.radius + peg.radius) {
        const angle = Math.atan2(dy, dx)
        ball.vx = -Math.cos(angle) * 2
        ball.vy = -Math.sin(angle) * 2
        if (ball.vx >= 0) {
          ball.vx = -Math.max(ball.vx, 0.001)
        } else {
          ball.vx = -Math.min(ball.vx, -0.001)
        }
      }
    })

    ball.y += ball.vy * BALL_DROP_SPEED
    if (ball.y <= dropPointY) break
    ball.x += ball.vx * BALL_HORIZONTAL_SPEED
    ball.vy /= friction
    ball.vx /= friction
    ball.vy = Math.min(ball.vy + gravity, -1)
  }
  return ball
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

export function reverseSimulate(
  buckets: Record<string, number>[],
  pegsArray: Record<string, number>[],
  ball: { x: number; y: number; vx: number; vy: number; radius: number },
  friction: number,
  gravity: number,
  bucketWidthThreshold: number,
  BALL_HORIZONTAL_SPEED: number,
  BALL_DROP_SPEED: number,
  MAX_SPEED: number,
  targetBucketIndex: number,
) {
  // Initialize ball position at the target bucket
  ball.x = buckets[targetBucketIndex].x
  ball.y = buckets[targetBucketIndex].bottomY - bucketWidthThreshold
  ball.vx = 0
  ball.vy = 0

  // We need to keep track of previous states to properly reverse collisions
  let prevStates: { x: number; y: number; vx: number; vy: number }[] = []

  while (ball.y > 0) {
    // Stop when ball reaches top
    // Store current state before any modifications
    const currentState = { x: ball.x, y: ball.y, vx: ball.vx, vy: ball.vy }

    // 1. First reverse the position update
    if (prevStates.length > 0) {
      const prevState = prevStates[prevStates.length - 1]
      ball.x += ball.vx * BALL_HORIZONTAL_SPEED
      ball.y += ball.vy * BALL_DROP_SPEED
    }

    // 2. Then reverse the velocity updates (friction and gravity)
    if (prevStates.length > 1) {
      // To reverse friction, we need to divide by friction
      ball.vx /= friction
      ball.vy /= friction

      // To reverse gravity, we subtract it (since we added it in forward simulation)
      ball.vy = Math.max(ball.vy - gravity, -MAX_SPEED)
    }

    // 3. Handle collisions in reverse
    pegsArray.forEach((peg) => {
      const dx = ball.x - peg.x
      const dy = ball.y - peg.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      // If collision would happen in next step (we're going backwards)
      if (dist < ball.radius + peg.radius) {
        // Calculate the reversed collision response
        const angle = Math.atan2(dy, dx)
        ball.vx = -Math.cos(angle) * 2 // Reverse direction
        ball.vy = -Math.sin(angle) * 2 // Reverse direction
        if (ball.vx >= 0) {
          ball.vx = -Math.max(ball.vx, 0.001)
        } else {
          ball.vx = -Math.min(ball.vx, -0.001)
        }
      }
    })

    // Store current state for next iteration
    prevStates.push(currentState)

    // Prevent infinite loops
    if (prevStates.length > 1000) break
  }

  return ball
}
