import AbstractView from './abstract-view';

const createMoviesExtraTemplate = (title) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>

    <div class="films-list__container"></div>
  </section>`
);

export default class MoviesExtraView extends AbstractView {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return createMoviesExtraTemplate(this._title);
  }
}
