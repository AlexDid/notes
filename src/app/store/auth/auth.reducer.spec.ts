import { authReducer, AuthState, initialState } from './auth.reducer';
import * as AuthActions from './auth.actions';
import { credentials, user } from './data';


describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      // tslint:disable-next-line:no-any
      const action = {} as any;

      const result = authReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('login email action', () => {
    it('should return state with loading', () => {
      const expectedResult: AuthState = {
        ...initialState,
        isLoading: true
      };

      const result = authReducer(initialState, AuthActions.loginEmail(credentials));

      expect(result).toBe(expectedResult);
    });
  });

  describe('login google action', () => {
    it('should return state with loading', () => {
      const expectedResult: AuthState = {
        ...initialState,
        isLoading: true
      };

      const result = authReducer(initialState, AuthActions.loginGoogle());

      expect(result).toBe(expectedResult);
    });
  });

  describe('sign up email action', () => {
    it('should return state with loading', () => {
      const expectedResult: AuthState = {
        ...initialState,
        isLoading: true
      };

      const result = authReducer(initialState, AuthActions.signUpEmail(credentials));

      expect(result).toBe(expectedResult);
    });
  });

  describe('auth success action', () => {
    it('should return state with logged user & without loading', () => {
      const expectedResult: AuthState = {
        ...initialState,
        user,
        isLoading: false
      };

      const result = authReducer(initialState, AuthActions.authSuccess({user}));

      expect(result).toBe(expectedResult);
    });
  });

  describe('auth error action', () => {
    it('should return state without logged user & without loading', () => {
      const expectedResult: AuthState = {
        ...initialState,
        user: null,
        isLoading: false
      };

      const result = authReducer(initialState, AuthActions.authError({message: 'test'}));

      expect(result).toBe(expectedResult);
    });
  });

  describe('logout action', () => {
    it('should return initial state', () => {
      const result = authReducer(initialState, AuthActions.logout());

      expect(result).toBe(initialState);
    });
  });
});
