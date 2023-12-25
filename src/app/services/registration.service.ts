import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import * as registrationSelector from '../store/selectors/registration.selectors';
import { firstValueFrom } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { RegistrationActions } from '../store/actions/registration.actions';
import { set } from 'cypress/types/lodash';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(
    private store: Store<AppState>,
    private http: HttpClientService
  ) {}

   saveRegistrationDetails(data) {
    try {
        return this.http.post('registration', data);
    } catch (e) {
      throw e;
    }
  }
}
