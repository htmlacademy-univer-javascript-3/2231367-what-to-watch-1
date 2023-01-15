import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {userReducer} from './auth-reducer';
import {AuthorizationStatus} from '../../consts';
import {UserState} from '../../types/StateType';

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
    state = {authorizationStatus: AuthorizationStatus.NonAuthorized, avatar: null};
  });

  it('without additional parameters should return initial state', () => {
    expect(userReducer.reducer(undefined, {type: 'UNKNOWN_ACTION'})).toEqual(state);
  });
  describe('checkAuth test', () => {
    it('should update authorizationStatus to Authorized if checkAuthAction fulfilled', () => {
      expect(
        userReducer.reducer(state, {
          type: checkAuthAction.fulfilled.type,
          payload: testUser,
        })
      ).toMatchObject({
        authorizationStatus: AuthorizationStatus.Authorized,
        avatar: 'test/ava',
      });
    });
    it('should update AuthorizationStatus to NonAuthorized if checkAuthAction rejected', () => {
      expect(
        userReducer.reducer(state, { type: checkAuthAction.rejected.type })
      ).toMatchObject({ authorizationStatus: AuthorizationStatus.NonAuthorized });
    });
  });

  describe('login test', () => {
    it('should update authorizationStatus to Authorized if login fulfilled', () => {
      expect(
        userReducer.reducer(state, { type: loginAction.fulfilled.type, payload: testUser, })
      ).toMatchObject({ authorizationStatus: AuthorizationStatus.Authorized });
    });
    it('should update authorizationStatus to NonAuthorized if login rejected', () => {
      expect(
        userReducer.reducer(state, { type: loginAction.rejected.type })
      ).toMatchObject({ authorizationStatus: AuthorizationStatus.NonAuthorized });
    });
  });

  describe('logout test', () => {
    it('should update authorizationStatus to NonAuthorized if logout fulfilled', () => {
      expect(
        userReducer.reducer(state, { type: logoutAction.fulfilled.type })
      ).toMatchObject({ authorizationStatus: AuthorizationStatus.NonAuthorized });
    });
  });
});
