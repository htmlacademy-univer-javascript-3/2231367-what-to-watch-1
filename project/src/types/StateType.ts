import {store} from '../store';

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
