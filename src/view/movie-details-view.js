import SmartView from './smart-view';
import {addActiveModifier, isCtrlEnterEvent} from '../utils/dom-utils';
import {convertDateToMs, getFormattedCommentDate, getFormattedDate, getFormattedDuration} from '../utils/date-time-utils';
import {UpdateType, UserAction} from '../types';
import he from 'he';
import {getRandomNumber} from '../utils/mock-utils';
import {LOCAL_COMMENT_DEFAULT} from '../const';

const createCommentTemplate = (comment) => (
  `<li class="film-details__comment" data-comment-id="${comment.id}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${getFormattedCommentDate(comment.date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
);

const createEmotionTemplate = (emotion) => (
  `<input name="emotion" type="hidden" value="${emotion}">
  <img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">`
);

const createMovieDetailsTemplate = ({movie, comments, state}) => (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${movie.movieInfo.poster}" alt="${movie.movieInfo.alternativeTitle}">

            <p class="film-details__age">${movie.movieInfo.ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${movie.movieInfo.title}</h3>
                <p class="film-details__title-original">Original: ${movie.movieInfo.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${movie.movieInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${movie.movieInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${(movie.movieInfo.writers).join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${(movie.movieInfo.actors).join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${getFormattedDate(movie.movieInfo.release.date, 'D MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getFormattedDuration(Number(movie.movieInfo.runtime))}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${movie.movieInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${(movie.movieInfo.genre.length > 1) ? 'Genres' : 'Genre'}</td>
                <td class="film-details__cell">
                  ${movie.movieInfo.genre.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('\n')}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${movie.movieInfo.description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button
            type="button"
            class="${addActiveModifier(state.hasInWatchlist, 'film-details__control-button')} film-details__control-button--watchlist"
            id="watchlist"
            name="watchlist"
          >Add to watchlist</button>
          <button
            type="button"
            class="${addActiveModifier(state.wasAlreadyWatched, 'film-details__control-button')} film-details__control-button--watched"
            id="watched"
            name="watched"
          >Already watched</button>
          <button
            type="button"
            class="${addActiveModifier(state.isFavorite, 'film-details__control-button')} film-details__control-button--favorite"
            id="favorite"
            name="favorite"
          >Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="movie-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${comments.slice().sort((first, second) => (convertDateToMs(first.date) - convertDateToMs(second.date))).map(createCommentTemplate).join('\n')}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${(state.emotion) ? createEmotionTemplate(state.emotion) : ''}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${state.comment}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input
                class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-smile"
                value="smile"
                ${(state.emotion === 'smile') ? 'checked' : ''}
              >
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input
                class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-sleeping"
                value="sleeping"
                ${(state.emotion === 'sleeping') ? 'checked' : ''}
              >
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input
                class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-puke"
                value="puke"
                ${(state.emotion === 'puke') ? 'checked' : ''}
              >
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input
                class="film-details__emoji-item visually-hidden"
                name="comment-emoji"
                type="radio"
                id="emoji-angry"
                value="angry"
                ${(state.emotion === 'angry') ? 'checked' : ''}
              >
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
);

export default class MovieDetailsView extends SmartView {
  constructor(movie, comments, localComment, changeData) {
    super();
    this._movie = movie;
    this._comments = comments;
    this._localComment = localComment;
    this._data = MovieDetailsView.parseMovieDetailsToData(this._movie, this._comments, this._localComment);
    this._changeData = changeData;

    this._closeMovieDetailsClickHandler = this._closeMovieDetailsClickHandler.bind(this);
    this._watchlistButtonClickHandler = this._watchlistButtonClickHandler.bind(this);
    this._watchedButtonClickHandler = this._watchedButtonClickHandler.bind(this);
    this._favoriteButtonClickHandler = this._favoriteButtonClickHandler.bind(this);
    this._emotionChangeHandler = this._emotionChangeHandler.bind(this);
    this._localCommentInputHandler = this._localCommentInputHandler.bind(this);
    this._commentDeleteClickHandler = this._commentDeleteClickHandler.bind(this);
    this._commentAddKeydownHandler = this._commentAddKeydownHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createMovieDetailsTemplate(this._data);
  }

  setCloseMovieDetailsClickHandler(callback) {
    this._callback.closeMovieDetailsClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeMovieDetailsClickHandler);
  }

  updateElement() {
    const scrollPosition = this.getElement().scrollTop;
    super.updateElement();
    this.getElement().scrollTop = scrollPosition;
  }

  restoreHandlers() {
    this.setCloseMovieDetailsClickHandler(this._callback.closeMovieDetailsClick);
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('#watchlist').addEventListener('click', this._watchlistButtonClickHandler);
    this.getElement().querySelector('#watched').addEventListener('click', this._watchedButtonClickHandler);
    this.getElement().querySelector('#favorite').addEventListener('click', this._favoriteButtonClickHandler);
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._emotionChangeHandler);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._localCommentInputHandler);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('keydown', this._commentAddKeydownHandler);
    this.getElement().querySelector('.film-details__comments-list').addEventListener('click', this._commentDeleteClickHandler);
  }

  _closeMovieDetailsClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeMovieDetailsClick();
  }

  _watchlistButtonClickHandler(evt) {
    evt.preventDefault();
    this.updateData({state: {...this._data.state, hasInWatchlist: !this._data.state.hasInWatchlist}}, true);
    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, MovieDetailsView.parseDataToMovie(this._data));
  }

  _watchedButtonClickHandler(evt) {
    evt.preventDefault();
    this.updateData({state: {...this._data.state, wasAlreadyWatched: !this._data.state.wasAlreadyWatched}}, true);
    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, MovieDetailsView.parseDataToMovie(this._data));
  }

  _favoriteButtonClickHandler(evt) {
    evt.preventDefault();
    this.updateData({state: {...this._data.state, isFavorite: !this._data.state.isFavorite}}, true);
    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, MovieDetailsView.parseDataToMovie(this._data));
  }

  _emotionChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({state: {...this._data.state, emotion: evt.target.value}});
    this._changeData(UserAction.UPDATE_LOCAL_COMMENT, UpdateType.JUST_UPDATE_DATA, MovieDetailsView.parseDataToLocalComment(this._data));
  }

  _localCommentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({state: {...this._data.state, comment: evt.target.value}}, true);
    this._changeData(UserAction.UPDATE_LOCAL_COMMENT, UpdateType.JUST_UPDATE_DATA, MovieDetailsView.parseDataToLocalComment(this._data));
  }

  _commentAddKeydownHandler(evt) {
    if (isCtrlEnterEvent(evt)) {
      const id = getRandomNumber(1000, 10000);
      const comment = Object.assign({}, MovieDetailsView.parseDataToLocalComment(this._data), {id: String(id)});

      if (comment.emotion && comment.comment) {
        this.updateData({state: {...this._data.state, comments: [id, ...this._data.state.comments]}}, true);
        this.updateData({state: {...this._data.state, emotion: LOCAL_COMMENT_DEFAULT.emotion, comment: LOCAL_COMMENT_DEFAULT.comment}});
        this._changeData(UserAction.UPDATE_LOCAL_COMMENT, UpdateType.JUST_UPDATE_DATA, MovieDetailsView.parseDataToLocalComment(this._data));
        this._changeData(UserAction.UPDATE_MOVIE, UpdateType.PATCH, MovieDetailsView.parseDataToMovie(this._data));
        this._changeData(UserAction.ADD_COMMENT, UpdateType.PATCH, comment, MovieDetailsView.parseDataToMovie(this._data));
      }
    }
  }

  _commentDeleteClickHandler(evt) {
    if (!evt.target.matches('.movie-details__comment-delete')) {
      return;
    }

    const commentId = evt.target.closest('li').dataset.commentId;

    evt.preventDefault();
    this.updateData({state: {...this._data.state, comments: this._data.state.comments.filter((id) => id !== +commentId)}}, true);
    this._changeData(UserAction.UPDATE_MOVIE, UpdateType.PATCH, MovieDetailsView.parseDataToMovie(this._data));
    this._changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, commentId, MovieDetailsView.parseDataToMovie(this._data));
  }

  static parseMovieDetailsToData(movie, comments, localComment) {
    return Object.assign(
      {},
      {movie},
      {comments},
      {localComment},
      {state: {
        hasInWatchlist: movie.userDetails.watchlist,
        wasAlreadyWatched: movie.userDetails.alreadyWatched,
        isFavorite: movie.userDetails.favorite,
        emotion: localComment.emotion,
        comment: localComment.comment,
        comments: movie.comments,
      }},
    );
  }

  static parseDataToMovie(data) {
    return Object.assign(
      {},
      data.movie,
      {comments: data.state.comments},
      {userDetails: {
        ...data.movie.userDetails,
        watchlist: data.state.hasInWatchlist,
        alreadyWatched: data.state.wasAlreadyWatched,
        favorite: data.state.isFavorite,
      }},
    );
  }

  static parseDataToLocalComment(data) {
    return Object.assign(
      {},
      {
        emotion: data.state.emotion,
        comment: data.state.comment,
      },
    );
  }
}
