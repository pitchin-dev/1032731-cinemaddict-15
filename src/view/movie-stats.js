import AbstractView from './abstract';

const createMovieStatsTemplate = (movies) => (
  `<section class="footer__statistics">
    <p>${movies.length} movies inside</p>
  </section>`
);

export {createMovieStatsTemplate};

export default class MovieStatistics extends AbstractView {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createMovieStatsTemplate(this._movies);
  }
}
