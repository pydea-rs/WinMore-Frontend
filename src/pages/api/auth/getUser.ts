import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    data: {
      user: {
        email: 'example@gmail.com',
        jwt_token: 'test_jwt_token',
        name: 'Max',
        signed: true,
      },
    },
  })
}
