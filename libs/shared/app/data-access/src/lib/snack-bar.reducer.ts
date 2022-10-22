import { createReducer, on } from '@ngrx/store';
import * as SnackBarActions from './snack-bar.actions';

export interface State {
  active: boolean;
}

export const initialState: State = {
  active: false
};

export const reducer = createReducer(
  initialState,
  on(SnackBarActions.openSnackBar, (state) => ({
    ...state,
    active: true
  })),
  on(SnackBarActions.closeSnackBar, (state) => ({
    ...state,
    active: false
  }))
);
