import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  FieldSize,
  FormConfig,
  InputType,
} from 'src/app/shared/components/custom-form/form-config';
import { RegistrationActions } from 'src/app/store/actions/registration.actions';
import { RegistrationStep } from 'src/app/store/models/registration.model';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss'],
})
export class BusinessDetailsComponent {
  constructor(private store: Store<AppState>) {}
  formFields: FormConfig[] = [
    {
      key: 'name',
      type: InputType.TEXT,
      fieldSize: FieldSize.FULL,
      placeholder: 'Company/Business name',
    },
  ];

  onSave(formValue) {
    try {
      const { name } = formValue;
      this.store.dispatch(RegistrationActions.setClientBusinessName({ name }));
      this.store.dispatch(
        RegistrationActions.setCurrentStep({
          step: RegistrationStep.AUTHENTICATION_DETAILS,
        })
      );
    } catch (e) {
      console.error('Failed to save business details');
    }
  }
}
