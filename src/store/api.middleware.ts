import { authService } from '@/services/authentication/auth.service'
import { userService } from '@/services/user/user.service'

export const apiMiddleware = [authService.middleware, userService.middleware]
