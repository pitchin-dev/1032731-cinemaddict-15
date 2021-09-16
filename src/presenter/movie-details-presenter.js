import MovieDetailsView from '../view/movie-details-view';
import {render, replace, remove, isEscEvent} from '../utils/dom-utils';
import {UpdateType, UserAction} from '../types';

export default class MovieDetailsPresenter {
  constructor(commentsModel, closePopup, changeData) {
    this._commentsModel = commentsModel;
    this._closePopup = closePopup;
    this._changeData = changeData;

    this._movieDetailsComponent = null;

    this._handleCloseMovieDetailsClick = this._handleCloseMovieDetailsClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(movie) {
    this._movie = movie;
    this._commentsModel.setComments(this._movie.id);
    this._comments = this._commentsModel.getComments();
    this._localComment = this._commentsModel.getLocalComments();

    const previous = this._movieDetailsComponent;

    this._movieDetailsComponent = new MovieDetailsView(this._movie, this._comments, this._localComment, this._changeData);
    this._movieDetailsComponent.setCloseMovieDetailsClickHandler(this._handleCloseMovieDetailsClick);

    if (previous === null) {
      document.body.classList.add('hide-overflow');
      document.addEventListener('keydown', this._escKeyDownHandler);

      render(document.body, this._movieDetailsComponent);
      return;
    }

    if (document.body.contains(previous.getElement())) {
      const scrollPosition = previous.getElement().scrollTop;
      replace(this._movieDetailsComponent, previous);
      this._movieDetailsComponent.getElement().scrollTop = scrollPosition;
    }

    remove(previous);
  }

  get movieId() {
    return this._movie.id;
  }

  destroy() {
    this._handleCloseMovieDetailsClick();
  }

  _handleCloseMovieDetailsClick() {
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);

    this._changeData(UserAction.RESET_LOCAL_COMMENT, UpdateType.JUST_UPDATE_DATA);
    this._closePopup();
    remove(this._movieDetailsComponent);
    this._movieDetailsComponent = null;
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._handleCloseMovieDetailsClick();
    }
  }
}
