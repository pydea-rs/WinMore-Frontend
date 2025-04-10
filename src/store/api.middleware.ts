import { AuthService } from '@/services/authentication/auth.service'
import { GamesService } from '@/services/games/games.service'
import { MineService } from '@/services/games/mine/mine.service'
import { PlinkoService } from '@/services/games/plinko/plinko.service'
import { UserService } from '@/services/user/user.service'

export const apiMiddleware = [AuthService.middleware, UserService.middleware, MineService.middleware, GamesService.middleware, PlinkoService.middleware]
