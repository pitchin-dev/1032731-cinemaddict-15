import {convertDateToMs} from './utils/date-time-utils';

export const RenderPlace = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

export const UserAction = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  UPDATE_LOCAL_COMMENT: 'UPDATE_LOCAL_COMMENT',
  RESET_LOCAL_COMMENT: 'RESET_LOCAL_COMMENT',
};

export const UpdateType = {
  JUST_UPDATE_DATA: 'JUST_UPDATE_DATA',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const Rank = {
  NOVICE: {
    name: 'novice',
    range: {
      min: 1,
      max: 10,
    },
  },
  FAN: {
    name: 'fan',
    range: {
      min: 11,
      max: 20,
    },
  },
  MOVIE_BUFF: {
    name: 'movie buff',
    range: {
      min: 21,
      max: Infinity,
    },
  },
};

export const FilterType = {
  ALL: {
    name: 'all',
    title: 'There are no movies in our database',
  },
  WATCHLIST: {
    name: 'watchlist',
    title: 'There are no movies to watch now',
    getProperty: (movie) => movie.userDetails.watchlist,
  },
  HISTORY: {
    name: 'history',
    title: 'There are no watched movies now',
    getProperty: (movie) => movie.userDetails.alreadyWatched,
  },
  FAVORITES: {
    name: 'favorites',
    title: 'There are no favorite movies now',
    getProperty: (movie) => movie.userDetails.favorite,
  },
};

export const SortType = {
  DEFAULT: {
    name: 'default',
  },
  DATE: {
    name: 'date',
    getProperty: (movie) => convertDateToMs(movie.movieInfo.release.date),
  },
  RATING: {
    name: 'rating',
    getProperty: (movie) => movie.movieInfo.totalRating,
  },
};

export const ExtraList = {
  TOP_RATED: {
    title: 'Top rated',
    getProperty: (movie) => movie.movieInfo.totalRating,
  },
  MOST_COMMENTED: {
    title: 'Most commented',
    getProperty: (movie) => movie.comments.length,
  },
};
