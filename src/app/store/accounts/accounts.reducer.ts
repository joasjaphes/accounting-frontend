import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Account } from './account.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as accountActions from './accounts.actions';

export const featureKey = 'accounts';

export interface State extends EntityState<Account> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Account> = createEntityAdapter<Account>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const accountsReducer = createReducer(
  initialState,
  on(accountActions.loadAccounts, (state) => ({
    ...state,
    loading: true,
  })),
  on(accountActions.doneLoadingAccounts, (state) => ({
    ...state,
    loading: false,
    loaded: true,
  })),
  on(accountActions.upsertAccount, (state, { account }) => {
    return adapter.upsertOne(account, state);
  }),
  on(accountActions.upsertAccounts, (state, { accounts }) => {
    return adapter.upsertMany(accounts, state);
  }),
  on(accountActions.deleteAccount, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(accountActions.deleteAccounts, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(accountActions.clearAccounts, (state) => {
    return adapter.removeAll(state);
  })
);

export const { selectAll, selectEntities } = adapter.getSelectors();
export const selectLoading = (state: State) => state.loading;
export const selectLoaded = (state: State) => state.loaded;

export function reducer(state: State | undefined, action: Action) {
  return accountsReducer(state, action);
}
