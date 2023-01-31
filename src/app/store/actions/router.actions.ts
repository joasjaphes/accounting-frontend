import { createAction, props } from '@ngrx/store';
import { Params } from '@angular/router';

export const loadRouters = createAction(
  '[Router] Load Routers'
);

export const go = createAction('[Router] Navigate to a given route', props<{ route: { path:unknown[], params?: Params; }; }>());




