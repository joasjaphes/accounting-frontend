import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionStatus } from '../models/transaction.model';
import * as fromTransactionReducer from '../reducers/transaction.reducer';

export const selectTransationState =
  createFeatureSelector<fromTransactionReducer.State>(
    fromTransactionReducer.transactionFeatureKey
  );

export const selectAll = createSelector(
  selectTransationState,
  fromTransactionReducer.selectAll
);
export const selectEntities = createSelector(
  selectTransationState,
  fromTransactionReducer.selectEntities
);
export const selectPendingTransactions = createSelector(
  selectAll,
  (transactions) =>
    transactions.filter(
      (transaction) => transaction.status === TransactionStatus.PENDING
    )
);
