import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {mockSelectedFilm, mockFilms} from "./mocks/films";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App selectedFilm={mockSelectedFilm} films={mockFilms}/>
  </React.StrictMode>,
);
