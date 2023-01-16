import {checkAuthorization, login, logout} from '../api-actions';
import {userReducer} from './user-reducer';
import {AuthorizationError, AuthorizationStatus} from '../../consts';
import {UserState} from '../../types/state';

const testUser = {
  avatarUrl: 'test/ava',
  email: 'test@gmail.com',
  id: 1,
  name: 'TestName',
  token: 'testToken'
};

describe('Auth-reducer', () => {
  let state: UserState;
  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.NonAuthorized,
      avatar: null,
      authorizationError: AuthorizationError.NoError,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userReducer.reducer(undefined, {type: 'UNKNOWN_ACTION'})).toEqual(state);
  });
  describe('checkAuth test', () => {
    it('should update authorizationStatus to Authorized if checkAuthorization fulfilled', () => {
      expect(
        userReducer.reducer(state, {
          type: checkAuthorization.fulfilled.type,
          payload: testUser,
        })
      ).toMatchObject({
        authorizationStatus: AuthorizationStatus.Authorized,
        avatar: 'test/ava',
      });
    });
    it('should update AuthorizationStatus to NonAuthorized if checkAuthorization rejected', () => {
      expect(
        userReducer.reducer(state, { type: checkAuthorization.rejected.type })
      ).toMatchObject({ authorizationStatus: AuthorizationStatus.NonAuthorized });
    });
  });

  describe('login test', () => {
    it('should update authorizationStatus to Authorized if login fulfilled', () => {
      expect(
        userReducer.reducer(state, { type: login.fulfilled.type, payload: testUser, })
      ).toMatchObject({ authorizationStatus: AuthorizationStatus.Authorized });
    });
    it('should update authorizationStatus to NonAuthorized if login rejected', () => {
      expect(
        userReducer.reducer(state, { type: login.rejected.type })
      ).toMatchObject({ authorizationStatus: AuthorizationStatus.NonAuthorized });
    });
  });

  describe('logout test', () => {
    it('should update authorizationStatus to NonAuthorized if logout fulfilled', () => {
      expect(
        userReducer.reducer(state, { type: logout.fulfilled.type })
      ).toMatchObject({ authorizationStatus: AuthorizationStatus.NonAuthorized });
    });
  });
});
