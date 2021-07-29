import { createUserRankTemplate } from './view/user-rank';
import { createMenuTemplate } from './view/menu';
import { createSortTemplate } from './view/sort';
import { createMovieListTemplate } from './view/movie-list';
import { createMovieCardTemplate } from './view/movie-card';
import { createMovieStatsTemplate } from './view/movie-stats';
import { createShowMoreButtonTemplate } from './view/show-more-button';
import { createPopupTemplate } from './view/movie-popup';

const FILMS_LIST_QUANTITY = 5;
const FILMS_LIST_EXTRA_QUANTITY = 2;
const body = document.body;
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

render(header, createUserRankTemplate());
render(main, createMenuTemplate());
render(main, createSortTemplate());
render(main, createMovieListTemplate());

const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');
const filmsListTopRated = document.querySelectorAll('.films-list--extra')[0];
const filmsListTopRatedContainer = filmsListTopRated.querySelector('.films-list__container');
const filmsListMostCommented = document.querySelectorAll('.films-list--extra')[1];
const filmsListMostCommentedContainer = filmsListMostCommented.querySelector('.films-list__container');

for (let i = 0; i < FILMS_LIST_QUANTITY; i++) {
  render(filmsListContainer, createMovieCardTemplate());
}

render(filmsList, createShowMoreButtonTemplate());

for (let i = 0; i < FILMS_LIST_EXTRA_QUANTITY; i++) {
  render(filmsListTopRatedContainer, createMovieCardTemplate());
}

for (let i = 0; i < FILMS_LIST_EXTRA_QUANTITY; i++) {
  render(filmsListMostCommentedContainer, createMovieCardTemplate());
}

render(footerStats, createMovieStatsTemplate());
render(body, createPopupTemplate());
