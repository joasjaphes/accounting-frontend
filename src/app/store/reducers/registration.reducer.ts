import { Action, createReducer, on } from '@ngrx/store';
import { RegistrationActions } from '../actions/registration.actions';
import { Registration } from '../models/registration.model';
import { state } from '@angular/animations';

export const registrationFeatureKey = 'registration';

export type _RegistrationStep =
  | 'Client Details'
  | 'Business Details'
  | 'Authentication Details';

export interface State {
  clientName: string;
  clientEmail: string;
  clientBusinessName: string;
  clientPassword: string;
  currentRegistrationStep: _RegistrationStep;
  nextRegistrationStep: _RegistrationStep;
  savingData: boolean;
}

export const initialState: State = {
  clientName: '',
  clientEmail: '',
  clientBusinessName: '',
  clientPassword: '',
  currentRegistrationStep: 'Client Details',
  nextRegistrationStep: 'Business Details',
  savingData: false,
};

export const registrationReducer = createReducer(
  initialState,
  on(RegistrationActions.setClientName, (state, { name }) => {
    return { ...state, clientName: name };
  }),
  on(RegistrationActions.setClientBusinessName, (state, { name }) => {
    return { ...state, clientBusinessName: name };
  }),
  on(RegistrationActions.setClientEmail, (state, { email }) => {
    return { ...state, clientEmail: email };
  }),
  on(RegistrationActions.setClientPassword, (state, { password }) => {
    return { ...state, clientPassword: password };
  }),
  on(RegistrationActions.setNextStep, (state, { step }) => {
    return { ...state, nextRegistrationStep: step };
  }),
  on(RegistrationActions.setCurrentStep, (state, { step }) => {
    return { ...state, currentRegistrationStep: step };
  }),
  on(RegistrationActions.saveRegistrationDetails, (state) => {
    return { ...state, savingData: true };
  }),
  on(RegistrationActions.doneSaveRegistrationDetails, (state) => {
    return { ...state, savingData: false };
  })
);

export function reducer(state: State, action: Action) {
  return registrationReducer(state, action);
}

export const getClientName = (state: State) => state.clientName;
export const getClientBusinessName = (state: State) => state.clientBusinessName;
export const getClientEmail = (state: State) => state.clientEmail;
export const getClientPassword = (state: State) => state.clientPassword;
export const getSavingData = (state: State) => state.savingData;
export const getCurrentRegistrationStep = (state: State) =>
  state.currentRegistrationStep;
export const getNextRegistrationStep = (state: State) =>
  state.nextRegistrationStep;
