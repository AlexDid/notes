import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MergedRouteReducerState, routerFeatureKey } from '../../core/modules/router';

export const selectRouterReducerState = createFeatureSelector<MergedRouteReducerState>(routerFeatureKey);

export const selectMergedRoute = createSelector(
  selectRouterReducerState,
  (routerReducerState) => routerReducerState?.state
);
