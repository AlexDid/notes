import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';
import { ErrorSnackbarHelper } from '../../core/helpers';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}



  @Effect()
  loginEmail$ = this.actions$.pipe(
    ofType(AuthActions.loginEmail),
    mergeMap(({email, password}) => fromPromise(this.authService.login(email, password)).pipe(
      map(user => AuthActions.authSuccess({user})),
      catchError(error => of(AuthActions.authError({ message: error.message || error })))
    ))
  );

  @Effect()
  signUpEmail$ = this.actions$.pipe(
    ofType(AuthActions.signUpEmail),
    mergeMap(({email, password}) => fromPromise(this.authService.signUp(email, password)).pipe(
      map(user => AuthActions.authSuccess({user})),
      catchError(error => of(AuthActions.authError({ message: error.message || error })))
    ))
  );

  @Effect()
  loginGoogle$ = this.actions$.pipe(
    ofType(AuthActions.loginGoogle),
    mergeMap(() => fromPromise(this.authService.loginGoogle()).pipe(
      map(user => AuthActions.authSuccess({user})),
      catchError(error => of(AuthActions.authError({ message: error.message || error })))
    ))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => this.router.navigate(['auth'])),
    tap(() => this.authService.logout()),
  );

  @Effect({ dispatch: false })
  showError$ = this.actions$.pipe(
    ofType(AuthActions.authError),
    tap(error => ErrorSnackbarHelper.showErrorSnackbar(this.snackbar, error.message))
  );

  @Effect({ dispatch: false })
  successLogin$ = this.actions$.pipe(
    ofType(AuthActions.authSuccess),
    tap(() => this.router.navigate(['/'])),
  );

}
