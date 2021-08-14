import MovieCardView from '../view/movie-card';
import MoviePopupView from '../view/movie-popup';
import { renderElement, RenderPosition } from '../utils/render';

export default class MovieCard {
  constructor (movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._showPopup = this._showPopup.bind(this);
    this._hidePopup = this._hidePopup.bind(this);
    this._handleOnEscKeyDown = this._handleOnEscKeyDown.bind(this);
  }

  init(movie) {
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

    renderElement(this._movieListContainer, this._movieComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _showPopup() {
    this.body.appendChild(this._popupComponent.getElement());
    this.body.classList.add('hide-overflow');
  }

  _hidePopup() {
    this.body.removeChild(this._popupComponent.getElement());
    this.body.classList.remove('hide-overflow');
  }

  _handleOnEscKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      this._hidePopup();
      document.removeEventListener('keydown', this._handleOnEscKeyDown);
    }
  }
}
