import MovieList from './presenter/movie-list';
import { createMovie } from './mock/movie-mock.js';
import { buttons } from './mock/filter-mock.js';
import { FILMS_LIST_QUANTITY } from './const.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const films = new Array(FILMS_LIST_QUANTITY).fill(null).map(createMovie);

new MovieList(header, main, films, buttons).init();