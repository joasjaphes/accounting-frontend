import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { _RegistrationStep } from '../reducers/registration.reducer';

export const RegistrationActions = createActionGroup({
  source: 'Registration',
  events: {
    'Load Registrations': emptyProps(),
    'Load Registrations Success': props<{ data: unknown }>(),
    'Load Registrations Failure': props<{ error: unknown }>(),
    'Set Client Name': props<{ name: string }>(),
    'Set Client Business Name': props<{ name: string }>(),
    'Set Client Email': props<{ email: string }>(),
    'Set Client Password': props<{ password: string }>(),
    'Set Next Step': props<{ step: _RegistrationStep }>(),
    'Set Current Step': props<{ step: _RegistrationStep }>(),
  },
});
