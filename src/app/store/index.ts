import {
  Action,
} from '@ngrx/store';
import { MergedRouteReducerState, routerFeatureKey } from '../core/modules/router';
import { routerReducer } from '@ngrx/router-store';
import { Type } from '@angular/core';
import { AuthEffects, authFeatureKey, authReducer, AuthState } from './auth';

type Reducer<T> = (feature: T, action: Action) => T;
type FeatureStates = MergedRouteReducerState | AuthState;

export interface AppState {
  [routerFeatureKey]: MergedRouteReducerState;
  [authFeatureKey]: AuthState;
}

export const reducers: {[K in keyof AppState]: Reducer<Extract<FeatureStates, AppState[K]>>} = {
  [routerFeatureKey]: routerReducer,
  [authFeatureKey]: authReducer
};

// tslint:disable-next-line:no-any
export const appEffects: Type<any>[] = [AuthEffects];
