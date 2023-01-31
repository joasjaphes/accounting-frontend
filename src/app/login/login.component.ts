import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable, of } from 'rxjs';
import { HttpClientService } from '../services/http-client.service';
import { fadeIn } from '../shared/animations/router-animation';
import { go } from '../store/actions/router.actions';
import { addCurrentUser } from '../store/actions/user.actions';
import { User } from '../store/models/user.model';
import { AppState } from '../store/reducers';

@Component({
  selector: 'accounting-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[fadeIn],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError$: Observable<string>;


  constructor(private formBuilder: FormBuilder, private http: HttpClientService, private store: Store<AppState>) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log();
  }

  async login() {
    this.loginError$ = of();
    const credentials = this.loginForm.value;
    try {
      const user: User = await firstValueFrom(this.http.post('signin', credentials) as Observable<User>);
      console.log('User', user);
      localStorage.setItem('accounting-token', user.token ?? '');
      localStorage.setItem('accounting-user', JSON.stringify(user));
      this.store.dispatch(addCurrentUser({ user }));
      this.store.dispatch(go({ route: { path: ['/'] } }));
    } catch (e: unknown) {
      const errorObject: HttpErrorResponse = <HttpErrorResponse>e;
      this.loginError$ = of(errorObject.error.message);
    }
  }

}
