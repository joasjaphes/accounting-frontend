import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from '../reducers/registration.reducer';

export const registrationState = createFeatureSelector<fromReducer.State>(
  fromReducer.registrationFeatureKey
);
export const getClientName = createSelector(
  registrationState,
  fromReducer.getClientName
);

export const getClientEmail = createSelector(
  registrationState,
  fromReducer.getClientEmail
);

export const getClientBusinessName = createSelector(
  registrationState,
  fromReducer.getClientBusinessName
);

export const getClientPassword = createSelector(
  registrationState,
  fromReducer.getClientPassword
);

export const getCurrentRegistrationStep = createSelector(
  registrationState,
  fromReducer.getCurrentRegistrationStep
);

export const getNextRegistrationStep = createSelector(
  registrationState,
  fromReducer.getNextRegistrationStep
);
