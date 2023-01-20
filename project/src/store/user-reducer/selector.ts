import {State} from '../../types/state';
import {AuthorizationError, AuthorizationStatus, ReducerType} from '../../consts';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[ReducerType.User].authorizationStatus;
export const getAvatar = (state: State): string | null => state[ReducerType.User].avatar;
export const getAuthorizationError = (state: State): AuthorizationError => state[ReducerType.User].authorizationError;
