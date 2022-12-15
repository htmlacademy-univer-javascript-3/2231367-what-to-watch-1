import MainPage from '../../pages/main-page/main-page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import FilmPage from '../../pages/film-page/film-page';
import PlayerPage from '../../pages/player-page/player-page';
import {AppRoute} from '../../types/AppRoute';
import PrivateRoute from '../private-route/private-route';
import MyListPage from '../../pages/my-list-page/my-list-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {FimlType} from '../../types/FilmType';
import {useAppSelector} from '../../hooks';

type AppProps = {
  selectedFilm: FimlType;
}

function App(props: AppProps): JSX.Element {
  const { films } = useAppSelector((state) => state);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              selectedFilm={props.selectedFilm}
            />
          }
        />
        <Route
          path={AppRoute.Film}
          element={<FilmPage films={films}/>}
        />
        <Route
          path={AppRoute.Player}
          element={<PlayerPage film={props.selectedFilm}/>}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignInPage/>}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute>
              <MyListPage films={films}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReviewPage film={props.selectedFilm}/>}
        />
        <Route
          path='*'
          element={<NotFoundPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
