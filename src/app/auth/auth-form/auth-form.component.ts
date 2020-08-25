import { Component, Input, OnInit } from '@angular/core';
import { NestedFormComponent } from '../../core/models';
import { AuthForm } from '../models/auth-form';
import { Validators } from '@angular/forms';
import { passwordConfirmationValidator } from '../helpers/password-confirmation.validator';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent extends NestedFormComponent<AuthForm> implements OnInit {

  @Input()
  set passwordConfirmation(value: boolean) {
    this.showPasswordConfirmation = value;
    this.togglePasswordConfirmation();
  }

  get passwordConfirmation(): boolean {
    return this.showPasswordConfirmation;
  }

  private showPasswordConfirmation = false;

  ngOnInit(): void {
    super.ngOnInit();
    this.togglePasswordConfirmation();
  }

  // tslint:disable-next-line:no-any
  protected getFormGroup(): { [key in keyof AuthForm]: any } {
    return {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, passwordConfirmationValidator<AuthForm>('password')]],
    };
  }

  private togglePasswordConfirmation(): void {
    if (this.form) {
      const control = this.form.get('passwordConfirm' as keyof AuthForm);
      this.showPasswordConfirmation ? control.enable() : control.disable();
    }
  }

}
