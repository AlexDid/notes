import { createAction, props } from '@ngrx/store';
import { EmailLogin } from './models/email-login';
import { ErrorDto } from '../../core/models';
import { UserDto } from './models/user.dto';

export const checkLoginStatus = createAction(
  '[Auth] Check Login Status'
);
export const checkLoginStatusSuccess = createAction(
  '[Auth] Check Login Status Success',
  props<UserDto>()
);
export const checkLoginStatusError = createAction(
  '[Auth] Check Login Status Error'
);

export const loginEmail = createAction(
  '[Auth] Login Email',
  props<EmailLogin>()
);
export const signUpEmail = createAction(
  '[Auth] SignUp Email',
  props<EmailLogin>()
);
export const loginGoogle = createAction(
  '[Auth] Login Google'
);

export const authSuccess = createAction(
  '[Auth] Auth Success',
  props<UserDto>()
);
export const authError = createAction(
  '[Auth] Auth Error',
  props<ErrorDto>()
);

export const logout = createAction(
  '[Auth] Logout'
);




