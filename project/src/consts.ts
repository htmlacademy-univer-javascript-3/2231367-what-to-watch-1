export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Promo = '/promo',
  Comments = '/comments',
  Similar = '/similar',
  Favorite = '/favorite',
}

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = 'films/:id',
  AddReview = '/films/:id/review',
  Player = 'player/:id',
  NotFound = '*'
}

export enum AuthorizationStatus {
  NonAuthorized,
  Authorized,
}

export enum RatingDescription {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome'
}

export enum Tab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews'
}

export enum ReducerType {
  User = 'userReducer',
  Main = 'mainReducer',
  Film = 'filmReducer'
}

export enum AuthorizationError {
  InvalidEmailAndPassword = 'Please, enter correct email and password',
  InvalidEmail = 'Please, enter correct email',
  InvalidPassword = 'Please, enter correct password',
  NoError = ''
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const ALL_GENRES = 'All genres';

export const LIST_STEP_COUNT = 8;

export enum PreviewSizeOnHoverFilmCard {
  PREVIEW_WIDTH_ON_HOVER_FILM_CARD = 280,
  PREVIEW_HEIGHT_ON_HOVER_FILM_CARD = 175,
}

export const DELAY_ON_HOVER_FILM_CARD = 1000;
export const PREVIEW_MUTED_ON_HOVER_FILM_CARD = true;
export const NEED_TO_LOOP_ON_HOVER_FILM_CARD = true;
