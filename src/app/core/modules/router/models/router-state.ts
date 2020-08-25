import { Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

export interface RouterState {
  url: string;
  queryParams: Params;
  params: Params;
  data: object;
}

export type MergedRouteReducerState = RouterReducerState<RouterState>;
