import AbstractView from './abstract';

const createMovieListTemplate = (type) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${type}</h2>

    <div class="films-list__container">

    </div>
  </section>`
);

export default class MovieListBlockExtraView extends AbstractView {
  constructor(type) {
    super();
    this._type = type;
  }

  getTemplate() {
    return createMovieListTemplate(this._type);
  }
}
