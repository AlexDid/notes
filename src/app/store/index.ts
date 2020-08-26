import {
  Action,
} from '@ngrx/store';
import { MergedRouteReducerState, routerFeatureKey } from '../core/modules/router';
import { routerReducer } from '@ngrx/router-store';
import { Type } from '@angular/core';
import { AuthEffects, authFeatureKey, authReducer, AuthState } from './auth';
import { notesFeatureKey, NotesState, notesReducer } from './notes/notes.reducer';
import { NotesEffects } from './notes/notes.effects';

type Reducer<T> = (feature: T, action: Action) => T;
type FeatureStates = MergedRouteReducerState | AuthState | NotesState;

export interface AppState {
  [routerFeatureKey]: MergedRouteReducerState;
  [authFeatureKey]: AuthState;
  [notesFeatureKey]: NotesState;
}

export const reducers: {[K in keyof AppState]: Reducer<Extract<FeatureStates, AppState[K]>>} = {
  [routerFeatureKey]: routerReducer,
  [authFeatureKey]: authReducer,
  [notesFeatureKey]: notesReducer
};

// tslint:disable-next-line:no-any
export const appEffects: Type<any>[] = [AuthEffects, NotesEffects];
