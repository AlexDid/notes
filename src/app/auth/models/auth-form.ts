import { EmailLogin } from '../../store/auth';

export interface AuthForm extends EmailLogin {
  passwordConfirm: string;
}
