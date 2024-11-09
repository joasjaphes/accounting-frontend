import { Action, createReducer, on } from '@ngrx/store';
import { FinancialPeriodActions } from './financial-period.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { FinancialPeriod } from './financial-period.model';

export const financialPeriodFeatureKey = 'financial-period';
export const adapter: EntityAdapter<FinancialPeriod> = createEntityAdapter();

export interface State extends EntityState<FinancialPeriod> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const financialPeriodReducer = createReducer(
  initialState,
  on(FinancialPeriodActions.loadFinancialPeriods, (state) => {
    return { ...state, loading: true };
  }),
  on(FinancialPeriodActions.doneLoadingFinancialPeriods, (state) => {
    return { ...state, loading: false };
  }),
  on(FinancialPeriodActions.upsertFinancialPeriod, (state, { financialPeriod }) => {
    return adapter.upsertOne(financialPeriod, state);
  }),
  on(FinancialPeriodActions.upsertFinancialPeriods, (state, { financialPeriods }) => {
    return adapter.upsertMany(financialPeriods, state);
  }),
  on(FinancialPeriodActions.deleteFinancialPeriod, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(FinancialPeriodActions.deleteFinancialPeriods, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(FinancialPeriodActions.clearFinancialPeriods, (state) => {
    return adapter.removeAll(state);
  })
);

export const getLoading = (state: State) => state.loading;

export function reducer(state: State, action: Action | undefined) {
  return financialPeriodReducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();
