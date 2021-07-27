import { createUserRankTemplate } from './view/user-rank';
import { createMenuTemplate } from './view/menu';
import { createSortTemplate } from './view/sort';
import { createMovieListTemplate } from './view/movie-list';
import { createMovieStatsTemplate } from './view/movie-stats';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

render(header, createUserRankTemplate(), 'beforeend');
render(main, createMenuTemplate(), 'beforeend');
render(main, createSortTemplate(), 'beforeend');
render(main, createMovieListTemplate(), 'beforeend');
render(footerStats, createMovieStatsTemplate(), 'beforeend');
