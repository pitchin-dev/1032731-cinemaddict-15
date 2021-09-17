import AbstractView from './abstract-view';
import {MAIN_TITLE} from '../const';

const createMoviesTemplate = (moviesCount, title) => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title ${(moviesCount) ? 'visually-hidden' : ''}">${(moviesCount) ? MAIN_TITLE : `${title}`}</h2>
      ${(moviesCount) ? '<div class="films-list__container"></div>' : ''}
    </section>
  </section>`
);

export default class MoviesContainerView extends AbstractView {
  constructor(moviesCount, title) {
    super();
    this._moviesCount = moviesCount;
    this._title = title;
  }

  getTemplate() {
    return createMoviesTemplate(this._moviesCount, this._title);
  }
}
