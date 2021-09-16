import {isDateInPeriod} from './date-time-utils';
import {StatisticFilterType} from '../types';

export const getWatchedMovies = (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched);

export const getMoviesByPeriod = (movies, period) => (period !== StatisticFilterType.ALL_TIME.shorthand)
  ? movies.filter((movie) => isDateInPeriod(movie.userDetails.watchingDate, period))
  : movies;

export const getTotalDuration = (movies) => {
  const duration = movies.reduce((acc, movie) => (acc + movie.movieInfo.runtime), 0);
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;

  return {h: hours, m: minutes};
};

const getGenres = (movies) => [...new Set(movies.reduce((acc, movie) => ([...acc, ...movie.movieInfo.genre]), []))];

const getCountMoviesByGenre = (movies, currentGenre) => movies
  .reduce((count, movie) => count + (movie.movieInfo.genre.some((movieGenre) => movieGenre === currentGenre)), 0);

const sortGenresByCount = (firstGenre, secondGenre) => secondGenre.count - firstGenre.count;

export const getChartOptions = (movies) => {
  const genresByCount = getGenres(movies)
    .map((genre) => ({genre, count: getCountMoviesByGenre(movies, genre)}))
    .sort(sortGenresByCount);
  const genres = genresByCount.map((item) => item.genre);

  return {
    topGenre: genres[0],
    genres: genres,
    counts: genresByCount.map((item) => item.count),
  };
};
