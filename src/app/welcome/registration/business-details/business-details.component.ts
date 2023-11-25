import { Component } from '@angular/core';
import {
  FieldSize,
  FormConfig,
  InputType,
} from 'src/app/shared/components/custom-form/form-config';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss'],
})
export class BusinessDetailsComponent {
  formFields: FormConfig[] = [
    {
      key: 'name',
      type: InputType.TEXT,
      fieldSize: FieldSize.FULL,
      placeholder: 'Company/Business name',
    },
  ];
}
