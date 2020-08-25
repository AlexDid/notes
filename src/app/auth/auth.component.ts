import { Component, OnInit } from '@angular/core';
import { AuthForm } from './models/auth-form';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store';
import { NestedFormDataDto, SubscriptionComponent } from '../core/models';
import * as AuthActions from '../store/auth/auth.actions';
import { selectIsAuthFormLoading } from '../store/auth/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends SubscriptionComponent implements OnInit {

  isLoading = false;
  isLogin = true;
  isFormValid = false;
  authForm: AuthForm = {
    email: '',
    password: '',
    passwordConfirm: ''
  };

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeOnAuthComplete();
  }


  setAuthForm(form: NestedFormDataDto<AuthForm>): void {
    this.authForm = form.value;
    this.isFormValid = form.valid;
  }

  submitForm(): void {
    if (this.isFormValid) {
      this.isLogin ? this.login() : this.signUp();
      this.authForm = {
        ...this.authForm,
        password: '',
        passwordConfirm: ''
      };
    }
  }

  googleLogin(): void {
    this.store.dispatch(AuthActions.loginGoogle());
  }

  toggleFormMode(): void {
    this.isLogin = !this.isLogin;
  }


  private login(): void {
    this.store.dispatch(AuthActions.loginEmail(this.authForm));
  }

  private signUp(): void {
    this.store.dispatch(AuthActions.signUpEmail(this.authForm));
  }

  private subscribeOnAuthComplete(): void {
    this.store.pipe(
      select(selectIsAuthFormLoading),
      this.getTakeUntilPipe()
    ).subscribe(isLoading => this.isLoading = isLoading);
  }

}
