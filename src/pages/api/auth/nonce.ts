import { NextApiRequest, NextApiResponse } from 'next'

// Helper function to generate a random 24-character string
const generateNonce = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let nonce = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    nonce += characters[randomIndex]
  }
  return nonce
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Generate a 24-character random string
  const nonce = generateNonce(35)

  // Send the nonce as a response
  res.status(200).json({ data: { nonce } })
}
