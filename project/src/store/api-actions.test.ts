import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {films} from '../mocks/films';
import reviews from '../mocks/reviews';
import {Action} from '@reduxjs/toolkit';
import {State} from '../types/state';
import {
  changeFilmFavoriteStatus,
  checkAuthorization,
  fetchFavoriteFilms, fetchFilms, fetchFilm,
  fetchFilmReviews, fetchPromoFilm,
  fetchSimilarFilms, login, logout, postFilmReview,
} from './api-actions';
import {AuthorizationData} from '../types/authorization-data';
import {createAPI} from '../services/api';

describe('async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockFilm = films[0];
  const mockFilms = films;
  const mockReviews = reviews;
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('authorization status is Authorized when server returned 200', async () => {
    jest.mock('../services/error-message-handle.ts');
    const store = mockStore();
    mockAPI
      .onGet('/login')
      .reply(200, []);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(checkAuthorization());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      checkAuthorization.pending.type,
      checkAuthorization.fulfilled.type
    ]);
  });

  it('should dispatch login when POST /login', async () => {
    jest.mock('../services/error-message-handle.ts');
    const fakeUser: AuthorizationData = { email: 'mail@mail.com', password: 'qwerty123' };
    mockAPI
      .onPost('/login')
      .reply(200, { token: 'secret' });
    const store = mockStore();
    await store.dispatch(login(fakeUser));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      login.pending.type,
      login.fulfilled.type
    ]);
  });

  it('should dispatch logout on DELETE /logout', async () => {
    jest.mock('../services/error-message-handle.ts');
    mockAPI
      .onDelete('/logout')
      .reply(204);
    const store = mockStore();
    await store.dispatch(logout());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      logout.pending.type,
      logout.fulfilled.type
    ]);
  });

  it('should dispatch films when GET /films', async () => {
    jest.mock('../services/error-message-handle.ts');
    mockAPI
      .onGet('/films')
      .reply(200, mockFilms);
    const store = mockStore();
    await store.dispatch(fetchFilms());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchFilms.pending.type,
      fetchFilms.fulfilled.type
    ]);
  });

  it('should dispatch promo film when GET /promo', async () => {
    jest.mock('../services/error-message-handle.ts');
    mockAPI
      .onGet('/promo')
      .reply(200, mockFilm);
    const store = mockStore();
    await store.dispatch(fetchPromoFilm());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchPromoFilm.pending.type,
      fetchPromoFilm.fulfilled.type
    ]);
  });

  it('should fetch film film when GET /films/{id}', async () => {
    jest.mock('../services/error-message-handle.ts');
    mockAPI
      .onGet('/films/1')
      .reply(200, mockFilm);
    const store = mockStore();
    await store.dispatch(fetchFilm('1'));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchFilm.pending.type,
      fetchFilm.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /films/{id}/similar', async () => {
    jest.mock('../services/error-message-handle.ts');
    mockAPI
      .onGet('/films/1/similar')
      .reply(200, mockFilms);
    const store = mockStore();
    await store.dispatch(fetchSimilarFilms('1'));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchSimilarFilms.pending.type,
      fetchSimilarFilms.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /comments/{id}', async () => {
    jest.mock('../services/error-message-handle.ts');
    mockAPI
      .onGet('/comments/1')
      .reply(200, mockReviews);
    const store = mockStore();
    await store.dispatch(fetchFilmReviews('1'));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchFilmReviews.pending.type,
      fetchFilmReviews.fulfilled.type
    ]);
  });

  it('POST /comments/{id}', async () => {
    jest.mock('../services/error-message-handle.ts');
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
    jest.mock('../services/error-message-handle.ts');
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
    jest.mock('../services/error-message-handle.ts');
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
