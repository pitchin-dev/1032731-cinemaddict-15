import { createUserRankTemplate } from './view/user-rank';
import { createMenuTemplate } from './view/menu';
import { createSortTemplate } from './view/sort';
import { createMovieListTemplate } from './view/movie-list';
import { createMovieCardTemplate } from './view/movie-card';
import { createMovieStatsTemplate } from './view/movie-stats';
import { createShowMoreButtonTemplate } from './view/show-more-button';
import { createPopupTemplate } from './view/movie-popup';
import { createMovie } from './mock/movie-mock.js';
import { FILMS_LIST_QUANTITY, FILMS_LIST_EXTRA_QUANTITY, FILM_BLOCK_SIZE } from './const.js';
import { render } from './utils/utils.js';

const body = document.body;
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');
const films = [];
let filmsCounter = 0;

for (let i = 0; i < FILMS_LIST_QUANTITY; i++) {
  films.push(createMovie());
}

const filmsMostCommented = films.slice(0).sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
const filmsTopRated = films.slice(0).sort((a, b) => b.rating - a.rating).slice(0, 2);

render(header, createUserRankTemplate(films));
render(main, createMenuTemplate(films));
render(main, createSortTemplate());
render(main, createMovieListTemplate());

const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');
const filmsListTopRated = document.querySelectorAll('.films-list--extra')[0];
const filmsListTopRatedContainer = filmsListTopRated.querySelector('.films-list__container');
const filmsListMostCommented = document.querySelectorAll('.films-list--extra')[1];
const filmsListMostCommentedContainer = filmsListMostCommented.querySelector('.films-list__container');


for (let i = 0; i < FILM_BLOCK_SIZE; i++) {
  render(filmsListContainer, createMovieCardTemplate(films[i]));
}
filmsCounter += FILM_BLOCK_SIZE;

render(filmsList, createShowMoreButtonTemplate());

const showMoreButton = document.querySelector('.films-list__show-more');

showMoreButton.addEventListener('click', () => {
  if (filmsCounter < films.length) {
    for (let i = filmsCounter; i < filmsCounter + FILM_BLOCK_SIZE; i++) {
      render(filmsListContainer, createMovieCardTemplate(films[i]));
    }
    filmsCounter += FILM_BLOCK_SIZE;
  } else {
    showMoreButton.style.display = 'none';
  }
});

for (let i = 0; i < FILMS_LIST_EXTRA_QUANTITY; i++) {
  render(filmsListTopRatedContainer, createMovieCardTemplate(filmsTopRated[i]));
}

for (let i = 0; i < FILMS_LIST_EXTRA_QUANTITY; i++) {
  render(filmsListMostCommentedContainer, createMovieCardTemplate(filmsMostCommented[i]));
}

render(footerStats, createMovieStatsTemplate(films));
render(body, createPopupTemplate(films[0]));

export {films};
