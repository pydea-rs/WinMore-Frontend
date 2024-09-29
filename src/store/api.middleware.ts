import { authService } from '@/services/authentication/auth.api'
import { userService } from '@/services/user/user.api'

export const apiMiddleware = [authService.middleware, userService.middleware]
