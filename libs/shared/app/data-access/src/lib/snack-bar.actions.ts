import { createAction, emptyProps, props } from '@ngrx/store';
import { MatSnackBarConfig } from "@angular/material/snack-bar";

type SnackBarPayload = {
  message: string,
  action?: string,
  config?: MatSnackBarConfig
}

export const openSnackBar = createAction(
  '[Snackbar] Open Snackbar',
  props<SnackBarPayload>()
);

export const closeSnackBar = createAction(
  '[Snackbar] Close Snackbar',
  emptyProps
);
