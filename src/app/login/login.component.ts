import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { go } from '../store/router/router.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  savingData = false;
  isWrongUserName = false;
  isWrongPassword = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hasError(key: string, error: string): boolean {
    return this.loginForm.get(key).hasError(error);
  }

  touched(key: string): boolean {
    return this.loginForm.get(key).touched;
  }

  async onLogin() {
    this.savingData = true;
    try {
      const credentials = this.loginForm.value;
      const user = await this.userService.login({
        username: credentials.email,
        password: credentials.password,
      });
      this.store.dispatch(go({ path: ['', 'home'] }));
      console.log('Logged in user', user);
    } catch (e) {
      if (e.error.message === 'Wrong username provided') {
        this.isWrongUserName = true;
        this.loginForm.get('email').setErrors({ wrong: true });
      } else if (e.error.message === 'Wrong password provided') {
        this.isWrongPassword = true;
        this.loginForm.get('password').setErrors({ wrong: true });
      }
      console.error('Failed to login', e);
    }
    this.savingData = false;
  }
}
