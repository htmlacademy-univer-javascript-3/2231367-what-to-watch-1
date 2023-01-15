import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {films} from '../mocks/films';
import reviews from '../mocks/reviews';
import {Action} from '@reduxjs/toolkit';
import {StateType} from '../types/StateType';
import {
  changeFilmFavoriteStatus,
  checkAuthAction,
  fetchFavoriteFilms, fetchFilmsAction, getFilm,
  getFilmReviews, getPromoFilm,
  getSimilarFilms, loginAction, logoutAction, postFilmReview,
} from './api-actions';
import {AuthorizationData} from '../types/AuthorizationData';
import {createAPI} from '../services/api';

describe('async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockFilm = films[0];
  const mockFilms = films;
  const mockReviews = reviews;
  const mockStore = configureMockStore<StateType, Action, ThunkDispatch<StateType, typeof api, Action>>(middlewares);

  it('authorization status is Authorized when server returned 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet('/login')
      .reply(200, []);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch login when POST /login', async () => {
    const fakeUser: AuthorizationData = { email: 'mail@mail.com', password: 'qwerty123' };
    mockAPI
      .onPost('/login')
      .reply(200, { token: 'secret' });
    const store = mockStore();
    await store.dispatch(loginAction(fakeUser));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type
    ]);
  });

  it('should dispatch logout on DELETE /logout', async () => {
    mockAPI
      .onDelete('/logout')
      .reply(204);
    const store = mockStore();
    await store.dispatch(logoutAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);
  });

  it('should dispatch films when GET /films', async () => {
    mockAPI
      .onGet('/films')
      .reply(200, mockFilms);
    const store = mockStore();
    await store.dispatch(fetchFilmsAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch promo film when GET /promo', async () => {
    mockAPI
      .onGet('/promo')
      .reply(200, mockFilm);
    const store = mockStore();
    await store.dispatch(getPromoFilm());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      getPromoFilm.pending.type,
      getPromoFilm.fulfilled.type
    ]);
  });

  it('should fetch film film when GET /films/{id}', async () => {
    mockAPI
      .onGet('/films/1')
      .reply(200, mockFilm);
    const store = mockStore();
    await store.dispatch(getFilm('1'));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      getFilm.pending.type,
      getFilm.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /films/{id}/similar', async () => {
    mockAPI
      .onGet('/films/1/similar')
      .reply(200, mockFilms);
    const store = mockStore();
    await store.dispatch(getSimilarFilms('1'));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      getSimilarFilms.pending.type,
      getSimilarFilms.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /comments/{id}', async () => {
    mockAPI
      .onGet('/comments/1')
      .reply(200, mockReviews);
    const store = mockStore();
    await store.dispatch(getFilmReviews('1'));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      getFilmReviews.pending.type,
      getFilmReviews.fulfilled.type
    ]);
  });

  it('POST /comments/{id}', async () => {
    const postData = {
      id: 1,
      comment: 'comment',
      rating: 8,
    };
    mockAPI
      .onPost(`/comments/${postData.id}`, {
        comment: postData.comment,
        rating: postData.rating
      })
      .reply(200);
    const store = mockStore();
    await store.dispatch(postFilmReview(postData));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      postFilmReview.pending.type,
      postFilmReview.fulfilled.type
    ]);
  });

  it('should fetch favorite films film when GET /favorite', async () => {
    mockAPI
      .onGet('/favorite')
      .reply(200, mockFilms);
    const store = mockStore();
    await store.dispatch(fetchFavoriteFilms());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchFavoriteFilms.pending.type,
      fetchFavoriteFilms.fulfilled.type
    ]);
  });

  it('POST /favorite/{filmId}/{status}', async () => {
    const postData = {
      filmId: 1,
      status: 1
    };
    mockAPI
      .onPost('/favorite/1/1')
      .reply(200);
    const store = mockStore();
    await store.dispatch(changeFilmFavoriteStatus(postData));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      changeFilmFavoriteStatus.pending.type,
      changeFilmFavoriteStatus.fulfilled.type
    ]);
  });
});
