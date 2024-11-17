import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { BinLocationActions } from './bin-location.action';
import { BinLocation } from './bin-location.model';
import { BinLocationService } from '../../services/bin-location.service';

@Injectable()
export class BinLocationEffect {
  constructor(
    private actions$: Actions,
    private binLocationService: BinLocationService,
    private store: Store<AppState>
  ) {}

  loadBinLocations$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BinLocationActions.loadBinLocations),
        tap(() =>
          this.binLocationService
            .getBinLocations()
            .then((binLocations: BinLocation[]) => {
              if (binLocations.length) {
                this.store.dispatch(
                  BinLocationActions.upsertBinLocations({
                    binLocations,
                  })
                );
              }
              this.store.dispatch(BinLocationActions.doneLoadingBinLocations());
            })
        )
      ),
    { dispatch: false }
  );
}
