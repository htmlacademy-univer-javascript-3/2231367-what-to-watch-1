import {store} from '../store';
import {setError} from '../store/action';
import {clearError} from '../store/api-actions';

export const errorMessageHandle = (errorMessage: string): void => {
  store.dispatch(setError(errorMessage));
  store.dispatch(clearError());
};
