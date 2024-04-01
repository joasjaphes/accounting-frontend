import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  confirmPasswordValidator,
  passwordValidator,
} from '../shared/validators/password';
import { RegistrationService } from '../services/registration.service';
import { CommonService } from '../services/common.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,MatInputModule, NgIf],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  savingData = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        companyName: ['', Validators.required],
        password: ['', [Validators.required, passwordValidator]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: [confirmPasswordValidator] }
    );
  }

  hasError(key: string, error: string): boolean {
    return this.registrationForm.get(key).hasError(error);
  }

  touched(key: string): boolean {
    return this.registrationForm.get(key).touched;
  }

  async onSubmit() {
    this.savingData = true;
    try {
      const data = this.registrationForm.value;
      const companyId = this.commonService.makeId();
      const userId = this.commonService.makeId();
      const userPayload = {
        id: userId,
        companyId,
        firstName: data.firstName,
        surname: data.surname,
        email: data.email,
        phoneNumber: data.phoneNumber,
        username: data.email,
        password: data.password,
        role: 'user',
      };
      const companyPayload = {
        id: companyId,
        name: data.companyName,
      };
      await this.registrationService.registerCompany(companyPayload);
      await this.registrationService.registerUser(userPayload);
      // simulate a network request that takes 5 seconds
      setTimeout(() => {
        this.savingData = false;
        this.router.navigate(['login']);
        console.log(data);
      }, 5000);
    } catch (e) {
      console.error(e);
    }
  }
}
