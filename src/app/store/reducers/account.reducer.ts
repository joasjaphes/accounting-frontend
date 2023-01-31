import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Account } from '../models/account.model';
import * as accountActions from '../actions/account.actions';


export const accountFeatureKey = 'account';

const adapter: EntityAdapter<Account> = createEntityAdapter();

export interface State extends EntityState<Account> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export const accountReducer = createReducer(
  initialState,
  on(accountActions.upsertAccounts, (state, action) => {
    return adapter.upsertMany(action.accounts, state);
  }),
  on(accountActions.upsertAccount, (state, action) => {
    return adapter.upsertOne(action.account, state);
  }),
  on(accountActions.loadAccounts, (state) => {
    return { ...state, loading: true, loaded: false };
  }),
  on(accountActions.doneLoading, (state) => {
    return { ...state, loading: false, loaded: true };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return accountReducer(state, action);
}

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const {
  selectAll,
  selectEntities,
  selectIds,
} = adapter.getSelectors();
