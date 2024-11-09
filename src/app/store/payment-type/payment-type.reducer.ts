import { Action, createReducer, on } from '@ngrx/store';
import { PaymentTypeActions } from './payment-type.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { PaymentType } from './payment-type.model';

export const paymentTypeFeatureKey = 'payment-type';
export const adapter: EntityAdapter<PaymentType> = createEntityAdapter();

export interface State extends EntityState<PaymentType> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const paymentTypeReducer = createReducer(
  initialState,
  on(PaymentTypeActions.loadPaymentTypes, (state) => {
    return { ...state, loading: true };
  }),
  on(PaymentTypeActions.doneLoadingPaymentTypes, (state) => {
    return { ...state, loading: false };
  }),
  on(PaymentTypeActions.upsertPaymentType, (state, { paymentType }) => {
    return adapter.upsertOne(paymentType, state);
  }),
  on(PaymentTypeActions.upsertPaymentTypes, (state, { paymentTypes }) => {
    return adapter.upsertMany(paymentTypes, state);
  }),
  on(PaymentTypeActions.deletePaymentType, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(PaymentTypeActions.deletePaymentTypes, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(PaymentTypeActions.clearPaymentTypes, (state) => {
    return adapter.removeAll(state);
  })
);

export const getLoading = (state: State) => state.loading;

export function reducer(state: State, action: Action | undefined) {
  return paymentTypeReducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();
