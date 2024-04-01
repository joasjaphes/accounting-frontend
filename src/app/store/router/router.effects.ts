import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import * as routerActions from "./router.actions";
import { tap } from "rxjs/operators";

@Injectable()
export class RouterEffects {
  constructor(private router: Router, private actions$: Actions) {}

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerActions.go),
        tap((action) => {
          this.router.navigate(action.path)
        })
      ),
    { dispatch: false }
  );
}
