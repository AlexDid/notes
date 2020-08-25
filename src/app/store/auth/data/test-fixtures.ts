import { EmailLogin } from '..';
import { ErrorDto, User } from '../../../core/models';

export const credentials: EmailLogin = {
  email: 'test@test.com',
  password: 'qwe12345'
};
export const user: User = {
  displayName: 'test',
  email: credentials.email,
  photoURL: 'https://google.com',
  uid: 'f3ubf3f93nf0'
};
export const error: ErrorDto = {
  message: 'Error'
};
