import { Action, createReducer, on } from '@ngrx/store';
import { CustomerActions } from './customer.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Customer } from './customer.model';

export const customerFeatureKey = 'customer';

export const adapter: EntityAdapter<Customer> = createEntityAdapter();

export interface State extends EntityState<Customer> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomers, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CustomerActions.doneLoadingCustomers, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(CustomerActions.upsertCustomer, (state, { customer }) => {
    return adapter.upsertOne(customer, state);
  }),
  on(CustomerActions.upsertCustomers, (state, { customers }) => {
    return adapter.upsertMany(customers, state);
  }),
  on(CustomerActions.deleteCustomer, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(CustomerActions.deleteCustomers, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(CustomerActions.clearCustomers, (state) => {
    return adapter.removeAll(state);
  })
);

export const getLoading = (state: State) => state.loading;

export const { selectAll, selectEntities } = adapter.getSelectors();

export function reducer(state: State, action: Action | undefined) {
  return customerReducer(state, action);
}
