import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Transaction } from '../models/transaction.model';
import * as transactionActions from '../actions/transaction.actions';


export const transactionFeatureKey = 'transaction';

export const adapter: EntityAdapter<Transaction> = createEntityAdapter();

export interface State extends EntityState<Transaction> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false
});

export const transactionReducer = createReducer(
  initialState,
  on(transactionActions.upsertTransaction, (state, action) => {
    return adapter.upsertOne(action.transaction, state);
  }),
  on(transactionActions.upsertTransactions, (state, action) => {
    return adapter.upsertMany(action.transactions, state);
  }),
  on(transactionActions.loadTransactions, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false
    };
  }),
  on(transactionActions.doneLoadingTransactions, (state) => {
    return {
      ...state,
      loading: false,
      loaded: true
    };
  }),
  on(transactionActions.deleteTransaction, (state, action) => {
    return adapter.removeOne(action.transactionId, state);
  })
);

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export function reducer(state: State | undefined, action: Action) {
  return transactionReducer(state, action);
}

export const {
  selectAll,
  selectEntities
} = adapter.getSelectors();
