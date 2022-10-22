import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from "@angular/material/snack-bar";

import * as SnackBarActions from './snack-bar.actions';
import { pipe, tap, delay, map } from 'rxjs';

@Injectable()
export class SnackbarEffects {
  openSnackBar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SnackBarActions.openSnackBar),
      tap((payload) => this.matSnackBar.open(payload?.message, payload?.action, payload?.config)),
      delay(1000),
      map(() => SnackBarActions.closeSnackBar())
    );
  });

  closeSnackBar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SnackBarActions.closeSnackBar),
      pipe(
        tap(() => this.matSnackBar.dismiss())
      )
    );
  }, { dispatch: false });

  constructor(private actions$: Actions, private matSnackBar: MatSnackBar) { }
}
