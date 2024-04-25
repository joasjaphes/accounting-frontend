import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { JournalEntryService } from '../../services/journal-entry.service';
import { JournalEntryActions } from './journal-entry.actions';
import { JournalEntry } from './journal-entry.model';

@Injectable()
export class JournalEntryEffect {
  constructor(
    private actions$: Actions,
    private journalService: JournalEntryService,
    private store: Store<AppState>
  ) {}

  loadJournalEntries$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(JournalEntryActions.loadJournalEntries),
        tap(() =>
          this.journalService
            .getJournalEntries()
            .then((journals: JournalEntry[]) => {
              this.store.dispatch(
                JournalEntryActions.upsertJournalEntries({ journals })
              );
              this.store.dispatch(
                JournalEntryActions.doneloadingJournalEntries()
              );
            })
        )
      ),
    { dispatch: false }
  );
}
