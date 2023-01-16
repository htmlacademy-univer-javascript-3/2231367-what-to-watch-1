import {Provider} from 'react-redux';
import PrivateRoute from './private-route';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {APIRoute, AppRoute, AuthorizationStatus, ReducerType} from '../../consts';

const mockStore = configureMockStore();
const initialEntries : (AppRoute | string)[] = [AppRoute.Main];

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    initialEntries.push('/private');
  });

  it('should render login if user not authorized', () => {
    const store = mockStore({
      [ReducerType.USER]: {
        authorizationStatus: AuthorizationStatus.NonAuthorized,
        avatar: null
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path={APIRoute.Login} element={<h1>Login</h1>}/>
            <Route path='/private' element={
              <PrivateRoute >
                <h1>Private Route</h1>
              </PrivateRoute>
            }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route if authorized', () => {
    const store = mockStore({
      [ReducerType.USER]: {
        authorizationStatus: AuthorizationStatus.Authorized,
        avatar: null,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path={APIRoute.Login} element={<h1>Login</h1>}/>
            <Route path='/private' element={
              <PrivateRoute >
                <h1>Private Route</h1>
              </PrivateRoute>
            }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
  });
});
