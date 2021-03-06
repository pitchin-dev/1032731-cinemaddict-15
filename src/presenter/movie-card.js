import MovieCardView from '../view/movie-card';
import MoviePopupView from '../view/movie-popup';
import { removeComponent, renderElement, RenderPosition, replaceComponent } from '../utils/render';

export default class MovieCard {
  constructor (movieListContainer, changeData) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;

    this._movieComponent = null;
    this._popupComponent = null;

    this._showPopup = this._showPopup.bind(this);
    this._hidePopup = this._hidePopup.bind(this);
    this._handleOnEscKeyDown = this._handleOnEscKeyDown.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const prevMovieComponent = this._movieComponent;
    const prevPopupComponent = this._popupComponent;

    this._movieComponent = new MovieCardView(movie);
    this._popupComponent = new MoviePopupView(movie);
    this.body = document.body;

    this._movieComponent.setClickHandler(() => {
      this._showPopup();
      document.addEventListener('keydown', this._handleOnEscKeyDown);
    });

    this._popupComponent.setClickHandler(() => {
      this._hidePopup();
      document.removeEventListener('keydown', this._handleOnEscKeyDown);
    });

    this._movieComponent.setFavoriteEditClickHandler(this._handleFavoriteClick);
    this._movieComponent.setWatchedEditClickHandler(this._handleWatchedClick);
    this._movieComponent.setWatchlistEditClickHandler(this._handleWatchlistClick);

    this._popupComponent.setHistoryClickHandler(this._handleWatchedClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);

    if (prevMovieComponent === null || prevPopupComponent === null) {
      renderElement(this._movieListContainer, this._movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    replaceComponent(this._movieComponent, prevMovieComponent);
    replaceComponent(this._popupComponent, prevPopupComponent);

    removeComponent(prevMovieComponent);
    removeComponent(prevPopupComponent);
  }

  destroy() {
    removeComponent(this._movieComponent);
    removeComponent(this._popupComponent);
  }

  _hidePopup() {
    const popup = document.querySelector('.film-details');
    if (popup) {
      popup.remove();
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this._handleOnEscKeyDown);
    }
  }

  _showPopup() {
    this._hidePopup();
    document.addEventListener('keydown', this._handleOnEscKeyDown);
    document.body.classList.add('hide-overflow');
    renderElement(document.body, this._popupComponent, RenderPosition.BEFOREEND);
    this._popupComponent.reset(this._movie);
  }

  _handleOnEscKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this._hidePopup();
      document.removeEventListener('keydown', this._handleOnEscKeyDown);
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._movie,
        {
          isFavorite: !this._movie.isFavorite,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._movie,
        {
          isWatched: !this._movie.isWatched,
        },
      ),
    );
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._movie,
        {
          isInWatchlist: !this._movie.isInWatchlist,
        },
      ),
    );
  }
}
