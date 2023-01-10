export enum APIRoute {
  FILMS = '/films',
  LOGIN = '/login',
  LOGOUT = '/logout',
  PROMO = '/promo',
  COMMENTS = '/comments',
  SIMILAR = '/similar',
}

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = 'mylist',
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
