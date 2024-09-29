import { authService } from '@/services/authentication/auth.api'
import { userService } from '@/services/user/user.api'

export const APIsReducers = {
  [authService.reducerPath]: authService.reducer,
  [userService.reducerPath]: userService.reducer,
}
