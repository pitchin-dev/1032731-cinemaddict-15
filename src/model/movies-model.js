import AbstractObserver from '../utils/abstract-observer.js';

export default class MoviesModel extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies) {
    this._movies = movies.slice();
    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, updatedMovie) {
    const index = this._movies.findIndex((movie) => movie.id === updatedMovie.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      updatedMovie,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, updatedMovie);
  }

  static adaptToClient(movie) {
    const adaptedMovie = {
      ...movie,
      userDetails: {
        watchlist: movie['user_details']['watchlist'],
        alreadyWatched: movie['user_details']['already_watched'],
        watchingDate: movie['user_details']['watching_date'],
        favorite: movie['user_details']['favorite'],
      },
      movieInfo: {
        ...movie['movie_info'],
        alternativeTitle: movie['movie_info']['alternative_title'],
        totalRating: movie['movie_info']['total_rating'],
        ageRating: movie['movie_info']['age_rating'],
        release: {
          date: movie['movie_info']['release']['date'],
          releaseCountry: movie['movie_info']['release']['release_country'],
        },
      }};

    delete adaptedMovie['user_details'];
    delete adaptedMovie['movie_info'];
    delete adaptedMovie.movieInfo['alternative_title'];
    delete adaptedMovie.movieInfo['total_rating'];
    delete adaptedMovie.movieInfo['age_rating'];

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = {
      ...movie,
      'user_details': {
        'watchlist': movie.userDetails.watchlist,
        'already_watched': movie.userDetails.alreadyWatched,
        'watching_date': movie.userDetails.watchingDate,
        'favorite': movie.userDetails.favorite,
      },
      'movie_info': {
        ...movie.movieInfo,
        'alternative_title': movie.movieInfo.alternativeTitle,
        'total_rating': movie.movieInfo.totalRating,
        'age_rating': movie.movieInfo.ageRating,
        'release': {
          'date': movie.movieInfo.release.date,
          'release_country': movie.movieInfo.release.releaseCountry,
        },
      }};

    delete adaptedMovie.userDetails;
    delete adaptedMovie.movieInfo;
    delete adaptedMovie['movie_info']['alternativeTitle'];
    delete adaptedMovie['movie_info']['totalRating'];
    delete adaptedMovie['movie_info']['ageRating'];

    return adaptedMovie;
  }
}
