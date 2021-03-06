import SmartView from './smart';

const createCommentTemplate = (comment) => (
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${comment.date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
);

const createCommentList = (comments) => {
  const commentList = [];

  for (let i = 0; i < comments.length; i++) {
    commentList.push(createCommentTemplate(comments[i]));
  }

  return commentList;
};

const setEmoji = (emoji) => `
<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
`;

const createPopupTemplate = (state) => {
  const genresList = state.genre.join(', ');
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${state.poster} alt="">
              <p class="film-details__age">${state.ageLimitation}</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${state.title}</h3>
                  <p class="film-details__title-original">Original: ${state.originalTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${state.rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${state.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${state.screenwriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${state.actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${state.releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${state.duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${state.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genresList}
                  </td>
                </tr>
              </table>
              <p class="film-details__film-description">
                ${state.description}
              </p>
            </div>
          </div>
          <section class="film-details__controls">
            <button type="button" class="film-details__control-button ${state.isInWatchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button ${state.isWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button ${state.isFavorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title ${state.hasComments ? '' : 'visually-hidden'}">Comments <span class="film-details__comments-count">${state.comments.length}</span></h3>
            <ul class="film-details__comments-list">
              ${state.hasComments ? createCommentList(state.comments).join(' ') : ''}
            </ul>
            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">${state.emoji ? setEmoji(state.emoji) : ''}</div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${state.emoji === 'smile' ? 'checked' : ''}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${state.emoji === 'sleeping' ? 'checked' : ''}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${state.emoji === 'puke' ? 'checked' : ''}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${state.emoji === 'angry' ? 'checked' : ''}>
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
};

export default class MoviePopupView extends SmartView {
  constructor(movie) {
    super();
    this._data = MoviePopupView.parseMovieToState(movie);

    this._clickEmojiHandler = this._clickEmojiHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this._setEmojiClickHandler();
    this._setCommentInputHandler();
  }

  getTemplate() {
    return createPopupTemplate(this._data);
  }

  updateElement() {
    const scrollTop = this.getElement().scrollTop;
    super.updateElement();
    this.getElement().scrollTop = scrollTop;
  }

  reset(movie) {
    this.updateData(MoviePopupView.parseMovieToState(movie));
  }

  _restoreHandlers() {
    this._setEmojiClickHandler();
    this._setCommentInputHandler();
    this.setClickHandler(this._callback.click);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setHistoryClickHandler(this._callback.historyClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }

  _setEmojiClickHandler() {
    const emojies = this.getElement().querySelectorAll('.film-details__emoji-item');
    emojies.forEach((emoji) => emoji.addEventListener('click', this._clickEmojiHandler));
  }

  _clickEmojiHandler(e) {
    e.preventDefault();
    this.updateData({emoji: e.target.id.split('-')[1]});
  }

  _setCommentInputHandler() {
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._commentInputHandler);
  }

  _commentInputHandler(e) {
    e.preventDefault();
    this.updateData({comment: e.target.value}, true);
  }

  _clickHandler(e) {
    e.preventDefault();
    this._callback.click();
  }

  _historyClickHandler(e) {
    e.preventDefault();
    this._callback.historyClick();
  }

  _favoriteClickHandler(e) {
    e.preventDefault();
    this._callback.favoriteClick();
  }

  _watchlistClickHandler(e) {
    e.preventDefault();
    this._callback.watchlistClick();
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._historyClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickHandler);
  }

  static parseMovieToState(movie) {
    return {
      ...movie,
      comment: null,
      emoji: null,
      hasComments: movie.comments.length > 0,
    };
  }

  static parseStateToMovie(state) {
    delete state.comment;
    delete state.emoji;
    delete state.hasComments;

    return state;
  }
}
