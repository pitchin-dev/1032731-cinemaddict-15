import { createElement } from '../utils/utils';

const createMovieStatsTemplate = (movies) => (
  `<section class="footer__statistics">
    <p>${movies.length} movies inside</p>
  </section>`
);

export {createMovieStatsTemplate};

export default class MovieStatistics {
  constructor(movies) {
    this._movies = movies;
    this._element = null;
  }

  getTemplate() {
    return createMovieStatsTemplate(this._movies);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
