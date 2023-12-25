import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { RegistrationActions } from '../actions/registration.actions';
import * as registrationSelector from '../selectors/registration.selectors';
import { RegistrationService } from 'src/app/services/registration.service';
import { switchMap } from 'rxjs/operators';
import { merge, tap } from 'cypress/types/lodash';
import { of, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';

@Injectable()
export class RegistrationEffects {
  constructor(
    private actions$: Actions,
    private registrationService: RegistrationService,
    private store: Store<AppState>
  ) {}

  saveRegistrationDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.saveRegistrationDetails),
      map((action) => {
        console.log('clientData', action.clientDetails);
        return RegistrationActions.doneSaveRegistrationDetails();
      })
    )
  );
}
