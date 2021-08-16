import AbstractView from './abstract';

const createMovieCardTemplate = (movie) => (
  `<article class="film-card" data-id=${movie.id}>
    <h3 class="film-card__title">${movie.title}</h3>
    <p class="film-card__rating">${movie.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${movie.year}</span>
      <span class="film-card__duration">${movie.duration}</span>
      <span class="film-card__genre">${movie.genre[0]}</span>
    </p>
    <img src=${movie.poster} alt="" class="film-card__poster">
    <p class="film-card__description">${movie.description.length > 140 ? `${movie.description.substr(0, 139)}...` : movie.description}</p>
    <a class="film-card__comments">${movie.comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${movie.isInWatchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${movie.isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${movie.isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
    </div>
  </article>`
);

export default class MovieCardView extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
    this._clickHandler = this._clickHandler.bind(this);
    this._stateEditClickHandler = this._stateEditClickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this._movie);
  }

  _clickHandler(e) {
    e.preventDefault();
    this._callback.click();
  }

  _stateEditClickHandler(e) {
    e.preventDefault();
    this._callback.stateEditClick();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickHandler);
  }

  setStateEditClickHandler(callback) {
    this._callback.stateEditClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._stateEditClickHandler);
  }
}
