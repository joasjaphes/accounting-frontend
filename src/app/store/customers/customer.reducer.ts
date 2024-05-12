import { createReducer, on } from '@ngrx/store';
import { CustomerActions } from './customer.actions';

export const customerFeatureKey = 'customer';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

