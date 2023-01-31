import { createAction, props } from '@ngrx/store';
import { Transaction } from '../models/transaction.model';

export const loadTransactions = createAction(
  '[Transaction] Load Transactions'
);

export const doneLoadingTransactions = createAction('[Transaction] Done loading transactions');
export const upsertTransactions = createAction('[Transaction] Updating transaction store', props<{ transactions: Transaction[]; }>());
export const upsertTransaction = createAction('[Transaction] Update single transaction', props<{ transaction: Transaction; }>());
export const deleteTransaction = createAction('[Transaction] Delete transaction', props<{ transactionId: string; }>());