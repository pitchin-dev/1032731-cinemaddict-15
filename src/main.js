import MovieList from './presenter/movie-list';
import MovieModel from './model/movies';
import { createMovie } from './mock/movie-mock.js';
import { buttons } from './mock/filter-mock.js';
import { FILMS_LIST_QUANTITY } from './const.js';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const films = new Array(FILMS_LIST_QUANTITY).fill(null).map(createMovie);

const movieModel = new MovieModel();
movieModel.setMovies(films);

new MovieList(header, main, movieModel, buttons).init();
