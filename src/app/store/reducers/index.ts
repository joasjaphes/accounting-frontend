import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import * as fromRouter from './router.reducer';
import * as fromUserReducer from './user.reducer';
import * as fromAccountReducer from './account.reducer';
import * as fromTransactionReducer from '../reducers/transaction.reducer';


export interface AppState {
  router: RouterReducerState;
  user: fromUserReducer.State;
  account: fromAccountReducer.State;
  transaction:fromTransactionReducer.State
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  user: fromUserReducer.reducer,
  account: fromAccountReducer.reducer,
  transaction:fromTransactionReducer.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
