import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './store-setup.reducer';

export const storeSetupState = createFeatureSelector<fromReducer.State>(
  fromReducer.storeSetupFeatureKey
);
export const selectAll = createSelector(storeSetupState, fromReducer.selectAll);
export const selectEntities = createSelector(
  storeSetupState,
  fromReducer.selectEntities
);
export const selectLoading = createSelector(
  storeSetupState,
  fromReducer.getLoading
);
export const selectById = (id: string) =>
  createSelector(selectAll, (stores) =>
    stores.find((store) => store.id === id)
  );
