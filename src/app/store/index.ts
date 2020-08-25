import {
  Action,
} from '@ngrx/store';
import { MergedRouteReducerState, routerFeatureKey } from '../core/modules/router';
import { routerReducer } from '@ngrx/router-store';
import { Type } from '@angular/core';

type Reducer<T> = (feature: T, action: Action) => T;
type FeatureStates = MergedRouteReducerState;

export interface AppState {
  [routerFeatureKey]: MergedRouteReducerState;
}

export const reducers: {[K in keyof AppState]: Reducer<Extract<FeatureStates, AppState[K]>>} = {
  [routerFeatureKey]: routerReducer,
};

// tslint:disable-next-line:no-any
export const appEffects: Type<any>[] = [];
