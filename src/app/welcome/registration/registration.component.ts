import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { HttpClientService } from '../../services/http-client.service';
import {
  fadeIn,
  ROUTE_ANIMATIONS_ELEMENTS,
} from '../../shared/animations/router-animation';
import {
  FieldSize,
  FormConfig,
  InputType,
} from '../../shared/components/custom-form/form-config';
import { confirmPassword } from '../../shared/validators/confirm-pass';
import { go } from '../../store/actions/router.actions';
import { User } from '../../store/models/user.model';
import { AppState } from '../../store/reducers';
import * as registrationSelector from '../../store/selectors/registration.selectors';
import { _RegistrationStep } from '../../store/reducers/registration.reducer';
import { RegistrationStep } from '../../store/models/registration.model';

@Component({
  selector: 'accounting-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [fadeIn],
})
export class RegistrationComponent implements OnInit {
  loading = false;
  routeElements = ROUTE_ANIMATIONS_ELEMENTS;
  formFields: FormConfig[] = [];
  currentStep$: Observable<_RegistrationStep>;
  savingData$: Observable<boolean>;
  registrationStep = RegistrationStep;
  constructor(
    private store: Store<AppState>,
    private commonService: CommonService,
    private http: HttpClientService
  ) {}

  ngOnInit(): void {
    this.currentStep$ = this.store.pipe(
      select(registrationSelector.getCurrentRegistrationStep)
    );
    this.savingData$ = this.store.pipe(
      select(registrationSelector.getSavingData)
    );
  }

  async onSave(formData) {}

  onCancel() {
    this.store.dispatch(go({ route: { path: ['/login'] } }));
  }

  // get passwordMissmatch() {
  //   return this.registrationForm.get('confirmPass').touched && this.registrationForm.hasError('confirmPass');
  // }
}
