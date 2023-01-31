import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPass = control.get('confirmPass');
    const valid = (password && confirmPass) && password.value === confirmPass.value;
    return !valid ? { confirmPass: true } : null;
};