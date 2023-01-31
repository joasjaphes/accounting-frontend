import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeIn } from '../../animations/router-animation';
import { FormConfig } from './form-config';

@Component({
  selector: 'accounting-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
  animations:[fadeIn]
})
export class CustomFormComponent implements OnInit {
  formObject: FormGroup;
  @Input() formFields: FormConfig[] = [];
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Input() savingData = false;
  @Input() loadingMessage = "Saving data..."

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const fieldConfig: { [key: string]: any; } = {};
    this.formFields.forEach(field => {
      fieldConfig[field.key] = [field.value, field.validators];
    });
    this.formFields = this.formFields.map(field => {
      if(field.placeholder && field.validators?.length && field.validators.includes(Validators.required)) {
        field.placeholder = field?.placeholder + ' *'
      }
      return field
    })
    this.formObject = this.formBuilder.group(fieldConfig);
  }

  hasError(field: FormConfig) {
    let errorExist = false;
    if (field.errors?.length) {
      for (const error of field.errors) {
        errorExist = this.hasSpecificError(field, error.key);
      }
    }
    return errorExist;
  }

  hasSpecificError(field: FormConfig, errorKey: string) {
    return this.formObject.get(field.key).touched && this.formObject.get(field.key).hasError(errorKey);
  }

  onSave() {
    this.save.emit(this.formObject.value);
  }

  onCancel() {
    this.cancel.emit();
  }

}
