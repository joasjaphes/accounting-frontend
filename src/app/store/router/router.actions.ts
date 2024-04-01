import { createAction, props } from "@ngrx/store";

export const loadRouters = createAction("[Router] Load Routers");

export const loadRoutersSuccess = createAction("[Router] Load Routers Success", props<{ data: any }>());

export const loadRoutersFailure = createAction("[Router] Load Routers Failure", props<{ error: any }>());

export const go = createAction("[Router] Navigate route", props<{ path: any[] }>());
