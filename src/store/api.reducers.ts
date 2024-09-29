import { authService } from '@/services/authentication/auth.service'
import { userService } from '@/services/user/user.service'

export const APIsReducers = {
  [authService.reducerPath]: authService.reducer,
  [userService.reducerPath]: userService.reducer,
}
