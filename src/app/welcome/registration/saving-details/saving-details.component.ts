import { Component, OnInit } from '@angular/core';
import * as registrationSelector from '../../../store/selectors/registration.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Observable, first, firstValueFrom } from 'rxjs';
import { RegistrationActions } from 'src/app/store/actions/registration.actions';

@Component({
  selector: 'app-saving-details',
  templateUrl: './saving-details.component.html',
  styleUrls: ['./saving-details.component.scss'],
})
export class SavingDetailsComponent implements OnInit {
  savingData$: Observable<boolean>;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.savingData$ = this.store.select(registrationSelector.getSavingData);
    this.onSave().then();
  }

  async onSave() {
    try {
      const details = await firstValueFrom(
        this.store.pipe(
          select(registrationSelector.getClientData),
          first((i) => !!i)
        )
      );
      console.log('details', details);
      this.store.dispatch(
        RegistrationActions.saveRegistrationDetails({ clientDetails: details })
      );
    } catch (e) {
      console.error('Failed to save details', e);
    }
  }
}
