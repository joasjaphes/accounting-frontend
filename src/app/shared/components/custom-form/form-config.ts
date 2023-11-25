import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface FormConfig {
  key: string;
  value?: any;
  type: InputType.TEXT | InputType.NUMBER | InputType.OPTIONS;
  options?: InputOption[];
  validators?: ((control: AbstractControl) => ValidationErrors)[];
  fieldSize: FieldSize.FULL | FieldSize.HALF;
  placeholder?: string;
  filled?: string;
  fillColor?: string;
  borderColor?: string;
  textColor?:string;
  errors?: { key: string; message: string }[];
  icon?: string;
  label?: string;
  opacity?: number;
  formType?:FormType.CUSTOM | FormType.FORMFIELD
}

export enum FormType {
  CUSTOM = 'custom',
  FORMFIELD = 'mat-form',
}

export interface InputOption {
  valueKey: string;
  label: string;
}

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  OPTIONS = 'options',
}

export enum FieldSize {
  HALF = 'col-sm-12 col-lg-6',
  FULL = 'col-sm-12 col-lg-12',
}
