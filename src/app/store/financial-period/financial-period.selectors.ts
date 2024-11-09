import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './financial-period.reducer';

export const financialPeriodState = createFeatureSelector<fromReducer.State>(
  fromReducer.financialPeriodFeatureKey
);
export const selectAll = createSelector(financialPeriodState, fromReducer.selectAll);
export const selectEntities = createSelector(
  financialPeriodState,
  fromReducer.selectEntities
);
export const selectLoading = createSelector(
  financialPeriodState,
  fromReducer.getLoading
);
export const selectById = (id: string) =>
  createSelector(selectAll, (stores) =>
    stores.find((store) => store.id === id)
  );
