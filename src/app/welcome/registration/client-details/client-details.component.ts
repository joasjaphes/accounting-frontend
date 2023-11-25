import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fadeIn } from 'src/app/shared/animations/router-animation';
import {
  FieldSize,
  FormConfig,
  InputType,
} from 'src/app/shared/components/custom-form/form-config';
import { RegistrationActions } from 'src/app/store/actions/registration.actions';
import { RegistrationStep } from 'src/app/store/models/registration.model';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
  animations: [fadeIn],
})
export class ClientDetailsComponent {
  constructor(private store: Store<AppState>) {}
  clientName: string;
  clientPhone: string;
  clientEmail: string;

  formFields: FormConfig[] = [
    {
      key: 'name',
      fieldSize: FieldSize.FULL,
      type: InputType.TEXT,
      placeholder: 'Full name',
      validators: [Validators.required],
      errors: [{ key: 'required', message: '*This field is required' }],
    },
    {
      key: 'email',
      fieldSize: FieldSize.FULL,
      type: InputType.TEXT,
      placeholder: 'Email address',
      validators: [Validators.required, Validators.email],
      errors: [
        { key: 'required', message: '*This field is required' },
        { key: 'email', message: '*Email is invalid' },
      ],
    },
  ];

  onSave(formConfig) {
    const { name, email } = formConfig;
    this.store.dispatch(RegistrationActions.setClientName({ name }));
    this.store.dispatch(RegistrationActions.setClientEmail({ email }));
    this.store.dispatch(
      RegistrationActions.setCurrentStep({
        step: RegistrationStep.BUSINESS_DETAILS,
      })
    );
  }
}
