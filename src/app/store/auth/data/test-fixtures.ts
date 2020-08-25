import { EmailLogin } from '..';
import { ErrorDto, User } from '../../../core/models';

export const credentials: EmailLogin = {
  email: 'test@test.com',
  password: 'qwe12345'
};
export const user: User = {
  name: 'test',
  picture: 'https://google.com',
  id: 'f3ubf3f93nf0'
};
export const error: ErrorDto = {
  message: 'Error'
};
