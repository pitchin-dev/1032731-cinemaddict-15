import MovieList from './presenter/movie-list';
import MovieStatisticsView from './view/movie-stats';
import { createMovie } from './mock/movie-mock.js';
import { buttons } from './mock/filter-mock.js';
import { FILMS_LIST_QUANTITY } from './const.js';
import { renderElement, RenderPosition } from './utils/render.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');
const films = new Array(FILMS_LIST_QUANTITY).fill(null).map(createMovie);

new MovieList(header, main, films, buttons).init();
renderElement(footerStats, new MovieStatisticsView(films).getElement(), RenderPosition.BEFOREEND);
