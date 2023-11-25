import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import * as fromRouter from './router.reducer';
import * as fromUserReducer from './user.reducer';
import * as fromAccountReducer from './account.reducer';
import * as fromTransactionReducer from './transaction.reducer';
import * as fromRegistrationReducer from './registration.reducer';

export interface AppState {
  router: RouterReducerState;
  user: fromUserReducer.State;
  account: fromAccountReducer.State;
  transaction: fromTransactionReducer.State;
  registration: fromRegistrationReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  user: fromUserReducer.reducer,
  account: fromAccountReducer.reducer,
  transaction: fromTransactionReducer.reducer,
  registration: fromRegistrationReducer.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
