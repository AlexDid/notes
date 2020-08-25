import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.reducer';

export const getAuthFeatureState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectUserInfo = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state?.user
);

export const selectIsAuthFormLoading = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state?.isLoading
);
