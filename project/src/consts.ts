export enum APIRoute {
  FILMS = '/films',
  LOGIN = '/login',
  LOGOUT = '/logout',
  PROMO = '/promo',
  COMMENTS = '/comments',
  SIMILAR = '/similar',
  FAVORITE = '/favorite',
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
  Unknown
}

export enum RatingDescription {
  BAD = 'Bad',
  NORMAL = 'Normal',
  GOOD = 'Good',
  VERY_GOOD = 'Very good',
  AWESOME = 'Awesome'
}

export enum Tab {
  OVERVIEW = 'Overview',
  DETAILS = 'Details',
  REVIEWS = 'Reviews'
}

export enum ReducerType {
  User = 'userReducer',
  Main = 'mainReducer',
  Film = 'filmReducer'
}

export const ALL_GENRES = 'All genres';
export const DELAY_ON_HOVER_FILM_CARD = 1000;
export const PREVIEW_WIDTH_ON_HOVER_FILM_CARD = 280;
export const PREVIEW_HEIGHT_ON_HOVER_FILM_CARD = 175;
export const PREVIEW_MUTED_ON_HOVER_FILM_CARD = true;
export const NEED_TO_LOOP_ON_HOVER_FILM_CARD = true;
