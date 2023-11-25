import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { fadeIn } from 'src/app/shared/animations/router-animation';
import {
  FieldSize,
  FormConfig,
  InputType,
} from 'src/app/shared/components/custom-form/form-config';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
  animations: [fadeIn],
})
export class ClientDetailsComponent {
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
}
