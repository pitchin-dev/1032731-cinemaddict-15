import MovieView from '../view/movie-view';
import {render, replace, remove} from '../utils/dom-utils';

export default class MoviePresenter {
  constructor(movieListContainer, openPopup, changeData) {
    this._movieListContainer = movieListContainer;
    this._openPopup = openPopup;
    this._changeData = changeData;

    this._movieComponent = null;

    this._handleOpenMovieDetails = this._handleOpenMovieDetails.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const previous = this._movieComponent;
    this._movieComponent = new MovieView(this._movie, this._changeData);
    this._movieComponent.setOpenMovieDetailsClickHandler(this._handleOpenMovieDetails);

    if (previous === null) {
      render(this._movieListContainer, this._movieComponent);
      return;
    }

    if (this._movieListContainer.contains(previous.getElement())) {
      replace(this._movieComponent, previous);
    }

    remove(previous);
  }

  destroy() {
    remove(this._movieComponent);
    this._movieComponent = null;
  }

  _handleOpenMovieDetails() {
    this._openPopup(this._movie);
  }
}
