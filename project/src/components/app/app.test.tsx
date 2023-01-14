import App from './app';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createAPI } from '../../services/api';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {films} from "../../mocks/films";
import {ALL_GENRES, AppRoute, AuthorizationStatus} from "../../consts";

const middlewares = [thunk.withExtraArgument(createAPI())];
const mockStore = configureMockStore(middlewares);
const testFilm = films[0];
const testFilms = films;
const testStore = mockStore({
  userReducer: {
    authorizationStatus: AuthorizationStatus.Authorized,
    avatar: null,
  },
  filmReducer: {
    film: testFilm,
    reviews: [],
    similar: [testFilms[2], testFilms[3]],
  },
  mainReducer: {
    films: testFilms,
    filteredFilms: [testFilms[4], testFilms[5]],
    favoriteFilms: [testFilms[6], testFilms[7]],
    favoriteFilmsLength: 0,
    currentGenre: ALL_GENRES,
    shownCount: 0,
    dataIsLoading: false,
    promo: testFilm,
  },
});
const routes : (AppRoute | string)[] = [AppRoute.Main];
const fakeApp = (
  <Provider store={testStore}>
    <MemoryRouter initialEntries={routes}>
      <App />
    </MemoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render Main page if navigate to "/"', () => {
    render(fakeApp);
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render Main page if navigate to "/login" when authorized', () => {
    routes.push(AppRoute.SignIn);
    render(fakeApp);
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render Film page if navigate to "/films/{id}"', () => {
    routes.push('/films/1');
    render(fakeApp);
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('should render Player page if navigate to "/player/{id}"', () => {
    routes.push('/player/1');
    render(fakeApp);
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Transpotting/i)).toBeInTheDocument();
  });

  it('should render Add review page if navigate to "/films/{id}/review"', () => {
    routes.push('/films/1/review');
    render(fakeApp);
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render My list page if navigate to "/mylist"', () => {
    routes.push(AppRoute.MyList);
    render(fakeApp);
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render 404 not found page if navigate to not found route', () => {
    routes.push('/itsnotfoundroute');
    render(fakeApp);
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
