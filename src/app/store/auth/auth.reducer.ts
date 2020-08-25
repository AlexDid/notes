import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../core/models';


export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
  isLoading: boolean;
}

export const initialState: AuthState = {
  user: null,
  isLoading: false,
};


export const reducer = createReducer(
  initialState,

  on(AuthActions.loginEmail, state => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.signUpEmail, state => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.loginGoogle, state => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.authSuccess, (state, {user}) => ({
    ...state,
    user,
    isLoading: false
  })),

  on(AuthActions.authError, state => ({
    ...state,
    isLoading: false
  })),

  on(AuthActions.logout, () => initialState),
);


export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
