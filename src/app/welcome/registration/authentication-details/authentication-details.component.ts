import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FieldSize,
  FormConfig,
  InputType,
} from 'src/app/shared/components/custom-form/form-config';
import { RegistrationActions } from 'src/app/store/actions/registration.actions';
import { AppState } from 'src/app/store/reducers';
import * as registrationSelector from '../../../store/selectors/registration.selectors';
import { firstValueFrom } from 'rxjs';
import { RegistrationStep } from 'src/app/store/models/registration.model';

@Component({
  selector: 'app-authentication-details',
  templateUrl: './authentication-details.component.html',
  styleUrls: ['./authentication-details.component.scss'],
})
export class AuthenticationDetailsComponent {
  constructor(private store: Store<AppState>) {}
  formFields: FormConfig[] = [
    {
      key: 'password',
      fieldSize: FieldSize.FULL,
      type: InputType.TEXT,
      placeholder: 'Set password',
    },
  ];

  async onSave(formValue) {
    try {
      const { password } = formValue;
      this.store.dispatch(RegistrationActions.setClientPassword({ password }));
      this.store.dispatch(
        RegistrationActions.setCurrentStep({
          step: RegistrationStep.SAVING_DATA,
        })
      );
    } catch (e) {
      console.error('Failed to set password', e);
    }
  }
}
