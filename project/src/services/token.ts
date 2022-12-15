const AUTHORIZATION_TOKEN_KEY_NAME = 'what-to-watch-token';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTHORIZATION_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTHORIZATION_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTHORIZATION_TOKEN_KEY_NAME);
};
