import MainPage from '../../pages/main-page/main-page';
import {Route, Routes} from 'react-router-dom';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import FilmPage from '../../pages/film-page/film-page';
import PlayerPage from '../../pages/player-page/player-page';
import {AppRoute} from '../../consts';
import PrivateRoute from '../private-route/private-route';
import MyListPage from '../../pages/my-list-page/my-list-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<MainPage />}
      />
      <Route
        path={AppRoute.Film}
        element={<FilmPage />}
      />
      <Route
        path={AppRoute.AddReview}
        element={<AddReviewPage/>}
      />
      <Route
        path={AppRoute.Player}
        element={<PlayerPage/>}
      />
      <Route
        path={AppRoute.SignIn}
        element={<SignInPage/>}
      />
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute>
            <MyListPage/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.NotFound}
        element={<NotFoundPage/>}
      />
      <Route
        path='*'
        element={<NotFoundPage/>}
      />
    </Routes>
  );
}

export default App;
