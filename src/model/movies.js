import AbstractObserver from './abstract-observer';

export default class MovieModel extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(movies) {
    this._movies = movies.slice();
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((item) => item.id === update.id);
    this._movies = index === -1 ? this._movies : [...this._movies.slice(0, index), update, ...this._movies.slice(index + 1)];
    this._notify(updateType, update);
  }
}
