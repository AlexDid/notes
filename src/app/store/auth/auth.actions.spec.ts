import * as fromAuth from './auth.actions';
import { credentials, user, error } from './data';

describe('loginEmail', () => {
  it('should return an action', () => {
    expect(fromAuth.loginEmail(credentials).type).toBe('[Auth] Login Email');
  });
  it('should have credentials in props', () => {
    expect(fromAuth.loginEmail(credentials).email).toBe(credentials.email);
    expect(fromAuth.loginEmail(credentials).password).toBe(credentials.password);
  });
});

describe('signUpEmail', () => {
  it('should return an action', () => {
    expect(fromAuth.signUpEmail(credentials).type).toBe('[Auth] SignUp Email');
  });
  it('should have credentials in props', () => {
    expect(fromAuth.signUpEmail(credentials).email).toBe(credentials.email);
    expect(fromAuth.signUpEmail(credentials).password).toBe(credentials.password);
  });
});

describe('loginGoogle', () => {
  it('should return an action', () => {
    expect(fromAuth.loginGoogle().type).toBe('[Auth] Login Google');
  });
});

describe('authSuccess', () => {
  it('should return an action', () => {
    expect(fromAuth.authSuccess({user}).type).toBe('[Auth] Auth Success');
  });
  it('should have user in props', () => {
    expect(fromAuth.authSuccess({user}).user).toBeTruthy();
    const authUser = fromAuth.authSuccess({user}).user;
    expect(typeof authUser === 'object').toBeTrue();
    expect(authUser).toBe(user);
  });
});

describe('logout', () => {
  it('should return an action', () => {
    expect(fromAuth.logout().type).toBe('[Auth] Logout');
  });
});

describe('authError', () => {
  it('should return an action', () => {
    expect(fromAuth.authError(error).type).toBe('[Auth] Auth Error');
  });
  it('should have error message in props', () => {
    expect(fromAuth.authError(error).message).toBe(error.message);
  });
});
