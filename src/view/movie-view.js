import SmartView from './smart-view';
import {getFormattedDate, getFormattedDuration} from '../utils/date-time-utils';
import {addActiveModifier} from '../utils/dom-utils';
import {trimText} from '../utils/text-formatting-utils';
import {UpdateType, UserAction} from '../types';

const createMovieCardTemplate = ({movie, state}) => (
  `<article class="film-card">
    <h3 class="film-card__title">${movie.movieInfo.title}</h3>
    <p class="film-card__rating">${movie.movieInfo.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${getFormattedDate(movie.movieInfo.release.date, 'YYYY')}</span>
      <span class="film-card__duration">${getFormattedDuration(Number(movie.movieInfo.runtime))}</span>
      <span class="film-card__genre">${movie.movieInfo.genre[0]}</span>
    </p>
    <img src="./${movie.movieInfo.poster}" alt="${movie.movieInfo.alternativeTitle}" class="film-card__poster">
    <p class="film-card__description">${trimText(movie.movieInfo.description)}</p>
    <a class="film-card__comments">${movie.comments.length} comments</a>
    <div class="film-card__controls">
      <button
        class="${addActiveModifier(state.hasInWatchlist, 'film-card__controls-item')} film-card__controls-item--add-to-watchlist"
        type="button"
      >Add to watchlist</button>
      <button
        class="${addActiveModifier(state.wasAlreadyWatched, 'film-card__controls-item')} film-card__controls-item--mark-as-watched"
        type="button"
      >Mark as watched</button>
      <button
        class="${addActiveModifier(state.isFavorite, 'film-card__controls-item')} film-card__controls-item--favorite"
        type="button"
      >Mark as favorite</button>
    </div>
  </article>`
);

export default class MovieView extends SmartView {
  constructor(movie, changeData) {
    super();
    this._movie = movie;
    this._data = MovieView.parseMovieToData(this._movie);
    this._changeData = changeData;

    this._openMovieDetailsClickHandler = this._openMovieDetailsClickHandler.bind(this);
    this._watchlistButtonClickHandler = this._watchlistButtonClickHandler.bind(this);
    this._watchedButtonClickHandler = this._watchedButtonClickHandler.bind(this);
    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createMovieCardTemplate(this._data);
  }

  setOpenMovieDetailsClickHandler(callback) {
    this._callback.openMovieDetailsClick = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._openMovieDetailsClickHandler);
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._openMovieDetailsClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openMovieDetailsClickHandler);
  }

  restoreHandlers() {
    this.setOpenMovieDetailsClickHandler(this._callback.openMovieDetailsClick);
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistButtonClickHandler);
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedButtonClickHandler);
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteButtonClickHandler);
  }

  _openMovieDetailsClickHandler(evt) {
    evt.preventDefault();
    this._callback.openMovieDetailsClick();
  }

  _watchlistButtonClickHandler(evt) {
    evt.preventDefault();
    this.updateData({state: {...this._data.state, hasInWatchlist: !this._data.state.hasInWatchlist}}, true);
    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, MovieView.parseDataToMovie(this._data));
  }

  _watchedButtonClickHandler(evt) {
    evt.preventDefault();
    this.updateData({state: {...this._data.state, wasAlreadyWatched: !this._data.state.wasAlreadyWatched}}, true);
    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, MovieView.parseDataToMovie(this._data));
  }

  _favoriteButtonClickHandler(evt) {
    evt.preventDefault();
    this.updateData({state: {...this._data.state, isFavorite: !this._data.state.isFavorite}}, true);
    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, MovieView.parseDataToMovie(this._data));
  }

  static parseMovieToData(movie) {
    return Object.assign(
      {},
      {movie},
      {state: {
        hasInWatchlist: movie.userDetails.watchlist,
        wasAlreadyWatched: movie.userDetails.alreadyWatched,
        isFavorite: movie.userDetails.favorite,
      }},
    );
  }

  static parseDataToMovie(data) {
    return Object.assign(
      {},
      data.movie,
      {userDetails: {
        ...data.movie.userDetails,
        watchlist: data.state.hasInWatchlist,
        alreadyWatched: data.state.wasAlreadyWatched,
        favorite: data.state.isFavorite,
      }},
    );
  }
}
