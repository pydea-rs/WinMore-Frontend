import { AuthService } from '@/services/authentication/auth.service'
import { MineService } from '@/services/games/mine/mine.service'
import { UserService } from '@/services/user/user.service'

export const apiMiddleware = [AuthService.middleware, UserService.middleware, MineService.middleware]
