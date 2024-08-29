import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    data: {
      user: {
        email: 'example@gmail.com',
        jwt_token: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto explicabo fuga reiciendis nostrum? Amet est maiores sed vel molestiae minima?',
        name: 'Max',
        signed: true,
      },
    },
  })
}
